import BaseComponent from "../../abstracts/BaseComponent.js";

export default class InertiaDamperComponent extends BaseComponent {
    constructor(settings) {
        super();
        this.settings = settings; // Settings for different profiles
        this.activeModifiers = {}; // Currently active modifiers
        this.profile = null;
    }

    setProfile(profile) {
        this.profile = profile;
        // Set the active modifiers based on the provided profile
        this.activeModifiers = this.settings[profile] || {};
        if(this.entity) {
            this.applyModifiers(this.entity);
        }
        return this;
    }

    applyModifiers(entity) {
        // Apply the modifiers to the entity's properties
        entity.accelerationModifier = this.activeModifiers.accelerationModifier || 1;
        entity.inertiaModifier = this.activeModifiers.inertiaModifier || 1;
        entity.dragCoefficientModifier = Math.min(Math.max(this.activeModifiers.dragCoefficientModifier || 1, 0), 1); // Ensure drag coefficient modifier is normalized
    }

    update(deltaTime) {
        if(this.entity) {
            this.applyModifiers(this.entity);
        }
    }
}
