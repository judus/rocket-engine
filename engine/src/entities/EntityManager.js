export default class EntityManager {
    constructor(dataStoreManager) {
        this.dataStoreManager = dataStoreManager;
        this.entities = new Map();
        this.typeToStoreMap = new Map(); // Maps entity types to their respective stores
    }

    addEntity(entity, type = null) {
        if(entity.parent) {
            console.warn(`Entity ${entity.id} has a parent and will not be added to the store.`);
            return;
        }

        this.entities.set(entity.id, entity);

        // Determine the appropriate datastore for the entity
        const storeName = this.getStoreNameForType(type, entity);
        const store = this.dataStoreManager.getStore(storeName);

        if(!store) {
            throw new Error(`Data store for type ${type} not found`);
        }
        store.set(entity.id, entity);
        this.typeToStoreMap.set(type, storeName);
    }

    removeEntity(entity, type = null) {
        this.entities.delete(entity.id);

        // Determine the appropriate datastore for the entity
        const storeName = this.getStoreNameForType(type, entity);
        const store = this.dataStoreManager.getStore(storeName);

        if(!store) {
            throw new Error(`Data store for type ${entity.type} not found`);
        }
        console.log(`Removing entity ${entity.id} from store ${storeName}`);
        store.delete(entity.id);
    }

    getEntity(id) {
        return this.entities.get(id);
    }

    getEntitiesByType(entity, type) {
        const storeName = this.getStoreNameForType(type, entity);
        const store = this.dataStoreManager.getStore(storeName);

        if(!store) {
            throw new Error(`Data store for type ${type} not found`);
        }

        const entities = [];
        store.forEach((value, key) => {
            entities.push(value);
        });

        return entities;
    }

    queryEntitiesInArea(area) {
        const results = new Set();

        // Query all spatial stores
        for(const [type, storeName] of this.typeToStoreMap.entries()) {
            const store = this.dataStoreManager.getStore(storeName);
            if(store && typeof store.query === 'function') {
                const entities = store.query(area);
                entities.forEach(entity => results.add(entity));
            }
        }

        return Array.from(results);
    }

    getEntitiesByProperty(property, value) {
        const results = [];
        for(let entity of this.entities.values()) {
            if(entity.getProperty(property) === value) {
                results.push(entity);
            }
        }
        return results;
    }

    getStoreNameForType(type, entity) {
        // Logic to determine the store name based on the entity type or other criteria
        return type ? type : entity.storeName;
    }

    updateEntity(entity, type = null) {
        if(entity.parent) {
            //console.warn(`Entity ${entity.id} has a parent and will not be updated in the store.`);
            return;
        }

        // Update the entity in the appropriate datastore
        const storeName = this.getStoreNameForType(type, entity);
        const store = this.dataStoreManager.getStore(storeName);

        if(!store) {
            throw new Error(`Data store for type ${entity.type} not found`);
        }
        store.updateEntity(entity);
    }
}
