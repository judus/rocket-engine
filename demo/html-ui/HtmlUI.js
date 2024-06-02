import TaskScheduler from "../../engine/src/services/TaskScheduler.js";

export default class HtmlUI {
    constructor(engine, currentEntity) {
        this.engine = engine;
        this.currentEntity = currentEntity;
        this.eventBus = engine.eventBus();
        this.components = {};
        this.taskScheduler = new TaskScheduler();
        this.container = null;
    }

    getComponent(name) {
        return this.components[name];
    }

    hasComponent(name, onTrue, onFalse) {
        if(this.components[name]) {
            onTrue && onTrue(this.components[name], this);
        } else {
            onFalse && onFalse(name);
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

    update(deltaTime) {
        this.taskScheduler.runTasks(deltaTime);
    }
}
