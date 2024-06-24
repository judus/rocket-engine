import ShipComponent from './ShipComponent.js';

export default class DamperComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        this.label = 'Inertia Dampers';
        this.userRequestedState = false;
        this.controllerComponent = null; // Reference to the ControllerComponent
        this.isUpdating = false; // Prevent re-entrant state updates
    }

    onAdd(entity) {
        super.onAdd(entity);
        // Store default values
        this.defaultMass = entity.mass;
        this.defaultInertiaModifier = entity.inertiaModifier;
        this.defaultDragCoefficient = entity.dragCoefficient;
        this.defaultAccelerationModifier = entity.accelerationModifier;
        this.defaultStaticFrictionCoefficient = entity.staticFrictionCoefficient;

        // Find and store the reference to the ControllerComponent
        this.controllerComponent = entity.getComponent('engineController');

        // Apply initial state
        this.applyCurrentMode();
    }

    activate() {
        this.isActive = true;
        this.applyCurrentMode();
        this.notifyController();
    }

    deactivate() {
        this.isActive = false;
        this.applyCurrentMode();
        this.notifyController();
    }

    enable() {
        this.userRequestedState = true;
        this.applyCurrentMode();
        this.notifyController();
    }

    disable() {
        this.userRequestedState = false;
        this.applyCurrentMode();
        this.notifyController();
    }

    notifyController() {
        if(this.controllerComponent && !this.isUpdating) {
            this.controllerComponent.updateProfileBasedOnDamper(this.isActive && this.userRequestedState);
        }
        // Emit event for UI and audio
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
        this.isUpdating = true;
        if(this.isActive && this.userRequestedState) {
            this.applyArcadeMode();
            if(this.controllerComponent) {
                this.controllerComponent.setProfile('arcade');
            }
        } else {
            this.applyAdvancedMode();
            if(this.controllerComponent) {
                this.controllerComponent.setProfile('advanced');
            }
        }
        this.isUpdating = false;
    }
}
