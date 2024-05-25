import RenderComponent from './components/RenderComponent.js';
import SpatialECS2D from "./entities/SpatialECS2D.js";
import Drawing from "./utils/Drawing.js";
import MovementComponent from "./components/movements/MovementComponent.js";
import TransformComponent from "./components/TransformComponent.js";
import FaceVelocityBehavior from "./behaviors/FaceVelocityBehavior.js";
import CollisionComponent from "./components/CollisionComponent.js";
import BoundingBoxComponent from "./components/BoundingBoxComponent.js";
import ClickableComponent from "./components/ClickableComponent.js";
import DefaultCollisionResponse from "./components/collisions/DefaultCollisionResponse.js";
import HealthComponent from "./components/HealthComponent.js";

export default class Asteroid extends SpatialECS2D {
    constructor(dataStoreManager, eventBus, definition, x = 0, y = 0, id = null, scale = 1) {
        super(dataStoreManager.getStore('entities'), x, y, id);
        this.eventBus = eventBus;
        this.dataStoreManager = dataStoreManager;
        this.definition = definition;
        this.id = id;
        this.scale = scale;

        this.drawing = new Drawing(this.definition.properties.color);

        this.addComponent('movement', new MovementComponent());

        this.addComponent('transform', new TransformComponent(x, y, 0, this.scale));

        // Collision detection
        if (this.scale > 8) {
            // Collision detection
            const collisionType = this.definition.collisionType || 'box';
            const particleSystem = dataStoreManager.getStore('global').get('particleSystem');
            this.addComponent('collision', new CollisionComponent(
                collisionType, false, new DefaultCollisionResponse(particleSystem))
            );

            if(collisionType === 'box') {
                // Add multiple bounding boxes
                this.addComponent('boundingBox', new BoundingBoxComponent(
                    ...this.definition.collisionBoxes
                ));
            }

            this.addComponent('clickable', new ClickableComponent((event, entity) => {
                console.log(`${entity.id} clicked`, entity);
                // Define custom behavior here
            }));
        }

        this.addComponent('health', new HealthComponent(100));


        this.addComponent('render', new RenderComponent((deltaTime, context, entity, camera) => {
            this.drawing.draw(context, entity, camera);
        }));

        // Initialize behavior
        this.behavior = new FaceVelocityBehavior();
    }


    setBehavior(behavior) {
        this.behavior = behavior;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.behavior) {
            this.behavior.perform(this, deltaTime);
        }
    }
}
