export default class PolygonCollisionSystem {
    update(entities) {
        for(const entity of entities) {
            const collisionComponent = entity.getComponent('collision');
            if(collisionComponent && collisionComponent.type === 'polygon') {
                collisionComponent.collidingEntities = [];
            }
        }

        for(let i = 0; i < entities.length; i++) {
            const entityA = entities[i];
            const collisionA = entityA.getComponent('collision');

            if(!collisionA || collisionA.type !== 'polygon') continue;

            for(let j = i + 1; j < entities.length; j++) {
                const entityB = entities[j];
                const collisionB = entityB.getComponent('collision');

                if(!collisionB || collisionB.type !== 'polygon') continue;

                if(collisionA.checkCollision(entityB)) {
                    collisionA.collidingEntities.push(entityB);
                    collisionB.collidingEntities.push(entityA);
                }
            }
        }

        for(const entity of entities) {
            const collisionComponent = entity.getComponent('collision');
            if(collisionComponent && collisionComponent.type === 'polygon') {
                collisionComponent.handleCollisions();
            }
        }
    }
}
