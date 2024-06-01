import CameraComponent from './CameraComponent.js';
import ZoomComponent from './ZoomComponent.js';

export default class FollowComponent extends CameraComponent {
    constructor(camera, deadZoneX = 480, deadZoneY = 270) {
        super(camera);
        this.camera = camera;
        this.target = null;
        this.deadZoneX = deadZoneX !== null ? (camera.width - deadZoneX * 2) / 2 : null;
        this.deadZoneY = deadZoneY !== null ? (camera.height - deadZoneY * 2) / 2 : null;
        this.firstFollow = true;
    }

    setTarget(target) {
        this.target = target;
        this.firstFollow = true;
        console.log("Camera target received", target);
    }

    update(deltaTime) {
        if(!this.target) return;

        const targetX = this.target.pos.x;
        const targetY = this.target.pos.y;

        if(this.firstFollow) {
            this.center(targetX, targetY, this.camera.zoomLevel);
            this.firstFollow = false;
            return;
        }

        const centerX = this.camera.pos.x + this.camera.width / 2 / this.camera.zoomLevel;
        const centerY = this.camera.pos.y + this.camera.height / 2 / this.camera.zoomLevel;

        const dx = targetX - centerX;
        const dy = targetY - centerY;

        if(this.deadZoneX !== null && Math.abs(dx) > this.deadZoneX / this.camera.zoomLevel) {
            this.camera.pos.x += dx - Math.sign(dx) * this.deadZoneX / this.camera.zoomLevel;
        } else if(this.deadZoneX === null) {
            this.camera.pos.x += dx;
        }

        if(this.deadZoneY !== null && Math.abs(dy) > this.deadZoneY / this.camera.zoomLevel) {
            this.camera.pos.y += dy - Math.sign(dy) * this.deadZoneY / this.camera.zoomLevel;
        } else if(this.deadZoneY === null) {
            this.camera.pos.y += dy;
        }
    }

    center(x, y, zoomLevel) {
        this.camera.setPos(x - (this.camera.width / 2 / this.camera.zoomLevel), y - (this.camera.height / 2 / this.camera.zoomLevel));
    }
}
