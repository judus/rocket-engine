import EntityDefinitions from "./EntityDefinitions.js";
import EntityClasses from "./EntityClasses.js";
import Vector3D from "../../engine/src/utils/maths/Vector3D.js";

export default class EntityFactory {
    constructor(engine) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStoreManager = this.engine.dataStoreManager();
    }

    createFaction(definition) {
        const faction = new definition.entityClass(definition.id, definition.name, definition.color, definition.emblemVertices);
        this.dataStoreManager.getStore('global').set(faction.id, faction);
        return faction;
    }

    createEntity(type, name, x = 0, y = 0, id = null) {
        const definition = EntityDefinitions.get(type, name);
        const entityClass = EntityClasses.getClass(definition.entityClass);
        const entity = new entityClass(this.engine, definition, x, y, id);

        entity.hasComponent('collisionData', (component) => {
            component.initialize(true);
        });

        return entity;
    }

    createProjectile(name, initialPosition, orientation, speedMultiplier, ownerId, parentEntity, muzzle) {
        const definition = EntityDefinitions.get('projectiles', name);
        const entityClass = EntityClasses.getClass(definition.entityClass);
        const projectileVelocity = new Vector3D(Math.cos(orientation), Math.sin(orientation)).multiply(definition.speed * speedMultiplier).add(parentEntity.velocity.clone());
        const config = {
            ...definition,
            pos: initialPosition,
            velocity: projectileVelocity,
            orientation: orientation,
            parentEntity: parentEntity,
            muzzle: muzzle
        };
        const projectile = new entityClass(this.engine, config);
        projectile.ownerId = ownerId;
        projectile.rotation = orientation;
        return projectile;
    }


}

