import BaseScene from "../../engine/src/scenes/BaseScene.js";
import PolygonLayer from '../layers/PolygonLayer.js';
import BackgroundLayer from "../layers/shared/BackgroundLayer.js";
import ParallaxBackground from "../layers/shared/stars/ParallaxBackground.js";
import ProjectileLayer from "../layers/shared/ProjectileLayer.js";
import HighlightBackground from "../layers/shared/HighlightBackground.js";
import ParticleLayer from "../layers/shared/ParticleLayer.js";
import MouseSelectionLayer from "../layers/shared/MouseSelectionLayer.js";
import AxisBackground from "../layers/shared/AxisBackground.js";
import DynamicContextMenuLayer from "../layers/shared/context-menu/DynamicContextMenuLayer.js";
import StarBackground from "../layers/shared/stars/StarBackground.js";
import SpriteLayer from "../layers/SpriteLayer.js";
import ParallaxBackground2 from "../layers/shared/stars/ParallaxBackground2.js";

export default class WorldScene1 extends BaseScene {
    constructor() {
        super(1, 1); // Fade in and fade out duration
    }

    init(engine) {
        super.init(engine);
        // Set up layers
        //this.addLayer('backgroundLayer', BackgroundLayer);
        this.addLayer('ParallaxBackground', ParallaxBackground);
        this.addLayer('ParallaxBackground2', ParallaxBackground2);
        this.addLayer('axisBackground', AxisBackground);
        this.addLayer('highlight', HighlightBackground);
        this.addLayer('spriteLayer', SpriteLayer); // Add the new sprite layer
        this.addLayer('foregroundLayer', PolygonLayer);
        //this.addLayer('ParticleLayer', ParticleLayer);
        //this.addLayer('ProjectileLayer', ProjectileLayer);

        //this.addLayer('mouseSelectionLayer', MouseSelectionLayer); // Add the new layer
        //this.addLayer('contextMenuLayer', DynamicContextMenuLayer); // Add context menu layer
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
        console.log('WorldScene1: onEnter...');
        super.onEnter();

        const player = this.dataStoreManager.getStore('entities').get('player');
        const camera = this.cameraManager.getCamera('main');

        console.log(this.dataStoreManager.getStore('entities'));

        if(player || camera) {
            this.eventBus.emit('controlEntity', 'player');
            this.setCameraTarget(player);
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
