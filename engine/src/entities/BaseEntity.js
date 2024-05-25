import Vector2D from "../utils/maths/Vector2D.js";

function generateUUID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}
export default class BaseEntity {
    constructor(id, type) {
        this.id = id || generateUUID();
        this.type = type || this.constructor.name
        this.components = {};
        this.pos = this.getComponent('position') ? this.getComponent('position') : new Vector2D(0,0);
    }

    addComponent(componentType, component) {
        this.components[componentType] = component;
        component.entity = this; // Allows components to access their parent entity.
        if(component.onAdd) {
            component.onAdd();
        }
    }

    getComponent(name) {
        return this.components[name];
    }

    removeComponent(name) {
        const component = this.components[name];
        if(component) {
            if(typeof component.onRemove === 'function') {
                component.onRemove();
            }
            delete this.components[name];
        } else {
            console.warn(`Component '${name}' does not exist and cannot be removed.`);
        }
    }

    hasComponent(name) {
        return this.components.hasOwnProperty(name);
    }

}