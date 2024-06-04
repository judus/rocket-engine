import Vector3D from "../utils/maths/Vector3D.js";

export default class EntityTransform {
    static updateVertices(entity, vertices) {
        return vertices.map(vertex => {
            const scaledX = vertex.x * entity.scale;
            const scaledY = vertex.y * entity.scale;
            const rotatedX = scaledX * Math.cos(entity.rotation) - scaledY * Math.sin(entity.rotation);
            const rotatedY = scaledX * Math.sin(entity.rotation) + scaledY * Math.cos(entity.rotation);
            return {x: rotatedX + entity.pos.x, y: rotatedY + entity.pos.y};
        });
    }

    static updateBoundingBox(entity) {
        const {x, y, width, height} = entity.boundingBox;
        const vertices = [{x, y}, {x: x + width, y}, {x, y: y + height}, {x: x + width, y: y + height}];
        return this.updateVertices(entity, vertices);
    }

    static getGlobalPosition(entity) {
        let globalPos = new Vector3D(entity.pos.x, entity.pos.y, entity.pos.z);
        let currentParent = entity.parent;

        while(currentParent) {
            const scaledX = globalPos.x * currentParent.scale;
            const scaledY = globalPos.y * currentParent.scale;
            const rotatedX = scaledX * Math.cos(currentParent.rotation) - scaledY * Math.sin(currentParent.rotation);
            const rotatedY = scaledX * Math.sin(currentParent.rotation) + scaledY * Math.cos(currentParent.rotation);

            globalPos.x = rotatedX + currentParent.pos.x;
            globalPos.y = rotatedY + currentParent.pos.y;
            globalPos.z = globalPos.z + currentParent.pos.z; // Ensure Z position is also handled
            currentParent = currentParent.parent;
        }

        return globalPos;
    }

    static getGlobalScale(entity) {
        let globalScale = entity.scale;
        let currentParent = entity.parent;

        while(currentParent) {
            globalScale *= currentParent.scale;
            currentParent = currentParent.parent;
        }

        return globalScale;
    }

    static getGlobalRotation(entity) {
        let globalRotation = entity.rotation;
        let currentParent = entity.parent;

        while(currentParent) {
            globalRotation += currentParent.rotation;
            currentParent = currentParent.parent;
        }

        return globalRotation;
    }

    static faceVelocity(entity) {
        if(entity.vel && (entity.vel.x !== 0 || entity.vel.y !== 0)) {
            //entity.rotation = Math.atan2(entity.vel.y, entity.vel.x);
        }
    }

    static faceTarget(entity, target) {
        const dx = target.pos.x - entity.pos.x;
        const dy = target.pos.y - entity.pos.y;
        entity.rotation = Math.atan2(dy, dx);
    }

    static faceMouse(entity, mousePosition, camera) {
        const worldMouseX = (mousePosition.x / camera.zoomLevel) + camera.pos.x;
        const worldMouseY = (mousePosition.y / camera.zoomLevel) + camera.pos.y;
        const dx = worldMouseX - entity.pos.x;
        const dy = worldMouseY - entity.pos.y;
        entity.rotation = Math.atan2(dy, dx);
    }
}
