import RenderComponent from "../../engine/src/components/RenderComponent.js";
import Drawing from "../../engine/src/services/Drawing.js";

export default class EntityVerticesComponent extends RenderComponent {
    constructor(drawBoundingBoxes = false) {
        super((deltaTime, context, entity, camera) => {
            Drawing.draw(context, entity, camera, entity.color);
        }, drawBoundingBoxes);
    }
}
