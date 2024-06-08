export default class CollisionSystem {
    static update(entity) {
        entity.hasComponent('collisionData', (component) => {
            component.updateCollisionData();
        });
    }

    static check(entity, entities) {
        entity.hasComponent('collision', (component) => {
            const collisionResult = component.check(entities);
            if(collisionResult) {
                component.handleCollision(entity, collisionResult.otherEntity, collisionResult);
            }
        });
    }
}
