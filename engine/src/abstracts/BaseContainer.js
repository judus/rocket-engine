/**
 * BaseContainer is a generic container for storing and managing instances and factory functions.
 * It provides methods to add, get, create, remove, and initialize instances.
 */
export default class BaseContainer {
    /**
     * Creates an instance of BaseContainer.
     */
    constructor() {
        this.items = {};
        this.factories = {};
    }

    /**
     * Adds an item or a factory to the container.
     * @param {string} name - The name to identify the item or factory.
     * @param {Object|Function} item - The instance or constructor function to be added.
     */
    add(name, item) {
        if(typeof item === 'function') {
            this.factories[name] = item;
            return null;
        } else {
            return this.items[name] = item;
        }
    }

    /**
     * Gets an item from the container by name.
     * @param {string} name - The name of the item to retrieve.
     * @returns {Object|null} - The retrieved instance or null if not found.
     */
    get(name) {
        return this.items[name] || null;
    }

    /**
     * Creates a new instance using a registered factory.
     * @param {string} name - The name of the factory.
     * @param {...any} params - Parameters to pass to the factory constructor.
     * @returns {Object|null} - The created instance or null if factory not found.
     */
    create(name, ...params) {
        if(this.factories[name]) {
            return new this.factories[name](...params);
        } else {
            console.warn(`Factory for '${name}' not found.`);
            return null;
        }
    }

    /**
     * Removes an item or a factory from the container.
     * @param {string} name - The name of the item or factory to remove.
     */
    remove(name) {
        if(this.items[name]) {
            delete this.items[name];
        } else if(this.factories[name]) {
            delete this.factories[name];
        }
    }

    /**
     * Checks if the container has an item or factory with the given name.
     * @param {string} name - The name to check.
     * @returns {boolean} - True if the item or factory exists, false otherwise.
     */
    has(name) {
        return this.items.hasOwnProperty(name) || this.factories.hasOwnProperty(name);
    }

    /**
     * Initializes all items in the container that have an init method.
     * @param {Object} engineApi - The engine API instance to pass to the init methods.
     */
    initAll(engineApi) {
        Object.values(this.items).forEach(item => {
            if(typeof item.init === 'function') {
                item.init(engineApi);
            }
        });
    }
}
