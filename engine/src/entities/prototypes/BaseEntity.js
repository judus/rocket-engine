import StringHelpers from "../../utils/StringHelpers";
import Spatial2D from "../../utils/spatial/Spatial2D";
import EntityTransform from "../../services/EntityTransform";
import EngineParts from "../../EngineParts";

export class BaseEntity {
    constructor({id, type, ...config} = {}) {
        this.id = id || StringHelpers.generateUUID();
        this.type = type || this.constructor.name;
        this.config = config; // Store config for mixins to use if needed
    }

    update(deltaTime) {
        // Default update method, can be overridden by subclasses or mixins
    }

    render(context) {
        // Default render method, can be overridden by subclasses or mixins
    }
}

export const GeometryMixin = (Base) => class extends Base {
    constructor(config) {
        super(config);
        const {pos = {x: 0, y: 0}, width = 0, height = 0, scale = 1, rotation = 0} = config;
        this.pos = Spatial2D(pos.x, pos.y);
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.rotation = rotation;
    }

    createBoundingBox() {
        return {
            x: this.pos.x,
            y: this.pos.y,
            width: this.width,
            height: this.height
        };
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
};

export const MoveableMixin = (Base) => class extends Base {
    constructor(config) {
        super(config);
        const {vel = {x: 0, y: 0}, acc = {x: 0, y: 0}, drag = 0.99, rotationSpeed = Math.PI * 5} = config;
        this.vel = vel;
        this.acc = acc;
        this.drag = drag;
        this.rotationSpeed = rotationSpeed;
    }
};

export const SchedulableMixin = (Base) => class extends Base {
    constructor(config) {
        super(config);
        this.taskScheduler = new TaskScheduler()
    }

    scheduleTask(task, frequency = 1, priority = 0) {
        this.taskScheduler.addTask(task, frequency, priority);
    }

    runScheduledTasks(deltaTime) {
        this.taskScheduler.runTasks(deltaTime);
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.runScheduledTasks(deltaTime);
    }
};

export const ComposableMixin = (Base) => class extends Base {
    constructor(config) {
        super(config);
        this.components = {};
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
            this.scheduleTask(component.update.bind(component), updateFrequency);
        }
        if(component.render) {
            this.scheduleTask(component.render.bind(component), renderFrequency);
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

    render(context) {
        super.render(context);
        Object.values(this.components).forEach(component => {
            if(component.render) {
                const globalPos = this.getGlobalPosition();
                component.render(context, globalPos.x, globalPos.y);
            }
        });
    }
};

export const BehaviorMixin = (Base) => class extends Base {
    constructor(config) {
        super(config);
        this.behavior = config.behavior || null;
    }

    setBehavior(behavior, frequency = 1) {
        if(this.behavior) {
            this.taskScheduler.removeTask(this.behavior.perform.bind(this.behavior, this));
        }
        this.behavior = behavior;
        if(behavior) {
            this.scheduleTask(behavior.perform.bind(behavior, this), frequency);
        }
    }
};

export const SpriteSheetMixin = (Base) => class extends Base {
    constructor(config) {
        super(config);
        this.spriteSheet = config.spriteSheet || null;
    }
};

export const HierarchyMixin = (Base) => class extends Base {
    constructor(config) {
        super(config);
        this.children = [];
        this.parent = null;
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

    update(deltaTime) {
        super.update(deltaTime);
        this.children.forEach(child => child.update(deltaTime));
    }

    render(context) {
        super.render(context);
        this.children.forEach(child => child.render(context));
    }
};

export const StorableMixin = (Base) => class extends Base {
    constructor(config) {
        super(config);
        const {engine} = config;
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
        this.emitEvent('entityDestroyed', this);
    }
};

export const GeometricEntity = GeometryMixin(BaseEntity);
export const MovableEntity = SchedulableMixin(MoveableMixin(GeometryMixin(BaseEntity)));
export const ComplexEntity = (HierarchyMixin(BehaviorMixin(SpriteSheetMixin(ComposableMixin(SchedulableMixin(MoveableMixin(GeometryMixin(StorableMixin(BaseEntity)))))))));

