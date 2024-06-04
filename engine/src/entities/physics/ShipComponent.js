// ShipComponent.js
import BaseComponent from '../../abstracts/BaseComponent.js';

export default class ShipComponent extends BaseComponent {
    constructor(profiles, initialProfile, priority, label = null, gracePeriod = 1000) {
        super();
        this.profiles = profiles;
        this.currentProfile = initialProfile;
        this.priority = priority;
        this.isActive = true;
        this.energyManager = null;
        this.heatManager = null;
        const profile = profiles[initialProfile];
        this.energyCost = profile.energyCostMW; // Use energyCostMW
        this.heatProductionRate = profile.heatProductionRate || 0; // Add heat production rate
        this.label = label || this.constructor.name; // Set label with default to class name
        this.gracePeriod = gracePeriod; // Grace period in milliseconds
        this.deactivationTime = null; // Time when the component was deactivated
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
                this.heatManager.registerHeatProducer(this, this.heatProductionRate);
            }
        });
    }

    activate() {
        if(this.deactivationTime && Date.now() - this.deactivationTime < this.gracePeriod) {
            // If within grace period, do not activate
            return;
        }

        this.isActive = true;
        console.log(`${this.label} activated`);
        this.entity.eventBus.emit('component.activate', {component: this});
    }

    deactivate() {
        this.isActive = false;
        console.log(`${this.label} deactivated`);
        this.entity.eventBus.emit('component.deactivate', {component: this});
        this.deactivationTime = Date.now(); // Record the deactivation time
    }

    applyProfile(profileName) {
        const profile = this.profiles[profileName];
        if(profile) {
            this.currentProfile = profileName;
            this.energyCost = profile.energyCostMW; // Use energyCostMW
            this.heatProductionRate = profile.heatProductionRate || 0;
            if(this.heatManager) {
                this.heatManager.unregisterHeatProducer(this);
                if(this.heatProductionRate > 0) {
                    this.heatManager.registerHeatProducer(this, this.heatProductionRate);
                }
            }
            // Apply other profile-specific settings here
            console.log(`${this.label} profile applied: ${profileName}`);
        }
    }
}
