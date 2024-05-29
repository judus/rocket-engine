import SpatialECS2D from "../../engine/src/entities/SpatialECS2D.js";
import Drawing from "../../engine/src/services/Drawing.js";
import MovementComponent from "../../engine/src/components/movements/MovementComponent.js";
import TransformComponent from "../../engine/src/components/TransformComponent.js";
import CollisionComponent from "../../engine/src/components/collisions/CollisionComponent.js";
import DefaultCollisionResponse from "../../engine/src/components/collisions/DefaultCollisionResponse.js";
import BoundingBoxComponent from "../../engine/src/components/collisions/BoundingBoxComponent.js";
import HealthComponent from "../../engine/src/components/HealthComponent.js";
import InventoryComponent from "../components/InventoryComponent.js";
import RenderComponent from "../../engine/src/components/RenderComponent.js";
import ClickableComponent from "../../engine/src/components/ClickableComponent.js";
import FaceVelocityBehavior from "../../engine/src/behaviors/FaceVelocityBehavior.js";
import EntityVerticesComponent from "../components/EntityVerticesComponent.js";
import EntityHighlightRenderComponent from "../components/EntityHighlightRenderComponent.js";

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

        this.addComponent('inventory', new InventoryComponent({}));

        this.addComponent('movement', new MovementComponent());

        this.addComponent('transform', new TransformComponent(x, y, 0, this.scale));

        this.addComponent('health', new HealthComponent(100));

        // Collision detection
        // const collisionType = this.definition.collisionType || 'box';
        // const particleSystem = dataStoreManager.getStore('global').get('particleSystem');
        // this.addComponent('collision', new CollisionComponent(
        //     collisionType, false, new DefaultCollisionResponse(particleSystem))
        // );
        //
        // if(collisionType === 'box') {
        //     // Add multiple bounding boxes
        //     this.addComponent('boundingBox', new BoundingBoxComponent(
        //         ...this.definition.collisionBoxes
        //     ));
        // }

        this.addComponent('clickable', new ClickableComponent((event, entity) => {
            console.log(`${entity.id} clicked`, entity);
            // Define custom behavior here
        }));

        this.addComponent('render', new RenderComponent((deltaTime, context, entity, camera) => {
            Drawing.draw(context, entity, camera, entity.color);
        }, true));

        this.addComponent('highlight', new EntityHighlightRenderComponent());



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
