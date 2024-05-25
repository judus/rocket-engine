export default class Entity {
    constructor() {
        this.components = {};
    }

    addComponent(name, component) {
        this.components[name] = component;
    }

    getComponent(name) {
        return this.components[name];
    }

    removeComponent(name) {
        if(!this.components[name]) {
            console.warn(`Component '${name}' does not exist and cannot be removed.`);
            return;
        }
        delete this.components[name];
    }

    hasComponent(name) {
        return this.components.hasOwnProperty(name);
    }

}