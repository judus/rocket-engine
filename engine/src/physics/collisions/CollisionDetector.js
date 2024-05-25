import {isCollidingSAT} from './collisionUtils.js';

export default class CollisionDetector {
    static checkCollision(entityA, entityB) {
        const collisionComponentA = entityA.getComponent('collision');
        const collisionComponentB = entityB.getComponent('collision');

        if(!collisionComponentA || !collisionComponentB) {
            return {collided: false};
        }

        if(collisionComponentA.type === 'box' && collisionComponentB.type === 'box') {
            return this.checkBoxCollision(entityA, entityB);
        } else if(collisionComponentA.type === 'polygon' && collisionComponentB.type === 'polygon') {
            return this.checkPolygonCollision(entityA, entityB);
        } else if(collisionComponentA.type === 'box' && collisionComponentB.type === 'polygon') {
            return this.checkBoxPolygonCollision(entityA, entityB);
        } else if(collisionComponentA.type === 'polygon' && collisionComponentB.type === 'box') {
            return this.checkPolygonBoxCollision(entityA, entityB);
        }

        return {collided: false};
    }

    static checkBoxCollision(entityA, entityB) {
        const boundingBoxA = entityA.getComponent('boundingBox');
        const boundingBoxB = entityB.getComponent('boundingBox');
        const transformComponentA = entityA.getComponent('transform');
        const transformComponentB = entityB.getComponent('transform');

        if(boundingBoxA && boundingBoxB && transformComponentA && transformComponentB) {
            const boundsA = boundingBoxA.getBounds(entityA.pos, entityA.rotation);
            const boundsB = boundingBoxB.getBounds(entityB.pos, entityB.rotation);

            if(!boundsA || !boundsB) {
                console.error(`Bounding box not found for entities ${entityA.id} or ${entityB.id}`);
                return {collided: false};
            }

            for(const boxA of boundsA) {
                for(const boxB of boundsB) {
                    if(
                        boxA.left < boxB.right &&
                        boxA.right > boxB.left &&
                        boxA.top < boxB.bottom &&
                        boxA.bottom > boxB.top
                    ) {
                        return {collided: true, boxA: boxA.id, boxB: boxB.id};
                    }
                }
            }
        }
        return {collided: false};
    }

    static checkPolygonCollision(entityA, entityB) {
        const transformComponentA = entityA.getComponent('transform');
        const transformComponentB = entityB.getComponent('transform');

        if(transformComponentA && transformComponentB) {
            const verticesA = transformComponentA.applyTransform(entityA.definition.vertices);
            const verticesB = transformComponentB.applyTransform(entityB.definition.vertices);

            return {collided: isCollidingSAT(verticesA, verticesB)};
        }
        return {collided: false};
    }

    static checkBoxPolygonCollision(entityA, entityB) {
        const polygonEntity = entityA.getComponent('collision').type === 'polygon' ? entityA : entityB;
        const boxEntity = entityA.getComponent('collision').type === 'box' ? entityA : entityB;

        const polygonTransform = polygonEntity.getComponent('transform');
        const boxTransform = boxEntity.getComponent('transform');
        const boundingBox = boxEntity.getComponent('boundingBox');

        if(polygonTransform && boxTransform && boundingBox) {
            const verticesA = polygonTransform.applyTransform(polygonEntity.definition.vertices);
            const boxBounds = boundingBox.getBounds(boxEntity.pos, boxEntity.rotation);

            for(const box of boxBounds) {
                const verticesB = [
                    {x: box.left, y: box.top},
                    {x: box.right, y: box.top},
                    {x: box.right, y: box.bottom},
                    {x: box.left, y: box.bottom}
                ];

                if(isCollidingSAT(verticesA, verticesB)) {
                    return {collided: true};
                }
            }
        }
        return {collided: false};
    }

    static checkPolygonBoxCollision(entityA, entityB) {
        return this.checkBoxPolygonCollision(entityA, entityB);
    }
}
