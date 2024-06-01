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

    setProfile(name) {
        this.currentProfile = this.profiles[name] || null;
        this.resetModifiers();
        if(this.currentProfile && this.isActive && this.hasEnergy) {
            this.applyModifiers();
        }
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
        if(!this.entity || !this.currentProfile) return;

        this.entity.mass *= this.currentProfile.massModifier || 1;
        this.entity.momentOfInertia *= this.currentProfile.momentOfInertiaModifier || 1;
        this.entity.accelerationModifier *= this.currentProfile.accelerationModifier || 1;
        this.entity.inertiaModifier *= this.currentProfile.inertiaModifier || 1;
        this.entity.dragCoefficient *= this.currentProfile.dragCoefficientModifier || 1;
        //this.entity.staticFrictionForce = this.entity.staticFrictionForce.multiply(this.currentProfile.staticFrictionModifier || 1);
        this.entity.rotationalDragCoefficient *= this.currentProfile.rotationalDragCoefficientModifier || 1;
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
            const energyRequired = (this.currentProfile.energyConsumptionRate || 0.5) * powerPlant.maxEnergy; // Configurable rate
            if(!powerPlant.consume(energyRequired)) {
                this.hasEnergy = false;
                this.resetModifiers(); // Turn off the damper if there is not enough energy
            } else {
                this.hasEnergy = true;
            }
        }
    }

    update(deltaTime) {
        if(this.isActive && this.currentProfile) {
            this.applyEnergyConsumption();
            if(this.hasEnergy) {
                this.applyModifiers();
            }
        }
    }
}
