import TaskScheduler from "../services/TaskScheduler.js";
import EntityTransform from "../services/EntityTransform.js";
import EntityManager from "./EntityManager.js";
import EngineParts from "../EngineParts.js";
import StringHelpers from "../utils/StringHelpers.js";
import Spatial2D from "../utils/spatial/Spatial2D.js";
import Vector3D from "../utils/maths/Vector3D.js";

export default class Entity {
    constructor(engine, config, id = null) {
        this.engine = engine;
        this.id = id || config.id || StringHelpers.generateUUID();
        this.type = config.type || this.constructor.name;

        // Geometry (provisional - to be extended or replaced)
        this.pos = config.pos ? new Vector3D(config.pos.x, config.pos.y, 0) : new Vector3D(0, 0, 0);
        this.width = config.width || 0;
        this.height = config.height || 0;
        this.scale = config.scale || 1;
        this.rotation = config.orientation || 0;

        // Physics (provisional - to be extended or replaced)
        this.vel = config.vel || {x: 0, y: 0};
        this.acc = config.acc || {x: 0, y: 0};
        this.drag = config.drag || 0.99;
        this.rotationSpeed = config.rotationSpeed || Math.PI * 5;

        // Functional
        this.taskScheduler = engine.create(EngineParts.TASK_SCHEDULER);
        this.eventBus = engine.service(EngineParts.EVENT_BUS);
        this.components = {};
        this.behavior = config.behavior || null;
        this.spriteSheet = config.spriteSheet || null;

        // Collision
        this.collisionDetection = config.collisionDetection || null;
        this.boundingBox = this.createBoundingBox();
        this.collisionBoxes = config.collisionBoxes || [];
        this.polygon = config.polygon || [];
        this.frames = config.frames || {};

        // Hierarchy
        this.children = [];
        this.parent = null;

        // Storage
        this.entityManager = engine.service(EngineParts.ENTITY_MANAGER);
        this.storeName = config.storeName || EngineParts.ENTITY_STORE_NAME;
        this.spatialHash = null;

        // Register this entity
        this.entityManager.addEntity(this);

        this.pos.onChange = () => {
            if(this.entityManager) {
                this.entityManager.updateEntity(this);
            }
        };
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

    addComponent(componentType, component, updateFrequency = 1, renderFrequency = 1) {
        if(this.components[componentType]) {
            console.warn(`Component ${componentType} already exists on entity ${this.id}`);
            return;
        }

        this.components[componentType] = component;
        component.onAdd(this);

        if(component.update) {
            this.taskScheduler.addTask(component.update.bind(component), component.constructor.name, updateFrequency);
        }
        if(component.render) {
            //this.taskScheduler.addTask(component.render.bind(component), component.constructor.name, renderFrequency);
        }
    }

    removeComponent(componentType) {
        const component = this.components[componentType];
        if(component) {
            component.onRemove();
            this.taskScheduler.removeTask(component.update.bind(component));
            this.taskScheduler.removeTask(component.render.bind(component));
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
    }

    removeChild(child) {
        this.children = this.children.filter(c => c !== child);
        child.parent = null;
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

    setBehavior(behavior, frequency = 1) {
        if(this.behavior) {
            this.taskScheduler.removeTask(this.behavior.perform.bind(this.behavior, this));
        }
        this.behavior = behavior;
        if(behavior) {
            this.taskScheduler.addTask(behavior.perform.bind(behavior, this), behavior.constructor.name, frequency);
        }
    }

    update(deltaTime) {
        this.taskScheduler.runTasks(deltaTime);
        this.children.forEach(child => child.update(deltaTime));
    }

    render(context) {
        Object.values(this.components).forEach(component => {
            if(component.render) {
                const globalPos = this.getGlobalPosition();
                component.render(context, globalPos.x, globalPos.y);
            }
        });
        this.children.forEach(child => child.render(context));
    }

    onCollision(otherEntity, collisionResult) {
        console.log(`Entity ${this.id} collided with ${otherEntity.id}`);
    }

    destroy() {
        // Remove entity from the spatial hash grid
        if(this.entityManager) {
            this.entityManager.deleteSpatial(this.pos.x, this.pos.y, this);
            this.entityManager.removeEntity(this);
        }

        // Notify the parent if there is one
        if(this.parent) {
            this.parent.removeChild(this);
        }

        // Destroy children
        this.children.forEach(child => {
            child.destroy();
        });

        // Emit a destroy event or handle other clean up if needed
        if(this.eventBus) {
            this.eventBus.emit('entityDestroyed', this);
        }
    }
}
