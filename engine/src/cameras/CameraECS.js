import Area from "../utils/spatial/Area.js";
import Vector2D from "../utils/maths/Vector2D.js";
import TouchComponent from "./TouchComponent.js";
import ZoomComponent from "./ZoomComponent.js";
import FollowComponent from "./FollowComponent.js";
import ShakeComponent from "./ShakeComponent.js";

export default class CameraECS {
    constructor(width, height, eventBus, x = 0, y = 0) {
        this.width = width;
        this.height = height;
        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D(0, 0);
        this.acc = new Vector2D(16, 16);
        this.dcl = new Vector2D(100, 100);
        this.moves = false;
        this.eventBus = eventBus;
        this.components = [];

        this.zoomLevel = 1;
        this.shakeOffset = new Vector2D(0, 0);

        this.eventBus.on('mouseWheelScroll', this.handleMouseWheelScroll.bind(this));
        this.eventBus.on('scopedMouseDown', this.handleMouseDown.bind(this));
    }

    addComponent(component, ...args) {
        this.components[component.name] = new component(this, ...args);
        this[component.name] = this.components[component.name];
    }

    getComponent(componentClass) {
        return this.components[componentClass.name];
    }

    hasComponent(componentClass, onTrue, onFalse) {
        if(this.components[componentClass.name]) {
            onTrue && onTrue(this.components[componentClass.name], this);
        } else {
            onFalse && onFalse(componentClass.name)
        }
    }

    isMoving() {
        return this.vel.x !== 0 || this.vel.y !== 0 || this.moves;
    }

    setPos(x, y) {
        this.pos.x = Math.floor(x);
        this.pos.y = Math.floor(y);
        this.eventBus.emit('cameraMoved', {pos: this.pos});  // Emit camera moved event
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

        this.components.forEach(component => component.update(deltaTime));
        this.eventBus.emit('cameraMoved', {pos: this.pos});
    }

    getArea() {
        const x1 = this.pos.x + this.shakeOffset.x;
        const y1 = this.pos.y + this.shakeOffset.y;
        const x2 = x1 + this.width / this.zoomLevel;
        const y2 = y1 + this.height / this.zoomLevel;

        return new Area(x1, y1, x2, y2);
    }

    handleMouseWheelScroll(event) {
        const zoomComponent = this.getComponent(ZoomComponent);
        if(zoomComponent) {
            const zoomChange = event.deltaY > 0 ? -0.1 : 0.1; // Invert zoom behavior
            const newZoom = zoomComponent.targetZoom + zoomChange;
            zoomComponent.setZoom(Math.max(0.1, Math.min(newZoom, 5))); // Allow zooming out further
        }
    }

    handleMouseDown(mouse) {
        const x = (mouse.pos.x / this.zoomLevel) + this.pos.x;
        const y = (mouse.pos.y / this.zoomLevel) + this.pos.y;
        this.eventBus.emit('cameraClick', {x, y, mouse});
    }

    zoom(deltaY) {
        this.hasComponent(ZoomComponent, (zoomComponent) => {
            zoomComponent.zoom(deltaY);
        });
    }

    touched(x, y) {
        this.hasComponent(TouchComponent, (touchComponent) => {
            touchComponent.touched(x, y);
        });
    }

    setTarget(target) {
        this.hasComponent(FollowComponent, (followComponent) => {
            followComponent.setTarget(target);
        });
    }

    follow() {
        this.hasComponent(FollowComponent, (followComponent) => {
            followComponent.update(0); // Use the update method to handle the following logic
        });

    }

    shake(duration, magnitude) {
        this.hasComponent(ShakeComponent, (shakeComponent) => {
            shakeComponent.shake(duration, magnitude);
        });
    }
}
