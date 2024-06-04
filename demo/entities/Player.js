import Drawing from "../../engine/src/services/Drawing.js";
import MovementComponent from "../../engine/src/components/movements/MovementComponent.js";
import TransformComponent from "../../engine/src/components/TransformComponent.js";
import CollisionComponent from "../../engine/src/components/collisions/CollisionComponent.js";
import DefaultCollisionResponse from "../../engine/src/components/collisions/DefaultCollisionResponse.js";
import HealthComponent from "../../engine/src/components/HealthComponent.js";
import InventoryComponent from "../components/InventoryComponent.js";
import ScannerComponent from "../components/ScannerComponent.js";
import NavigationComponent from "../components/NavigationComponent.js";
import HangarComponent from "../components/HangarComponent.js";
import RenderComponent from "../../engine/src/components/RenderComponent.js";
import FaceVelocityBehavior from "../../engine/src/behaviors/FaceVelocityBehavior.js";
import WeaponSystemComponent from "../components/WeaponSystemComponent.js";
import AutopilotComponent from "../components/AutopilotComponent.js";
import {movementStateDefinitions} from "../../engine/src/components/movements/movementStateDefinitions.js";
import SpriteComponent from "../../engine/src/sprites/SpriteComponent.js";
import Entity from "../../engine/src/entities/Entity.js";
import EntityTransform from "../../engine/src/services/EntityTransform.js";
import Polygon from "../../engine/src/utils/maths/Polygon.js";
import ShipEngineComponent from "../../engine/src/components/movements/ShipEngineComponent.js";
import Entity2D from "../../engine/src/entities/physics/Entity2D.js";
import StarShip from "../../engine/src/entities/physics/StarShip.js";

export default class Player extends StarShip {
    constructor(engine, config, x, y, id = null) {
        const dataStoreManager = engine.dataStoreManager();
        super(engine, config, id);

        this.definition = config;
        this.faction = null;
        this.station = null;

        this.dataStoreManager = dataStoreManager;
        //this.particleSystem = this.dataStoreManager.getStore('global').get('particleSystem');

        this.collisionBoxes = config.collisionBoxes || [];
        this.boundingBox = this.createBoundingBox();
        this.polygon = new Polygon(config.polygon.vertices)
            .offsetToCenter()
            .rotate(config.polygon.orientation)
            .vertices;
        //
        this.frames = config.collisionData.framePolygons || {};

        this.width = config.width || 0;
        this.height = config.height || 0;
        this.scale = config.scale || 1;
        this.rotation = 0;

        this.drawing = new Drawing(this.definition.polygon.fillColor);

        this.mousePosition = {x: 0, y: 0};

        this.eventBus.on('scopedMouseMove', (mouse) => {
            this.mousePosition = {x: mouse.pos.x, y: mouse.pos.y};
        });

        //EntityTransform.updateVertices(this, this.polygon);

        // Handles velocity, acceleration, drag, rotation and rotation speed
        // Needs constant update, even outside of view port
        //this.addComponent('movement', new MovementComponent(movementStateDefinitions).setState('walk'), 1 / 60);

        // Handles position, rotation and scale
        // Needs update only when in view port
        //this.addComponent('transform', new TransformComponent(0, 0, this.rotation, this.scale), 1 / 60);

        // Handles sprite sheet according to the movement component
        // Needs update only when moving and in view port
        //this.addComponent('sprite', new SpriteComponent(this.spriteSheet, 0), 1 / 60);

        // Handles the polygon representation of the entity according to the movement component
        // Needs update only when moving and in view port
        //this.addComponent('polygon', new SpriteComponent(this.definition.polygon, false));

        // Handles the quad tree of the entity according to the movement component
        // Needs update only when moving and in view port
        //this.addComponent('quadTree', new SpriteComponent(false));

        // Handles the calculated effective bounding box based on the alpha channel of the entity's sprite according to the movement component
        // Needs update only when in view port and quad tree has results
        //this.addComponent('boundingBox', new SpriteComponent(this.definition.collisionData.boundingBox, false));

        // Handles the composited sub bounding boxes of the entity according to the movement component
        // Needs update only when in view port and bounding box triggers an immediate collision
        //this.addComponent('subBoxes', new SpriteComponent(this.definition.collisionData.subBoundingBoxes, false));

        // Handles the current sprite frame index calculated polygon of the entity according to the movement component
        // Needs update only when in view port and one of the sub bounding boxes triggers an immediate collision
        //this.addComponent('framePolygon', new SpriteComponent(this.definition.collisionData.subBoundingBoxes, false));

        // Handles the collision detection and responses in the following order:
        // 1. Bounding box collision detection
        // 2. Sub bounding box collision detection
        // 3. Polygon or current sprite frame polygon collision detection
        // this.addComponent('collision', new CollisionComponent(new DefaultCollisionResponse(this.particleSystem), false));
        //
        //
        // // Weapon systems
        // this.addComponent('weaponSystem', new WeaponSystemComponent(this.eventBus, dataStoreManager));
        // //this.addComponent('attack', new AttackComponent(this.eventBus, this.dataStoreManager));
        //
        // const weaponSystem = this.getComponent('weaponSystem');
        // weaponSystem.addWeapon(0, 'laserCannon');
        // weaponSystem.addWeapon(1, 'machineGun');
        // weaponSystem.configureGroup('default', [0, 1]);
        // weaponSystem.configureGroup('lasers', [0]);
        // weaponSystem.configureGroup('machineGuns', [1]);
        //
        //
        // // Health
        // this.addComponent('health', new HealthComponent(100));
        //
        // // Ship has an inventory, capacity can be upgraded at shipyard
        // this.addComponent('inventory', new InventoryComponent());
        //
        // // Ship can integrate different systems, which can be bought at shipyard
        // this.addComponent('scanner', new ScannerComponent());
        // this.addComponent('navigation', new NavigationComponent());
        // this.addComponent('autopilot', new AutopilotComponent());
        //
        // // This ship is a carrier ship, it can launch and recover drones and ships
        // this.addComponent('hangar', new HangarComponent());

        // Rendering


        // Initialize behavior
        // this.behavior = new FaceVelocityBehavior();
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

    render(deltaTime) {
        super.render(deltaTime); // Render components and children
    }

    onCollision(otherEntity, collisionResult) {
        const collisionComponent = this.getComponent('collision');
        if(collisionComponent) {
            collisionComponent.handleCollision(otherEntity, collisionResult);
        }
    }
}
