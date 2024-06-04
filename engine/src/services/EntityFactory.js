export default class EntityFactory {
    constructor(engine) {
        this.engine = engine;
    }

    createEntity(config) {
        const EntityClass = config.entityClass;
        if(EntityClass) {
            return new EntityClass(this.engine, config);
        } else {
            throw new Error('Entity class not specified in the configuration.');
        }
    }

    destroyEntity(entity) {
        entity.destroy();
    }
}
