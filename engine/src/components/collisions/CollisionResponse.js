export default class CollisionResponse {
    handleCollision(entity, otherEntity, collisionResult) {
        throw new Error('handleCollision method must be implemented in subclasses');
    }
}
