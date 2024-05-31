import BaseComponent from '../../abstracts/BaseComponent.js';

export default class InertiaDamperComponent extends BaseComponent {
    constructor(settings) {
        super();
        this.settings = settings; // Settings for different profiles
        this.activeModifiers = {}; // Currently active modifiers
    }

    setProfile(profile) {
        // Set the active modifiers based on the provided profile
        this.activeModifiers = this.settings[profile] || {};
    }

    applyModifiers(entity) {
        // Apply the modifiers to the entity's properties
        entity.accelerationModifier = this.activeModifiers.accelerationModifier || 1;
        entity.inertiaModifier = this.activeModifiers.inertiaModifier || 1;
    }

    update(deltaTime) {
        if(this.entity) {
            this.applyModifiers(this.entity);
        }
    }
}
