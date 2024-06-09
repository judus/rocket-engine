import ShipComponent from './ShipComponent.js';

export default class DamperComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        this.label = 'Inertia Dampers';
    }

    onAdd(entity) {
        super.onAdd(entity);
        // Store default values
        this.defaultMass = entity.mass;
        this.defaultInertiaModifier = entity.inertiaModifier;
        this.defaultDragCoefficient = entity.dragCoefficient;
        this.defaultAccelerationModifier = entity.accelerationModifier;
        this.staticFrictionCoefficient = entity.staticFrictionCoefficient;
    }

    activate1() {
        this.isActive = true;
        this.applyArcadeMode();
        //console.log(`${this.label} activated`);
    }

    deactivate1() {
        this.isActive = false;
        this.applyAdvancedMode();
        //console.log(`${this.label} deactivated`);
    }

    applyArcadeMode() {
        const profile = this.profiles[this.currentProfile];

        // Use the profile to adjust the effectiveness of the dampener
        this.entity.mass = this.defaultMass * (profile.massModifier || 1); // Use profile mass or minimal mass
        this.entity.inertiaModifier = this.defaultInertiaModifier * (profile.inertiaModifier || 1); // Use profile inertia modifier or no inertia
        this.entity.dragCoefficient = this.defaultDragCoefficient * (profile.dragCoefficientModifier || 1); // Use profile drag coefficient or no drag
        //this.entity.accelerationModifier = profile.accelerationModifier || this.defaultAccelerationModifier; // Use profile acceleration modifier or default
        //this.entity.staticFrictionCoefficient = profile.staticFrictionCoefficient || this.defaultAccelerationModifier; // Use profile acceleration modifier or default
        console.log('Arcade Mode Activated: Adjusting Physics Properties');
        console.log(`Mass: ${this.entity.mass}, Inertia Modifier: ${this.entity.inertiaModifier}, Drag Coefficient: ${this.entity.dragCoefficient}`);
    }

    applyAdvancedMode() {
        // Reset the entity's physics properties to their defaults
        this.entity.mass = this.defaultMass;
        this.entity.inertiaModifier = this.defaultInertiaModifier;
        this.entity.dragCoefficient = this.defaultDragCoefficient;
        this.entity.accelerationModifier = this.defaultAccelerationModifier;
        this.entity.staticFrictionCoefficient = this.defaultAccelerationModifier;

        console.log('Advanced Mode Activated: Resetting Physics Properties to Default Values');
        console.log(`Mass: ${this.entity.mass}, Inertia Modifier: ${this.entity.inertiaModifier}, Drag Coefficient: ${this.entity.dragCoefficient}`);
    }


}
