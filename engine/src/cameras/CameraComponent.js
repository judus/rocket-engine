export default class CameraComponent {
    constructor(camera) {
        this.camera = camera;
    }

    update(deltaTime) {
        // Base update method, to be overridden by subclasses
    }
}
