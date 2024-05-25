export default class DecelerationProfile {
    constructor(options = {}) {
        this.initialDeceleration = options.initialDeceleration || 1; // Initial deceleration
        this.peakDeceleration = options.peakDeceleration || 5; // Peak deceleration
        this.finalDeceleration = options.finalDeceleration || 0.5; // Final deceleration
        this.midpoint = options.midpoint || 0.5; // Midpoint of deceleration transition
        this.maxSpeed = options.maxSpeed || 200; // Max speed
    }

    adjustDeceleration(vel) {
        // Calculate the current speed
        const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
        const speedRatio = speed / this.maxSpeed;

        // Simple linear interpolation for deceleration adjustment
        if(speedRatio < this.midpoint) {
            // Interpolate between initial and peak deceleration
            return this.initialDeceleration +
                (this.peakDeceleration - this.initialDeceleration) * (speedRatio / this.midpoint);
        } else {
            // Interpolate between peak and final deceleration
            return this.peakDeceleration +
                (this.finalDeceleration - this.peakDeceleration) * ((speedRatio - this.midpoint) / (1 - this.midpoint));
        }
    }
}