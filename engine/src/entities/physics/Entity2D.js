import EntityTransform from "../../services/EntityTransform.js";
import EntityManager from "../EntityManager.js";
import EngineParts from "../../EngineParts.js";
import StringHelpers from "../../utils/StringHelpers.js";
import CustomPhysics2D from "../../physics/CustomPhysics2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import QuadTree from "../../services/QuadTree.js";
import Rectangle from "../../utils/maths/Rectangle.js";
import EntityFactory from "../../../../demo/entities/EntityFactory.js";
export default class Entity2D {
    constructor(engine, config, id = null) {
        this.engine = engine;
        this.id = id || config.id || StringHelpers.generateUUID();
        this.type = config.type || this.constructor.name;
        this.isStatic = config.isStatic || false;

        // Geometry
        this.width = config.collisionData?.sprite?.width || config.collisionData?.boundingBox?.width || config.width || 0;
        this.height = config.collisionData?.sprite?.height || config.collisionData?.boundingBox?.height || config.height || 0;
        this.scale = config.scale || 1;

        // Physics
        this.mass = config.mass || 1;
        this.pos = config.pos || new Vector3D();
        this.rotation = config.orientation || 0;
        this.velocity = config.velocity || new Vector3D();
        this.acceleration = config.acceleration || new Vector3D();
        this.momentOfInertia = config.momentOfInertia || 1;
        this.angularVelocity = config.angularVelocity || 0;
        this.angularAcceleration = config.angularAcceleration || 0;
        this.orientation = config.orientation || 0;
        this.accelerationModifier = config.accelerationModifier || 1;
        this.inertiaModifier = config.inertiaModifier || 1;
        this.dragCoefficient = config.dragCoefficient || 0.1;
        this.rotationalDragCoefficient = config.rotationalDragCoefficient || 0.1;

        // Functional
        this.updateTaskScheduler = engine.create(EngineParts.TASK_SCHEDULER);
        this.renderTaskScheduler = engine.create(EngineParts.TASK_SCHEDULER);
        this.eventBus = engine.service(EngineParts.EVENT_BUS);
        this.entityFactory = new EntityFactory(engine);
        this.components = {};
        this.behavior = config.behavior || null;
        this.spriteSheet = config.sprite || null;

        // Collision
        this.collisionDetection = config.collisionDetection || null; // number from 1-4
        this.boundingBox = config.collisionData?.boundingBox// The bounding box of the entity
        this.collisionBoxes = config.collisionData?.subBoundingBoxes || []; // the entity has multiple collision boxes
        this.polygon = config.polygon?.vertices || []; // the polygonal shape of the entity if it has one
        this.framePolygons = config.collisionData?.framePolygons || {}; // this is supposed to be an auto generated polygon for the contour of the current sprite frame

        this.color = config.polygon?.fillColor;

        // Hierarchy
        this.children = [];
        this.parent = null;

        // Storage
        this.entityManager = engine.service(EngineParts.ENTITY_MANAGER);
        this.storeName = config.storeName || EngineParts.ENTITY_STORE_NAME;
        this.spatialHash = null;

        // Add this entity to the hash grid
        console.log(`Entity ${this.id} constructed.`, this);
        // this.entityManager.addEntity(this);
        // console.log('State of store', this.engine.dataStoreManager().getStore('entities'));
    }

    createBoundingBox() {
        return {
            x: this.pos.x,
            y: this.pos.y,
            width: this.width,
            height: this.height
        };
    }

    getComponent(name) {
        return this.components[name];
    }

    hasComponent(name, onTrue, onFalse) {
        if(this.components[name]) {
            onTrue && onTrue(this.components[name], this);
        } else {
            onFalse && onFalse(name)
        }
    }

