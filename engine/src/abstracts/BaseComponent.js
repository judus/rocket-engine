export default class BaseComponent {
    constructor(camera) {
        this.camera = camera;
    }

    update(deltaTime) {
        // Base update method, to be overridden by subclasses
    }
}
