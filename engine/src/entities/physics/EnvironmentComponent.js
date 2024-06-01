import BaseComponent from "../../abstracts/BaseComponent.js";
import CustomPhysics2D from "../../physics/CustomPhysics2D.js";

export default class EnvironmentComponent extends BaseComponent {
    constructor() {
        super();
    }

    applyDrag(entity) {
        if(entity.dragCoefficient) {
            const dragCoefficient = entity.dragCoefficient * (entity.dragCoefficientModifier || 1);
            console.log('dragCoefficient', dragCoefficient); // = 1
            const dragForce = entity.velocity.multiply(-dragCoefficient);
            CustomPhysics2D.applyForce(entity, dragForce);
        }
    }

    update(deltaTime) {
        if(this.entity) {
            this.applyDrag(this.entity);
        }
    }
}
