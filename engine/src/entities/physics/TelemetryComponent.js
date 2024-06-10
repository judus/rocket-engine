import BaseComponent from "../../abstracts/BaseComponent.js";

export default class TelemetryComponent extends BaseComponent {
    constructor() {
        super();
    }

    update(deltaTime) {
        this.emitTelemetryData();
    }

    emitTelemetryData() {
        if(this.entity.isControlled && this.entity.eventBus) {
            const speed = this.entity.velocity.length();
            const speedKmH = speed * 3.6; // Convert m/s to km/h
            const accelerationMagnitude = this.entity.acceleration.length();
            const gForce = accelerationMagnitude / 9.81;
            const kineticEnergy = 0.5 * this.entity.mass * speed * speed;

            const telemetryData = {
                position: this.entity.pos,
                velocity: this.entity.velocity,
                acceleration: this.entity.acceleration,
                speed: speedKmH, // Speed in km/h
                gForce: gForce,
                kineticEnergy: kineticEnergy,
                mass: this.entity.mass
            };

            this.entity.eventBus.emit('telemetry.update', telemetryData);
        }
    }
}
