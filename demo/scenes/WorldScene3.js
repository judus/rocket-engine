import BaseScene from "../../engine/src/scenes/BaseScene.js";
import PositionComponent from "../../engine/src/components/PositionComponent.js";
import RenderComponent from "../../engine/src/components/RenderComponent.js";
import Entity from "../../engine/src/entities/Entity.js";
import ExampleLayer from '../layers/ExampleLayer.js';

export default class WorldScene3 extends BaseScene {
    constructor() {
        super(1, 1); // Fade in and fade out duration
    }

    init(engine) {
        super.init(engine);

        // Set up layers
        this.addLayer('backgroundLayer', ExampleLayer);
        this.addLayer('mainLayer', ExampleLayer);

        engine.createStore('exampleType');

        // // Add entities
        // const entity1 = new Entity('entity1');
        // entity1.addComponent('position', new PositionComponent(100, 100));
        // entity1.addComponent('render', new RenderComponent('sprite1'));
        //
        // const entity2 = new Entity('entity2');
        // entity2.addComponent('position', new PositionComponent(200, 200));
        // entity2.addComponent('render', new RenderComponent('sprite2'));
        //
        // // Add entities to the entity manager
        // this.engine.service('entityManager').addEntity(entity1);
        // this.engine.service('entityManager').addEntity(entity2);
        //
        // // Set camera target
        // this.setCameraTarget(entity1);
    }

    onLoad() {
        // Optionally return a loading scene
        return null;
    }

    load(callback) {
        // Load assets needed for this scene
        const assetManager = this.engine.service('assetManager');
        assetManager.loadImage('sprite1', 'path/to/sprite1.png');
        assetManager.loadImage('sprite2', 'path/to/sprite2.png');

        // Call the callback once loading is complete
        assetManager.setCompleteHandler(() => {
            if(typeof callback === 'function') {
                callback();
            }
        });
    }

    update(deltaTime, tickCount, totalTime) {
        super.update(deltaTime, tickCount, totalTime);
        // Additional update logic for this scene
    }

    render(deltaTime, tickCount, totalTime) {
        super.render(deltaTime, tickCount, totalTime);
        // Additional render logic for this scene
    }
}
