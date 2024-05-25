function generateUUID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

export default class BaseDataStore {
    /**
     * BaseDataStore constructor.
     * @param {Object} eventBus - The event bus for emitting events.
     */
    constructor(eventBus) {
        this.data = new Map();
        this.eventBus = eventBus;
        this.isRegistering = false; // Flag to track registration
    }

    /**
     * Registers a new data item.
     * @param {string} key - The key for the data item.
     * @param {any} initialValue - The initial value of the data item.
     */
    register(key, initialValue) {
        this.isRegistering = true; // Set flag to true
        this.data.set(key, initialValue);
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get: () => this.get(key),
            set: (value) => this.set(key, value)
        });
        this.isRegistering = false; // Reset flag
    }

    /**
     * Retrieves a data item by key.
     * @param {string} key - The key of the data item.
     * @returns {any} The value of the data item.
     */
    get(key) {
        return this.data.get(key);
    }

    /**
     * Sets a data item by key.
     * @param {string} key - The key of the data item.
     * @param {any} value - The new value of the data item.
     */
    set(key, value) {
        if(this.data.has(key)) {
            this.data.set(key, value);
            this.eventBus.emit(key, value);
        } else if(!this.isRegistering) {
            this.register(key, value); // Call register if the key does not exist and not already registering
        }
    }

    /**
     * Adds an entity to the data store with a generated ID if not provided.
     * @param {Object} entity - The entity instance.
     * @param {string} [id] - The ID of the entity (optional).
     */
    addEntity(entity, id = generateUUID()) {
        this.set(id, entity); // Use overridden set method
    }

    /**
     * Deletes a data item by key.
     * @param {string} key - The key of the data item to delete.
     */
    delete(key) {
        if(this.data.has(key)) {
            this.data.delete(key);
            delete this[key]; // Remove the property from the instance
            this.eventBus.emit(key, undefined); // Emit an event with undefined value
        } else {
            console.warn(`Key '${key}' not found.`);
        }
    }

    /**
     * Iterates over all data items.
     * @param {Function} callback - The callback to execute for each data item.
     */
    forEach(callback) {
        this.data.forEach((value, key) => {
            callback(value, key);
        });
    }

    /**
     * Retrieves all data items as an array.
     * @returns {Array<any>} An array of all data items.
     */
    getAllToArray() {
        return Array.from(this.data.values());
    }
}

