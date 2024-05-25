import CameraComponent from './CameraComponent.js';

export default class TouchComponent extends CameraComponent {
    constructor(camera, edgeThreshold = 50, edgeDelay = 250) {
        super(camera);
        this.camera = camera;
        this.edgeThreshold = edgeThreshold;
        this.edgeDelay = edgeDelay;
        this.edgeTimers = {x: null, y: null};
        this.moveX = 0;
        this.moveY = 0;
    }

    touched(x, y) {
        if (!this.camera.target !== null) return;

        const moveX = (direction) => {
            this.camera.move(direction, this.camera.vel.y);
            this.moveX = direction;
        };
        const moveY = (direction) => {
            this.camera.move(this.camera.vel.x, direction);
            this.moveY = direction;
        };

        const startTimer = (axis, direction) => {
            if(this.edgeTimers[axis]) {
                clearTimeout(this.edgeTimers[axis]);
            }
            this.edgeTimers[axis] = setTimeout(() => {
                if(axis === 'x') moveX(direction);
                if(axis === 'y') moveY(direction);
            }, this.edgeDelay);
        };

        if(x === null || y === null) {
            this.camera.move(0, 0);
            return;
        }

        if(x < this.edgeThreshold) {
            startTimer('x', -1);
        } else if(x > this.camera.width - this.edgeThreshold) {
            startTimer('x', 1);
        } else if(this.edgeTimers.x) {
            clearTimeout(this.edgeTimers.x);
            this.edgeTimers.x = null;
            if(this.moveX !== 0) {
                moveX(0);
                this.moveX = 0;
            }
        }

        if(y < this.edgeThreshold) {
            startTimer('y', -1);
        } else if(y > this.camera.height - this.edgeThreshold) {
            startTimer('y', 1);
        } else if(this.edgeTimers.y) {
            clearTimeout(this.edgeTimers.y);
            this.edgeTimers.y = null;
            if(this.moveY !== 0) {
                moveY(0);
                this.moveY = 0;
            }
        }
    }
}
