import CameraECS from "./CameraECS.js";

export default class CameraManager {
    constructor() {
        this.cameras = new Map();
    }

    createCamera(name, ...config) {
        const camera = new CameraECS(...config);
        this.cameras.set(name, camera);
        return camera;
    }

    getCamera(name) {
        return this.cameras.get(name);
    }

    removeCamera(name) {
        this.cameras.delete(name);
    }
}
