import RenderComponent from "../../engine/src/components/RenderComponent.js";

export default class RedDotComponent extends RenderComponent {
    constructor(drawBoundingBoxes = false) {
        super((deltaTime, context, entity, camera) => {
            const position = entity.getComponent('position');
            if(position) {
                context.fillStyle = 'red';
                context.beginPath();
                context.arc(position.x - camera.pos.x, position.y - camera.pos.y, 5, 0, 2 * Math.PI);
                context.fill();
            }
        }, drawBoundingBoxes);
        this.size = 5; // Size of the dot
    }
}
