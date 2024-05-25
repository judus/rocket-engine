import InventoryComponent from './components/InventoryComponent.js';
import RenderComponent from './components/RenderComponent.js';
import SpatialECS2D from "./entities/SpatialECS2D.js";
import Drawing from "./utils/Drawing.js";
import MovementComponent from "./components/movements/MovementComponent.js";
import TransformComponent from "./components/TransformComponent.js";
import FaceTargetBehavior from "./behaviors/FaceTargetBehavior.js";
import FaceVelocityBehavior from "./behaviors/FaceVelocityBehavior.js";
import CollisionComponent from "./components/CollisionComponent.js";
import BoundingBoxComponent from "./components/BoundingBoxComponent.js";
import ClickableComponent from "./components/ClickableComponent.js";
import HealthComponent from "./components/HealthComponent.js";
import DefaultCollisionResponse from "./components/collisions/DefaultCollisionResponse.js";

export default class Station extends SpatialECS2D {
    constructor(dataStoreManager, eventBus, definition, x = 0, y = 0, id, faction) {
        super(dataStoreManager.getStore('entities'), x, y, id);

        this.eventBus = eventBus;
        this.dataStoreManager = dataStoreManager;
        this.definition = definition;
        this.faction = faction;
        this.id = id;
        this.scale = 3;
        this.ships = [];  // New property to track ships

        this.color = this.faction ? this.faction.getFactionColor() : this.definition.properties.color;
        this.drawing = new Drawing(this.color);

        this.addComponent('inventory', new InventoryComponent({}));

        this.addComponent('movement', new MovementComponent());

        this.addComponent('transform', new TransformComponent(x, y, 0, this.scale));

        this.addComponent('health', new HealthComponent(100));

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

    addShip(ship) {
        this.ships.push(ship);
    }
}
