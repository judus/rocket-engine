import BaseScene from "../../engine/src/scenes/BaseScene.js";
import PositionComponent from "../../engine/src/components/PositionComponent.js";
import RenderComponent from "../../engine/src/components/RenderComponent.js";
import Entity from "../../engine/src/entities/Entity.js";
import PolygonLayer from '../layers/PolygonLayer.js';
import BackgroundLayer from "../layers/shared/BackgroundLayer.js";

export default class Cockpit extends BaseScene {
    constructor() {
        super(1, 1); // Fade in and fade out duration
    }

    init(engine) {
        super.init(engine);
        //this.seededRandom = new SeededRandom(123456);


        // Set up layers
        this.addLayer('backgroundLayer', BackgroundLayer);
        this.addLayer('foregroundLayer', PolygonLayer);

        // engine.createStore('exampleType');
        //
        // // Add entities with random positions
        // for(let i = 0; i < 10; i++) {
        //     const randomX = this.seededRandom.between(0, 512); // Assuming a canvas width of 800
        //     const randomY = this.seededRandom.between(0, 334); // Assuming a canvas height of 600
        //
        //     const entity = new Entity(randomX, randomY, i % 2 === 0 ? 'red' : 'green');
        //     engine.service('entityManager').addEntity(entity, 'exampleType');
        // }

        // Set camera target to the first entity
        //const firstEntity = engine.service('entityManager').getEntitiesByType('exampleType')[0];
    }

    onLoad() {
        return null;
    }

    onEnter() {
        super.onEnter();

        const player = this.dataStoreManager.getStore('entities').get('player');
        const camera = this.dataStoreManager.getStore('cameras').get(this.constructor.name + '-main');
        if(player || camera) {
            camera.setTarget(player);
            this.eventBus.emit('controlEntity', 'player');
        } else {
            console.error("Player entity not found in the data store");
        }
    }

    load(callback) {
        // No assets to load for this simplified example
        if(typeof callback === 'function') {
            callback();
        }
    }

    update(deltaTime, tickCount, totalTime) {
        super.update(deltaTime, tickCount, totalTime);
    }

    render(deltaTime, tickCount, totalTime) {
        super.render(deltaTime, tickCount, totalTime);
    }
}
