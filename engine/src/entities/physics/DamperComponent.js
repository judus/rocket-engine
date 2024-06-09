import ShipComponent from './ShipComponent.js';

export default class DamperComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        this.label = 'Inertia Dampers';
        this.userRequestedState = false;
    }

    onAdd(entity) {
        super.onAdd(entity);
        // Store default values
        this.defaultMass = entity.mass;
        this.defaultInertiaModifier = entity.inertiaModifier;
        this.defaultDragCoefficient = entity.dragCoefficient;
        this.defaultAccelerationModifier = entity.accelerationModifier;
        this.defaultStaticFrictionCoefficient = entity.staticFrictionCoefficient;

        // Apply initial state
        this.applyCurrentMode();
    }

    activate() {
        this.isActive = true;
        this.applyArcadeMode();
        this.entity.eventBus.emit('component.damper.stateChange', this.isActive && this.userRequestedState);
        //console.log(`${this.label} activated`);
    }

    deactivate() {
        this.isActive = false;
        this.applyAdvancedMode();
        this.entity.eventBus.emit('component.damper.stateChange', this.isActive && this.userRequestedState);
        //console.log(`${this.label} deactivated`);
    }

    enable() {
        this.userRequestedState = true;
        this.applyArcadeMode();
        this.entity.eventBus.emit('component.damper.stateChange', this.isActive && this.userRequestedState);
    }

    disable() {
        this.userRequestedState = false;
        this.applyAdvancedMode();
        this.entity.eventBus.emit('component.damper.stateChange', this.isActive && this.userRequestedState);
    }

    applyArcadeMode() {
        const profile = this.profiles[this.currentProfile];

        // Use the profile to adjust the effectiveness of the dampener
        this.entity.mass = this.defaultMass * (profile.massModifier || 1);
        this.entity.inertiaModifier = this.defaultInertiaModifier * (profile.inertiaModifier || 1);
        this.entity.dragCoefficient = this.defaultDragCoefficient * (profile.dragCoefficientModifier || 1);
    }

    applyAdvancedMode() {
        // Reset the entity's physics properties to their defaults
        this.entity.mass = this.defaultMass;
        this.entity.inertiaModifier = this.defaultInertiaModifier;
        this.entity.dragCoefficient = this.defaultDragCoefficient;
        this.entity.accelerationModifier = this.defaultAccelerationModifier;
        this.entity.staticFrictionCoefficient = this.defaultStaticFrictionCoefficient;
    }

    applyCurrentMode() {
        if(this.isActive && this.userRequestedState) {
            this.applyArcadeMode();
        } else {
            this.applyAdvancedMode();
        }
    }
}
