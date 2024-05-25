import CameraComponent from './CameraComponent.js';
import Vector2D from "../utils/maths/Vector2D.js";

export default class ShakeComponent extends CameraComponent {
    constructor(camera) {
        super(camera);
        this.camera = camera;
        this.camera.shakeOffset = new Vector2D(0, 0);
        this.shakeDuration = 0;
        this.shakeMagnitude = 0;
    }

    shake(duration, magnitude) {
        this.shakeDuration = duration;
        this.shakeMagnitude = magnitude;
    }

    update(deltaTime) {
        if(this.shakeDuration > 0) {
            this.shakeDuration -= deltaTime;
            const shakeAngle = Math.random() * Math.PI * 2;
            this.camera.shakeOffset.set(
                Math.cos(shakeAngle) * this.shakeMagnitude,
                Math.sin(shakeAngle) * this.shakeMagnitude
            );
        } else {
            this.camera.shakeOffset.set(0, 0);
        }
    }
}
