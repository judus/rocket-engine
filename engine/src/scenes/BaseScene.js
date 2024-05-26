

import LayerManager from "./LayerManager.js";
import EngineBase from "../abstracts/EngineBase.js";
import CameraECS from "../cameras/CameraECS.js";
import ZoomComponent from "../cameras/ZoomComponent.js";
import FollowComponent from "../cameras/FollowComponent.js";
import TouchComponent from "../cameras/TouchComponent.js";
import ShakeComponent from "../cameras/ShakeComponent.js";

export default class BaseScene extends EngineBase {
    constructor(fadeInDuration = 0, fadeOutDuration = 0, cameraTarget = null) {
        super();
        this.fadeInDuration = fadeInDuration;
        this.fadeOutDuration = fadeOutDuration;
        this.cameraTarget = cameraTarget;

        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.handleScopedMouseMove = this.handleScopedMouseMove.bind(this);
        this.handleScopedMouseLeave = this.handleScopedMouseLeave.bind(this);
    }

    init(engine) {
        super.init(engine);
        this.eventBus = this.engine.eventBus();
        this.dataStoreManager = this.engine.dataStoreManager();

        this.camera = this.cameraManager.createCamera('main', this.width, this.height, this.eventBus);
        this.camera.addComponent(ZoomComponent);
        this.camera.addComponent(FollowComponent, 480, 270);
        this.camera.addComponent(TouchComponent, 100, 500);
        this.camera.addComponent(ShakeComponent);
    }

    setDimensions(width, height) {
        this.width = width;
        this.height = height;
    }

    setLayerManager(layerManager) {
        this.layerManager = layerManager;
    }

    setCameraManager(cameraManager) {
        this.cameraManager = cameraManager;
    }

    load(callback) {
        //Ensure `this` is correctly bound by using an arrow function
        Promise.all([
            // Load assets here (e.g., images, sounds, etc.)
        ]).then((assets) => {
            // Do something with the loaded assets

            if(typeof callback === 'function') {
                callback();
            }
        });
    }

    async transitionInScene(renderer) {
        if(typeof renderer.fadeIn === 'function') {
            await renderer.fadeIn(this.fadeInDuration);
        }
    }

    async transitionOutScene(renderer) {
        if(typeof renderer.fadeOut === 'function') {
            await renderer.fadeOut(this.fadeOutDuration);
        }
    }

    handleMouseWheel(data) {
        this.camera.zoom(data.deltaY);
    }

    handleScopedMouseMove(scopedMouse) {
        const mouseX = scopedMouse.pos.x;
        const mouseY = scopedMouse.pos.y;
        this.camera.touched(mouseX, mouseY);
    }

    handleScopedMouseLeave(scopedMouse) {
        this.camera.touched(null, null);
    }

    addLayer(name, LayerClass) {
        this.layerManager.addLayer(name, LayerClass);
    }

    getLayers() {
        return this.layerManager.layers;
    }

    setCameraTarget(entity) {
        if(entity) {
            this.camera.setTarget(entity);
        }
    }

    updateCamera(deltaTime) {
        this.camera.follow();
        this.camera.update(deltaTime);
    }

    update(deltaTime, tickCount, totalTime) {
        this.camera && this.updateCamera(deltaTime);
    }

    render(deltaTime, tickCount, totalTime) {
        this.layerManager.renderAll(this, deltaTime, tickCount, totalTime);
    }

    onEnter() {
        this.eventBus = this.engine.service('eventBus');
        this.eventBus.emit('scene.enter', this);
        this.eventBus.on('mouseWheelScroll', this.handleMouseWheel);
        this.eventBus.on('scopedMouseMove', this.handleScopedMouseMove);
        this.eventBus.on('scopedMouseLeave', this.handleScopedMouseLeave);
        this.camera.center(0, 0);
    }

    onExit(engine) {
        this.eventBus.emit('scene.exit', this);
        this.eventBus.off('mouseWheelScroll', this.handleMouseWheel);
        this.eventBus.off('scopedMouseMove', this.handleScopedMouseMove);
        this.eventBus.off('scopedMouseLeave', this.handleScopedMouseLeave);
    }

    onLoad() {
        // Return an instance of the loading screen scene
        return null;
    }
}
