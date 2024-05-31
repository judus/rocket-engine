import BaseComponent from "../../abstracts/BaseComponent.js";
import MovementState from "./MovementState.js";
import AdvancedMovementProfile from "./AdvancedMovementProfile.js";
import {ArcadeMovementProfile} from "./ArcadeMovementProfile.js";

export default class ShipEngineComponent extends BaseComponent {
    constructor(movementStates = {}, options = {}) {
        super();
        this.input = {dx: 0, dy: 0};

        // Initialize movement states
        // Used for modifier keys to switch between states, walk, run, thrust, boost, etc.
        this.states = {};
        this.currentState = null;

        // Add movement states to this component
        movementStates.forEach(state => {
            this.addState(new MovementState(state));
        });

        this.arcadeProfile = new ArcadeMovementProfile();
        this.advancedProfile = new AdvancedMovementProfile();

        this.currentProfile = this.arcadeProfile;
    }

    onAdd(entity) {
        this.entity = entity;
        this.currentProfile.setEntity(this.entity)
    }

    addState(state) {
        this.states[state.name] = state;
    }

    /**
     * Used for modifier keys to switch between states, walk, run, thrust, boost, etc.
     *
     * @param stateName
     * @returns {MovementComponent}
     */
    setState(stateName) {
        if(this.states[stateName]) {
            this.currentState = this.states[stateName];
            this.currentProfile.setState(this.currentState);
        } else {
            console.warn(`State ${stateName} not found`);
        }
        return this;
    }

    setProfile(profileName) {
        if(profileName === 'arcade') {
            this.currentProfile = this.arcadeProfile;
        } else if(profileName === 'advanced') {
            this.currentProfile = this.advancedProfile;
        } else {
            console.warn(`Profile ${profileName} not found`);
        }
    }

    update(deltaTime) {
        if(this.currentProfile) {
            this.currentProfile.update(deltaTime, this.input, this.currentState);
        }
    }

    setInput(dx, dy) {
        this.input = {dx, dy};
    }

}
