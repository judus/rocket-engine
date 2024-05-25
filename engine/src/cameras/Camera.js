import Area from "../utils/spatial/Area.js";
import {Vector2d} from "../utils/maths/Vector2D.js";

export default class Camera {
    constructor(width, height, eventBus, x = 0, y = 0, edgeThreshold = 50, deadZoneX = 480, deadZoneY = 270) {
        this.width = width;
        this.height = height;
        this.pos = new Vector2d(x, y);
        this.vel = new Vector2d(0, 0);
        this.acc = new Vector2d(16, 16);
        this.dcl = new Vector2d(100, 100);
        this.moves = false;
        this.deadZoneX = deadZoneX !== null ? (width - deadZoneX * 2) / 2 : null;
        this.deadZoneY = deadZoneY !== null ? (height - deadZoneY * 2) / 2 : null;
        this.firstFollow = true;
        this.target = null;
        this.shakeDuration = 0;
        this.shakeMagnitude = 0;
        this.shakeOffset = new Vector2d(0, 0);
        this.zoomLevel = 1;
        this.targetZoom = 1;
        this.zoomSpeed = 0.1;
        this.eventBus = eventBus;
        this.edgeThreshold = edgeThreshold;
        this.edgeDelay = 800;
        this.edgeTimers = {x: null, y: null};
        this.moveX = 0;
        this.moveY = 0;


        this.eventBus.on('mouseWheelScroll', this.handleMouseWheelScroll.bind(this));

    }

    isMoving() {
        return this.vel.x !== 0 || this.vel.y !== 0 || this.moves;
    }

    setPos(x, y) {
        this.pos.x = Math.floor(x);
        this.pos.y = Math.floor(y);
    }

    move(x, y) {
        this.vel.set(x, y);
    }

    center(x, y) {
        this.setPos(x - (this.width / 2 / this.zoomLevel), y - (this.height / 2 / this.zoomLevel));
    }

    update(deltaTime) {
        this.pos.add(
            this.vel.x * this.acc.x,
            this.vel.y * this.acc.y
        );

        if(this.shakeDuration > 0) {
            this.shakeDuration -= deltaTime;
            const shakeAngle = Math.random() * Math.PI * 2;
            this.shakeOffset.set(
                Math.cos(shakeAngle) * this.shakeMagnitude,
                Math.sin(shakeAngle) * this.shakeMagnitude
            );
        } else {
            this.shakeOffset.set(0, 0);
        }

        if(this.zoomLevel !== this.targetZoom) {
            const zoomDifference = this.targetZoom - this.zoomLevel;
            this.zoomLevel += zoomDifference * this.zoomSpeed;
            if(Math.abs(zoomDifference) < 0.01) {
                this.zoomLevel = this.targetZoom;
            }
        }
    }

    getArea() {
        const x1 = this.pos.x + this.shakeOffset.x;
        const y1 = this.pos.y + this.shakeOffset.y;
        const x2 = x1 + this.width / this.zoomLevel;
        const y2 = y1 + this.height / this.zoomLevel;
        return new Area(x1, y1, x2, y2);
    }

    setTarget(target) {
        this.target = target;
        this.firstFollow = true;
    }

    follow() {
        if(!this.target) return;

        const targetX = this.target.pos.x;
        const targetY = this.target.pos.y;

        if(this.firstFollow) {
            this.center(targetX, targetY);
            this.firstFollow = false;
            return;
        }

        const centerX = this.pos.x + this.width / 2 / this.zoomLevel;
        const centerY = this.pos.y + this.height / 2 / this.zoomLevel;

        const dx = targetX - centerX;
        const dy = targetY - centerY;

        if(this.deadZoneX !== null && Math.abs(dx) > this.deadZoneX / this.zoomLevel) {
            this.pos.x += dx - Math.sign(dx) * this.deadZoneX / this.zoomLevel;
        } else if(this.deadZoneX === null) {
            this.pos.x += dx;
        }

        if(this.deadZoneY !== null && Math.abs(dy) > this.deadZoneY / this.zoomLevel) {
            this.pos.y += dy - Math.sign(dy) * this.deadZoneY / this.zoomLevel;
        } else if(this.deadZoneY === null) {
            this.pos.y += dy;
        }
    }

    shake(duration, magnitude) {
        this.shakeDuration = duration;
        this.shakeMagnitude = magnitude;
    }

    setZoom(targetZoom, speed = 0.1) {
        if(targetZoom > 0) {
            const oldZoomLevel = this.zoomLevel;
            this.targetZoom = targetZoom;
            this.zoomSpeed = speed;

            // Calculate the current center of the view
            const centerX = this.pos.x + this.width / 2 / oldZoomLevel;
            const centerY = this.pos.y + this.height / 2 / oldZoomLevel;

            // Update zoom level
            this.zoomLevel = targetZoom;

            // Calculate new position based on the new zoom level to maintain the center
            this.pos.x = centerX - this.width / 2 / this.zoomLevel;
            this.pos.y = centerY - this.height / 2 / this.zoomLevel;
        } else {
            console.warn("Zoom level must be greater than 0");
        }
    }

    handleMouseWheelScroll(event) {
        const zoomChange = event.deltaY < 0 ? 0.1 : -0.1;
        const newZoom = this.targetZoom + zoomChange;
        this.setZoom(Math.max(1, Math.min(newZoom, 5)));
        console.log(this.zoomLevel);
    }

    touched(x, y) {
        const moveX = (direction) => {
            this.move(direction, this.vel.y);
            this.moveX = direction;
        };
        const moveY = (direction) => {
            this.move(this.vel.x, direction);
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
            this.move(0, 0);
            return;
        }

        if(x < this.edgeThreshold) {
            startTimer('x', -1);
        } else if(x > this.width - this.edgeThreshold) {
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
        } else if(y > this.height - this.edgeThreshold) {
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
