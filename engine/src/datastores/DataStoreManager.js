export default class DataStoreManager {
    constructor(defaultDataStore) {
        this.stores = {};
        this.defaultDataStore = defaultDataStore || null;
    }

    /**
     * Creates or registers a new data store.
     * @param {string} name - The name of the data store.
     * @param {Object} [dataStore] - The data store instance (optional).
     */
    create(name, dataStore = null) {
        const store = dataStore || this.defaultDataStore;
        if(!store) {
            throw new Error("No data store provided and no default data store set.");
        }
        this.stores[name] = store;

        return this;
    }

    /**
     * Retrieves a data store by name.
     * @param {string} name - The name of the data store.
     * @returns {Object|null} The data store instance, or null if not found.
     */
    getStore(name) {
        return this.stores[name] || null;
    }
}
