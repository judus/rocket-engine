import RenderComponent from "../../engine/src/components/RenderComponent.js";
import DrawingService from "../../engine/src/services/DrawingService.js";

export default class EntityVerticesComponent extends RenderComponent {
    constructor(drawBoundingBoxes = false) {
        super((deltaTime, context, camera) => {
            if(this.entity.transformedPolygon && this.entity.transformedPolygon.length > 0) {
                DrawingService.drawPolygon(context, this.entity.transformedPolygon, camera);
            }
        }, drawBoundingBoxes);
    }
}
