import BaseComponent from "../../abstracts/BaseComponent.js";
import Vector3D from "../../utils/maths/Vector3D.js";

export default class InertiaDamperComponent extends BaseComponent {
    constructor(profiles) {
        super();
        this.profiles = profiles;
        this.currentProfile = null;
        this.isActive = true; // Controlled by the player
        this.hasEnergy = true; // Indicates if the damper has sufficient energy
    }

    onAdd(entity) {
        super.onAdd(entity);
        this.entity.eventBus.on('component.engineController.mode', (mode) => {
            if(mode === 'arcade') {
                this.isActive = true;
                this.entity.eventBus.emit('component.inertiaDamper.update', {state: true});
            } else if(mode === 'advanced') {
                this.isActive = false;
                this.entity.eventBus.emit('component.inertiaDamper.update', {state: false});
            }
        });

    }

    setProfile(name) {
        this.currentProfile = this.profiles[name] || null;
        this.resetModifiers();
        if(this.currentProfile && this.isActive && this.hasEnergy) {
            this.applyModifiers();
        }

        this.energyConsumptionRate = this.currentProfile.energyConsumptionRate || 0.5;
    }

    switch() {
        this.isActive = !this.isActive;
        if(this.isActive && this.currentProfile && this.hasEnergy) {
            this.applyModifiers();
        } else {
            this.resetModifiers();
        }
    }

    applyModifiers() {
        console.log("Appliying  d modifiers", this.entity);

        if(!this.entity || !this.currentProfile) return;

        this.entity.mass *= this.currentProfile.massModifier || 0.1;
        this.entity.momentOfInertia *= this.currentProfile.momentOfInertiaModifier || 1;
        this.entity.accelerationModifier *= this.currentProfile.accelerationModifier || 1;
        this.entity.inertiaModifier *= this.currentProfile.inertiaModifier || 1;
        this.entity.dragCoefficient *= this.currentProfile.dragCoefficientModifier || 1;
        this.entity.rotationalDragCoefficient *= this.currentProfile.rotationalDragCoefficientModifier || 1;
        console.log("Applied modifiers", this.entity);
    }

    resetModifiers() {
        if(!this.entity) return;

        // Reset to default values or store original values to reset to
        this.entity.mass = this.entity.defaultMass || 1000;
        this.entity.momentOfInertia = this.entity.defaultMomentOfInertia || 1;
        this.entity.accelerationModifier = 1;
        this.entity.inertiaModifier = 1;
        this.entity.dragCoefficient = 1000;
        this.entity.staticFrictionForce = new Vector3D(1000, 1000, 0);
        this.entity.rotationalDragCoefficient = 0.1;
    }

    applyEnergyConsumption() {
        const powerPlant = this.entity.getComponent('powerPlant');
        if(powerPlant) {
            const energyRequired = this.energyConsumptionRate * powerPlant.maxEnergy; // Fixed rate
            const availableEnergy = powerPlant.energy - energyRequired;

            if(availableEnergy < 0) {
                this.hasEnergy = false;
                this.resetModifiers(); // Turn off the damper if there is not enough energy
                this.entity.eventBus.emit('component.inertiaDamper.update', {state: false});
            } else {
                this.hasEnergy = true;
                this.entity.eventBus.emit('component.inertiaDamper.update', {state: true});
            }
        }
    }

    update(deltaTime) {
        if(this.isActive && this.currentProfile) {
            this.applyEnergyConsumption();
            if(this.hasEnergy) {
                //this.applyModifiers();
            }
        }
    }
}
