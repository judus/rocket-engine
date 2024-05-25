import RenderComponent from "../../engine/src/components/RenderComponent.js";

export default class GreenDotComponent extends RenderComponent {
    constructor(drawBoundingBoxes = false) {
        super((deltaTime, context, entity, camera) => {
            const position = entity.getComponent('position');
            if(position) {
                context.fillStyle = 'green';
                context.beginPath();
                context.arc(position.x, position.y, 5, 0, 2 * Math.PI);
                context.fill();
            }
        }, drawBoundingBoxes);
        this.size = 5; // Size of the dot
    }
}
