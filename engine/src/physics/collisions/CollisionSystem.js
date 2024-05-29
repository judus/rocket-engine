export default class CollisionSystem {
    static check(entity, entities) {
        const collisionComponent = entity.getComponent('collision');
        if(collisionComponent) {
            const collisionResult = collisionComponent.check(entities);
            if(collisionResult) {
                collisionComponent.handleCollision(entity, collisionResult.otherEntity, collisionResult);
            }
        }
    }
}
