import Vector2D from "../utils/maths/Vector2D.js";
import EngineBase from "../abstracts/EngineBase.js";

function generateUUID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}
export default class BaseEntity extends EngineBase {
    constructor(id, type) {
        super();
        this.id = id || generateUUID();
        this.type = type || this.constructor.name
        this.components = {};

        this.pos = this.getComponent('position') ?
            new Vector2D(this.getComponent('position').x, this.getComponent('position').y) :
            new Vector2D(0,0);
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