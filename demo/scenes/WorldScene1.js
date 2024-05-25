import BaseScene from "../../engine/src/scenes/BaseScene.js";
import Entity from "../entities/Entity.js";
import ExampleLayer from '../layers/ExampleLayer.js';
import BackgroundLayer from "../layers/shared/BackgroundLayer.js";
import SeededRandom from "../../engine/src/utils/noise/SeededRandom.js";

export default class WorldScene1 extends BaseScene {
    constructor() {
        super(1, 1); // Fade in and fade out duration
    }

    init(engine) {
        super.init(engine);
        //this.seededRandom = new SeededRandom(123456);


        // Set up layers
        this.addLayer('backgroundLayer', BackgroundLayer);
        this.addLayer('foregroundLayer', ExampleLayer);

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
        //this.setCameraTarget(firstEntity);
    }

    onLoad() {
        return null;
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
