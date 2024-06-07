import BaseComponent from '../../abstracts/BaseComponent.js';

export default class ShipComponent extends BaseComponent {
    constructor(profiles, initialProfile, priority, label = null) {
        super();
        this.profiles = profiles;
        this.currentProfile = initialProfile;
        this.priority = priority;
        this.isActive = false; // Set initial state to false
        this.userRequestedState = true; // Default to true to match initial active state
        this.energyManager = null;
        this.heatManager = null;
        const profile = profiles[initialProfile];
        this.energyCost = profile.energyCostMW * 1000000; // Use energyCostMW, convert to J/s
        this.heatProductionRate = profile.heatProductionRate || 0; // Add heat production rate
        this.maxTemperature = profile.maxTemperature || 150; // Add max temperature
        this.health = profile.health || 100; // Add health
        this.isBroken = false; // Set initial broken state to false
        this.currentTemperature = this.maxTemperature * 0.5; // Start at 50% of max temperature
        this.overheatGracePeriod = 10; // 10 seconds grace period before taking damage
        this.overheatTimer = 0;
        this.label = label || this.constructor.name; // Set label with default to class name

        // Debugging logs
        console.log(`ShipComponent initialized:`, {
            label: this.label,
            energyCost: this.energyCost,
            heatProductionRate: this.heatProductionRate,
            maxTemperature: this.maxTemperature,
            health: this.health
        });
    }

    onAdd(entity) {
        super.onAdd(entity);
        this.entity.hasComponent('energyManager', (energyManager) => {
            this.energyManager = energyManager;
            this.energyManager.registerComponent(this, this.energyCost, this.priority);
        });
        this.entity.hasComponent('heatManager', (heatManager) => {
            this.heatManager = heatManager;
            if(this.heatProductionRate > 0) {
                this.heatManager.registerHeatProducer(this, this.heatProductionRate, this.maxTemperature);
            }
        });
    }

    activate() {
        if(!this.isActive) {
            this.isActive = true;
            console.log(`${this.label} activated`);
            this.entity.eventBus.emit('component.activate', {component: this});
        }
    }

    deactivate() {
        if(this.isActive) {
            this.isActive = false;
            console.log(`${this.label} deactivated`);
        }
    }

    addHeat(amount) {
        if(this.currentTemperature <= this.maxTemperature) {
            this.currentTemperature += amount;
        }
    }

    removeHeat(amount) {
        if(this.currentTemperature > this.maxTemperature * 0.5) {
            this.currentTemperature -= amount;
        }
    }

    checkOverheat(deltaTime) {
        if(this.currentTemperature >= this.maxTemperature) {
            this.overheatTimer += deltaTime;
            if(this.overheatTimer >= this.overheatGracePeriod && !this.isBroken) {
                this.entity.eventBus.emit('component.overheat', {component: this});
                this.takeDamage(35); // Example damage value
                this.overheatTimer = 0; // Reset timer after taking damage
            }
        } else {
            this.overheatTimer = 0; // Reset timer if temperature drops below max
        }
    }

    takeDamage(amount) {
        this.health -= amount;
        console.warn(`${this.label} takes ${amount} damage due to overheating! Health remaining: ${this.health}`);
        if(this.health <= 0 && !this.isBroken) {
            this.entity.eventBus.emit('component.break', {component: this});
            this.isBroken = true;
            this.deactivate();
            console.warn(`${this.label} has broken down due to overheating!`);
        }

    }

    isOverheated() {
        return this.currentTemperature >= this.maxTemperature;
    }

    applyProfile(profileName) {
        const profile = this.profiles[profileName];
        if(profile) {
            this.currentProfile = profileName;
            this.energyCost = profile.energyCostMW * 1000000; // Use energyCostMW, convert to J/s
            this.heatProductionRate = profile.heatProductionRate || 0;
            this.maxTemperature = profile.maxTemperature || 150;
            this.health = profile.health || 100;
            console.log(`!!!!!!!!!!!!!!Applied health profile: ${profileName} to ${this.health}`);
            if(this.heatManager) {
                this.heatManager.unregisterHeatProducer(this);
                if(this.heatProductionRate > 0) {
                    console.log(`Re-registering heat producer after profile applied: ${this.label}`, {
                        heatProductionRate: this.heatProductionRate,
                        maxTemperature: this.maxTemperature
                    });
                    this.heatManager.registerHeatProducer(this, this.heatProductionRate, this.maxTemperature);
                }
            }
            // Apply other profile-specific settings here
            console.log(`${this.label} profile applied: ${profileName}`);
        }
    }
}