    addComponent(componentType, component, updateFrequency = 1, renderFrequency = 1) {
        if(this.components[componentType]) {
            console.warn(`Component ${componentType} already exists on entity ${this.id}`);
            return;
        }

        this.components[componentType] = component;
        component.onAdd(this);

        if(component.update) {
            this.updateTaskScheduler.addTask(component.update.bind(component), component.constructor.name, updateFrequency);
        }
        if(component.render) {
            this.renderTaskScheduler.addTask(component.render.bind(component), component.constructor.name, renderFrequency);
        }
    }

    removeComponent(componentType) {
        const component = this.components[componentType];
        if(component) {
            component.onRemove();
            this.updateTaskScheduler.removeTask(component.update.bind(component));
            this.renderTaskScheduler.removeTask(component.render.bind(component));
            delete this.components[componentType];
        }
    }

    addChild(child) {
        if(this.children.includes(child)) {
            console.warn(`Child ${child.id} already added to entity ${this.id}`);
            return;
        }
        child.parent = this;
        this.children.push(child);
        this.entityManager.removeEntity(child);
    }

    removeChild(child) {
        this.children = this.children.filter(c => c !== child);
        child.parent = null;
        this.entityManager.addEntity(child);
    }

    getGlobalPosition() {
        return EntityTransform.getGlobalPosition(this);
    }

    getGlobalScale() {
        return EntityTransform.getGlobalScale(this);
    }

    getGlobalRotation() {
        return EntityTransform.getGlobalRotation(this);
    }

    update(deltaTime) {
        // Run all update component tasks
        this.updateTaskScheduler.runTasks(deltaTime);

        // Update the spatial hash grid if there is no parent
        if(!this.parent && this.entityManager) {
            this.entityManager.updateEntity(this);
        }

        // Update children after physics updates
        this.children.forEach(child => child.update(deltaTime)); // Children don't have physics components
    }

    render(deltaTime, context, entity, camera) {
        // Run all render component tasks
        this.renderTaskScheduler.runTasks(deltaTime, context, entity, camera);

        // Render children
        this.children.forEach(child => child.render(context));
    }

    setBehavior(behavior, frequency = 1) {
        if(this.behavior) {
            this.updateTaskScheduler.removeTask(this.behavior.perform.bind(this.behavior, this));
        }
        this.behavior = behavior;
        if(behavior) {
            this.updateTaskScheduler.addTask(behavior.perform.bind(behavior, this), behavior.constructor.name, frequency);
        }
    }

    onCollision(otherEntity, collisionResult) {
        console.log(`Entity ${this.id} collided by ${otherEntity.id}`);
    }

    destroy() {
        if(this.entityManager) {
            this.entityManager.removeEntity(this);
        }

        if(this.parent) {
            this.parent.removeChild(this);
        }

        this.children.forEach(child => {
            child.destroy();
        });

        if(this.eventBus) {
            this.eventBus.emit('entityDestroyed', this);
        }
    }

    setInput(ad, ws) {
        this.getComponent('engineController').setInput(ad, ws);
    }

    attack() {
        this.hasComponent('attack', (component) => {
            component.attack()
        }, () => {
            console.log('No attack component found.')
        });
    }

    logState() {
        console.log(`Entity ${this.id} state:`);
        console.log(`Position: ${this.pos}`);
        console.log(`Velocity: ${this.velocity}`);
        console.log(`Acceleration: ${this.acceleration}`);
        console.log(`Mass: ${this.mass}`);
        console.log(`Moment of Inertia: ${this.momentOfInertia}`);
        console.log(`Angular Velocity: ${this.angularVelocity}`);
        console.log(`Angular Acceleration: ${this.angularAcceleration}`);
        console.log(`Orientation: ${this.orientation}`);
        console.log(`Acceleration Modifier: ${this.accelerationModifier}`);
        console.log(`Inertia Modifier: ${this.inertiaModifier}`);
        console.log(`Drag Coefficient: ${this.dragCoefficient}`);
        console.log(`Rotational Drag Coefficient: ${this.rotationalDragCoefficient}`);
        console.log(`Components: `, this.components);
    }

    logThis() {
        console.log(this);
    }
}
