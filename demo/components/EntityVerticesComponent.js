import RenderComponent from "../../engine/src/components/RenderComponent.js";
import Drawing from "../../engine/src/services/Drawing.js";
import Entity from "../entities/Entity.js";
import EntityTransform from "../../engine/src/services/EntityTransform.js";

export default class EntityVerticesComponent extends RenderComponent {
    constructor(drawBoundingBoxes = false) {
        super((deltaTime, context, camera) => {
            Drawing.draw(context, this.entity, camera, this.entity.color);
        }, drawBoundingBoxes);
    }


}
