import BaseComponent from "../abstracts/BaseComponent.js";
import EntityTransform from "../services/EntityTransform.js";

export default class TransformComponent extends BaseComponent {
    constructor(x = 0, y = 0, rotation = 0, scale = 1) {
        super();
        this.initialPosition = {x, y};
        this.initialRotation = rotation;
        this.initialScale = scale;
    }

    update(deltaTime) {
        super.update(deltaTime);
        EntityTransform.updateVertices(this.entity, this.entity.polygon);
        //EntityTransform.updateBoundingBox(this.entity, this.entity.boundingBox);
    }

    onAdd(entity) {
        super.onAdd(entity);
        this.entity.pos.set(this.initialPosition.x, this.initialPosition.y);
        this.entity.rotation = this.initialRotation;
        this.entity.scale = this.initialScale;
    }

    applyTransform(vertices) {
        console.error('applyTransform is deprecated. Use EntityTransform.updateVertices instead.')
        return vertices.map(vertex => {
            const scaledX = vertex.x * this.entity.scale;
            const scaledY = vertex.y * this.entity.scale;
            const rotatedX = scaledX * Math.cos(this.entity.rotation) - scaledY * Math.sin(this.entity.rotation);
            const rotatedY = scaledX * Math.sin(this.entity.rotation) + scaledY * Math.cos(this.entity.rotation);
            return {
                x: rotatedX + this.entity.pos.x,
                y: rotatedY + this.entity.pos.y
            };
        });
    }

    faceVelocity(velocity) {
        if(velocity.x !== 0 || velocity.y !== 0) {
            this.entity.rotation = Math.atan2(velocity.y, velocity.x);
        }
    }

    faceTarget(target) {
        const dx = target.pos.x - this.entity.pos.x;
        const dy = target.pos.y - this.entity.pos.y;
        this.entity.rotation = Math.atan2(dy, dx);
    }

    faceMouse(mousePosition, camera) {
        const worldMouseX = (mousePosition.x / camera.zoomLevel) + camera.pos.x;
        const worldMouseY = (mousePosition.y / camera.zoomLevel) + camera.pos.y;
        const dx = worldMouseX - this.entity.pos.x;
        const dy = worldMouseY - this.entity.pos.y;
        this.entity.rotation = Math.atan2(dy, dx);
    }
}
