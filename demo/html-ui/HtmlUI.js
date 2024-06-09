import TaskScheduler from "../../engine/src/services/TaskScheduler.js";

export default class HtmlUI {
    constructor(engine, currentEntity) {
        this.engine = engine;
        this.currentEntity = currentEntity;
        this.eventBus = engine.eventBus();
        this.components = {};
        this.taskScheduler = new TaskScheduler();
        this.regions = {
            topLeft: document.querySelector('.region-top-left'),
            topCenter: document.querySelector('.region-top-center'),
            bottomLeft: document.querySelector('.region-bottom-left'),
            bottomCenter: document.querySelector('.region-bottom-center'),
            right: document.querySelector('.region-right')
        };
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

    addComponent(componentType, component, updateFrequency = 1, renderFrequency = 1, region = 'right') {
        if(this.components[componentType]) {
            console.warn(`Component ${componentType} already exists on entity ${this.id}`);
            return;
        }

        this.components[componentType] = component;
        component.onAdd(this);

        if(this.regions[region]) {
            this.regions[region].appendChild(component.element);
        } else {
            console.warn(`Region ${region} does not exist`);
            return;
        }

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
            if(component.element.parentNode) {
                component.element.parentNode.removeChild(component.element);
            }
            delete this.components[componentType];
        }
    }

    update(deltaTime) {
        this.taskScheduler.runTasks(deltaTime);
    }
}
