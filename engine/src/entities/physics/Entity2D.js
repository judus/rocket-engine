import EntityTransform from "../../services/EntityTransform.js";
import EntityManager from "../EntityManager.js";
import EngineParts from "../../EngineParts.js";
import StringHelpers from "../../utils/StringHelpers.js";
import Spatial2D from "../../utils/spatial/Spatial2D.js";
import CustomPhysics2D from "../../physics/CustomPhysics2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";

export default class Entity2D {
    constructor(engine, config, id = null) {
        this.engine = engine;
        this.id = id || config.id || StringHelpers.generateUUID();
        this.type = config.type || this.constructor.name;

        // Geometry
        this.width = config.width || 0;
        this.height = config.height || 0;
        this.scale = config.scale || 1;

        // Physics
        this.mass = config.mass || 1;
        this.pos = config.position || new Vector3D();
        this.velocity = config.velocity || new Vector3D();
        this.acceleration = config.acceleration || new Vector3D();
        this.momentOfInertia = config.momentOfInertia || 1;
        this.angularVelocity = config.angularVelocity || 0;
        this.angularAcceleration = config.angularAcceleration || 0;
        this.orientation = config.orientation || 0;
        this.accelerationModifier = config.accelerationModifier || 1;
        this.inertiaModifier = config.inertiaModifier || 1;
        this.dragCoefficient = config.dragCoefficient || 0.1;


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
            // this.taskScheduler.addTask(component.render.bind(component), component.constructor.name, renderFrequency);
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
        CustomPhysics2D.update(this, deltaTime);
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
        if(this.entityManager) {
            this.entityManager.deleteSpatial(this.pos.x, this.pos.y, this);
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
    }
}
