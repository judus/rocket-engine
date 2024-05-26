import BaseScene from "../../engine/src/scenes/BaseScene.js";
import Entity from "../entities/Entity.js";
import ExampleLayer from '../layers/ExampleLayer.js';
import BackgroundLayer from "../layers/shared/BackgroundLayer.js";
import SeededRandom from "../../engine/src/utils/noise/SeededRandom.js";
import AxisBackground from "../layers/shared/AxisBackground.js";
import ParallaxBackground from "../layers/shared/stars/ParallaxBackground.js";

export default class WorldScene1 extends BaseScene {
    constructor() {
        super(1, 1); // Fade in and fade out duration
    }

    init(engine) {
        super.init(engine);
        // Set up layers
        this.addLayer('backgroundLayer', BackgroundLayer);
        this.addLayer('ParallaxBackground', ParallaxBackground);
        this.addLayer('axisBackground', AxisBackground);
        this.addLayer('foregroundLayer', ExampleLayer);
    }

    load(callback) {
        // No assets to load for this simplified example
        if(typeof callback === 'function') {
            callback();
        }
    }

    onLoad() {
        return null;
    }

    onEnter() {
        super.onEnter();

        const player = this.dataStoreManager.getStore('entities').get('player');
        const camera = this.cameraManager.getCamera('main');

        if(player || camera) {
            camera.setTarget(player);
            this.eventBus.emit('controlEntity', 'player');
        } else {
            console.error("Player entity not found in the data store");
        }
    }

    update(deltaTime, tickCount, totalTime) {
        super.update(deltaTime, tickCount, totalTime);
    }

    render(deltaTime, tickCount, totalTime) {
        super.render(deltaTime, tickCount, totalTime);
    }
}
