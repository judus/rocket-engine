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
import ClickableComponent from "../../engine/src/components/ClickableComponent.js";
import AttackComponent from "../components/AttackComponent.js";
import AutopilotComponent from "../components/AutopilotComponent.js";
import {movementStateDefinitions} from "../../engine/src/components/movements/movementStateDefinitions.js";
import EntityVerticesComponent from "../components/EntityVerticesComponent.js";
import EntityHighlightRenderComponent from "../components/EntityHighlightRenderComponent.js";
import RoamingBehavior from "../../spacem/behaviors/RoamingBehavior.js";


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
        this.addComponent('render', new EntityVerticesComponent());
        this.addComponent('highlight', new EntityHighlightRenderComponent());


        // Initialize behavior
        //const player = this.dataStoreManager.getStore('entities').get('player');
        this.behavior = new RoamingBehavior({ pos: {x, y}}, 6000, 50);
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