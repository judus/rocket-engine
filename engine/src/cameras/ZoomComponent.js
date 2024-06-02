import CameraComponent from './CameraComponent.js';

export default class ZoomComponent extends CameraComponent {
    constructor(camera, initialZoomLevel = 1, zoomSpeed = 0.1) {
        super(camera);
        this.camera = camera;
        this.camera.zoomLevel = initialZoomLevel;
        this.targetZoom = initialZoomLevel;
        this.zoomSpeed = zoomSpeed;
    }

    setZoom(targetZoom, speed) {
        if(targetZoom > 0) {
            const oldZoomLevel = this.camera.zoomLevel;
            this.targetZoom = targetZoom;
            this.zoomSpeed = speed !== undefined ? speed : this.zoomSpeed;

            // Calculate the current center of the view
            const centerX = this.camera.pos.x + this.camera.width / 2 / oldZoomLevel;
            const centerY = this.camera.pos.y + this.camera.height / 2 / oldZoomLevel;

            // Update zoom level
            this.camera.zoomLevel = targetZoom;

            // Calculate new position based on the new zoom level to maintain the center
            this.camera.pos.x = centerX - this.camera.width / 2 / this.camera.zoomLevel;
            this.camera.pos.y = centerY - this.camera.height / 2 / this.camera.zoomLevel;
        } else {
            console.warn("Zoom level must be greater than 0");
        }
    }

    zoom(deltaY) {
        const zoomChange = deltaY < 0 ? 0.1 : -0.1;
        const newZoom = this.targetZoom + zoomChange;
        this.setZoom(Math.max(0.5, Math.min(newZoom, 3)));
    }

    update(deltaTime) {
        if(this.camera.zoomLevel !== this.targetZoom) {
            const zoomDifference = this.targetZoom - this.camera.zoomLevel;
            this.camera.zoomLevel += zoomDifference * this.zoomSpeed;
            if(Math.abs(zoomDifference) < 0.01) {
                this.camera.zoomLevel = this.targetZoom;
            }
        }
    }
}
