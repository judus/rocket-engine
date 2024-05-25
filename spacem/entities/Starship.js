import RenderComponent from './components/RenderComponent.js';
import SpatialECS2D from "./entities/SpatialECS2D.js";
import Drawing from "./utils/Drawing.js";
import InventoryComponent from "./components/InventoryComponent.js";
import MovementComponent from "./components/movements/MovementComponent.js";
import MovementState from "./components/movements/MovementState.js";
import TransformComponent from "./components/TransformComponent.js";
import FaceTargetBehavior from "./behaviors/FaceTargetBehavior.js";
import FaceVelocityBehavior from "./behaviors/FaceVelocityBehavior.js";
import RoamingBehavior from "./behaviors/RoamingBehavior.js";
import BoundingBoxComponent from "./components/BoundingBoxComponent.js";
import CollisionComponent from "./components/CollisionComponent.js";
import {movementStateDefinitions} from "./components/movements/movementStateDefinitions.js";
import AttackComponent from "./components/AttackComponent.js";
import ScannerComponent from "./components/ScannerComponent.js";
import NavigationComponent from "./components/NavigationComponent.js";
import AutopilotComponent from "./components/AutopilotComponent.js";
import HangarComponent from "./components/HangarComponent.js";
import ClickableComponent from "./components/ClickableComponent.js";
import DefaultCollisionResponse from "./components/collisions/DefaultCollisionResponse.js";
import HealthComponent from "./components/HealthComponent.js";

export default class Starship extends SpatialECS2D {
    constructor(dataStoreManager, eventBus, definition, x = 0, y = 0, id, faction, station, scale = 1) {
        super(dataStoreManager.getStore('entities'), x, y, id);

        this.eventBus = eventBus;
        this.dataStoreManager = dataStoreManager;
        this.definition = definition; // the vertices are contained in here; this.definition.vertices
        this.faction = faction;
        this.station = station;
        this.id = id;
        this.scale = scale;

        this.color = this.faction ? this.faction.getFactionColor() : 'red';
        this.drawing = new Drawing(this.color);

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
        this.addComponent('transform', new TransformComponent(x, y, 0, this.scale));

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

        // Health
        this.addComponent('health', new HealthComponent(100));

        // Ship systems
        this.addComponent('attack', new AttackComponent(eventBus, this.dataStoreManager.getStore('bullets')));

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
            this.drawing.draw(context, entity, camera);
        }, false));

        // Initialize behavior
        const player = this.dataStoreManager.getStore('entities').get('player');
        //this.behavior = new RoamingBehavior({ pos: {x, y}}, 6000, 50);
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