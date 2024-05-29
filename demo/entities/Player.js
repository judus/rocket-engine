import SpatialECS2D from "../../engine/src/entities/SpatialECS2D.js";
import Drawing from "../../engine/src/services/Drawing.js";
import MovementComponent from "../../engine/src/components/movements/MovementComponent.js";
import MovementState from "../../engine/src/components/movements/MovementState.js";
import TransformComponent from "../../engine/src/components/TransformComponent.js";
import CollisionComponent from "../../engine/src/components/collisions/CollisionComponent.js";
import DefaultCollisionResponse from "../../engine/src/components/collisions/DefaultCollisionResponse.js";
import BoundingBoxComponent from "../../engine/src/components/collisions/BoundingBoxComponent.js";
import HealthComponent from "../../engine/src/components/HealthComponent.js";
import InventoryComponent from "../components/InventoryComponent.js";
import ScannerComponent from "../components/ScannerComponent.js";
import NavigationComponent from "../components/NavigationComponent.js";
import HangarComponent from "../components/HangarComponent.js";
import RenderComponent from "../../engine/src/components/RenderComponent.js";
import FaceVelocityBehavior from "../../engine/src/behaviors/FaceVelocityBehavior.js";
import WeaponSystemComponent from "../components/WeaponSystemComponent.js";
import AttackComponent from "../components/AttackComponent.js";
import AutopilotComponent from "../components/AutopilotComponent.js";
import {movementStateDefinitions} from "../../engine/src/components/movements/movementStateDefinitions.js";
import PositionComponent from "../../engine/src/components/PositionComponent.js";
import SpriteComponent from "../../engine/src/sprites/SpriteComponent.js";

export default class Player extends SpatialECS2D {
    constructor(engine, definition, x = 0, y = 0, id = null) {
        const dataStoreManager = engine.dataStoreManager();

        super(dataStoreManager.getStore('entities'), x, y, id);

        this.engine = engine;

        this.eventBus = engine.eventBus();
        this.dataStoreManager = dataStoreManager;
        this.definition = definition;
        this.faction = null;
        this.station = null;
        this.id = id;
        this.scale = 1;
        this.initialRotation = 0;

        this.definition = definition; // The vertices are contained in here

        //console.log(definition);

        this.drawing = new Drawing(this.definition.polygon.fillColor);

        this.mousePosition = {x: 0, y: 0};
        this.eventBus.on('scopedMouseMove', (mouse) => {
            this.mousePosition = {x: mouse.pos.x, y: mouse.pos.y};
        });

        // Initialize MovementComponent without predefined states
        const movementComponent = new MovementComponent({
            vel: {x: 0, y: 0},
            acc: {x: 0, y: 0},
            drag: 0.95,
        });

        // Add movement states to MovementComponent
        movementStateDefinitions.forEach(state => {
            movementComponent.addState(new MovementState(state));
        });

        // Set initial state
        movementComponent.setState('walk');

        // Positioning, movement, and transformations
        this.addComponent('movement', movementComponent);
        this.addComponent('transform', new TransformComponent(x, y, this.initialRotation, this.scale));

        // Collision detection
        // const collisionType = this.definition.collisionType || 'box';
        const particleSystem = dataStoreManager.getStore('global').get('particleSystem');
        this.addComponent('collision', new CollisionComponent(new DefaultCollisionResponse(particleSystem), false)
        );
        //
        // if(collisionType === 'box') {
        //     // Add multiple bounding boxes
        //     this.addComponent('boundingBox', new BoundingBoxComponent(
        //         ...this.definition.collisionBoxes
        //     ));
        // }

        // Weapon systems
        this.addComponent('weaponSystem', new WeaponSystemComponent(this.eventBus, dataStoreManager));
        this.addComponent('attack', new AttackComponent(this.eventBus, this.dataStoreManager));

        const weaponSystem = this.getComponent('weaponSystem');
        weaponSystem.addWeapon(0, 'laserCannon');
        weaponSystem.addWeapon(1, 'machineGun');
        weaponSystem.configureGroup('default', [0, 1]);
        weaponSystem.configureGroup('lasers', [0]);
        weaponSystem.configureGroup('machineGuns', [1]);


        // Health
        this.addComponent('health', new HealthComponent(100));

        // Ship has an inventory, capacity can be upgraded at shipyard
        this.addComponent('inventory', new InventoryComponent());

        // Ship can integrate different systems, which can be bought at shipyard
        this.addComponent('scanner', new ScannerComponent());
        this.addComponent('navigation', new NavigationComponent());
        this.addComponent('autopilot', new AutopilotComponent());

        // This ship is a carrier ship, it can launch and recover drones and ships
        this.addComponent('hangar', new HangarComponent());

        // Rendering
        this.addComponent('render', new RenderComponent((deltaTime, context, entity, camera) => {
            Drawing.draw(context, entity, camera, entity.color);
        }, true));

        //Load single-frame sprite sheet and add SpriteComponent
        const spriteSheetManager = this.engine.spriteSheetManager();
        const heroSpriteSheet = spriteSheetManager.getSpriteSheet('gunship-fighter-3');
        const spriteComponent = new SpriteComponent(heroSpriteSheet, 0);
        this.addComponent('sprite', spriteComponent);


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
