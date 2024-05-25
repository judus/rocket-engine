import AccelerationProfile from "./AccelerationProfile.js";
import DecelerationProfile from "./DecelerationProfile.js";

export default class MovementState {
    constructor(options = {}) {
        this.name = options.name || 'default';
        this.maxSpeed = options.maxSpeed || 200;
        this.accelerationProfile = new AccelerationProfile(options.accelerationProfile || {});
        this.decelerationProfile = new DecelerationProfile(options.decelerationProfile || {});
    }
}