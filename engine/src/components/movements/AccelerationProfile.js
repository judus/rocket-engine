export default class AccelerationProfile {
    constructor(options = {}) {
        this.initialAcceleration = options.initialAcceleration || 1; // Initial acceleration
        this.peakAcceleration = options.peakAcceleration || 5; // Peak acceleration
        this.finalAcceleration = options.finalAcceleration || 0.5; // Final acceleration
        this.midpoint = options.midpoint || 0.5; // Midpoint of acceleration transition
        this.maxSpeed = options.maxSpeed || 200; // Max speed
    }

    adjustAcceleration(vel) {
        // Calculate the current speed
        const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
        const speedRatio = speed / this.maxSpeed;

        // Simple linear interpolation for acceleration adjustment
        if(speedRatio < this.midpoint) {
            // Interpolate between initial and peak acceleration
            return this.initialAcceleration +
                (this.peakAcceleration - this.initialAcceleration) * (speedRatio / this.midpoint);
        } else {
            // Interpolate between peak and final acceleration
            return this.peakAcceleration +
                (this.finalAcceleration - this.peakAcceleration) * ((speedRatio - this.midpoint) / (1 - this.midpoint));
        }
    }
}