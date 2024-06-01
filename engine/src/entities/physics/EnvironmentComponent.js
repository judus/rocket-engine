import BaseComponent from "../../abstracts/BaseComponent.js";
import CustomPhysics2D from "../../physics/CustomPhysics2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";

export default class EnvironmentComponent extends BaseComponent {
    constructor() {
        super();
    }

    applyDrag(entity) {
        if(entity.dragCoefficient) {
            const dragCoefficient = entity.dragCoefficient * (entity.dragCoefficientModifier || 1);
            const dragForce = entity.velocity.multiply(-dragCoefficient);
            CustomPhysics2D.applyForce(entity, dragForce);
        }
    }


    applyDragStop(entity) {
        if(entity.dragCoefficient) {
            const dragCoefficient = entity.dragCoefficient * (entity.dragCoefficientModifier || 1);
            const speed = entity.velocity.magnitude();
            if(speed < 0.01) { // Minimum speed threshold to stop the ship
                entity.velocity = new Vector3D(0, 0, 0);
                return;
            }
            // Exponential drag: stronger drag at lower speeds
            const dragForce = entity.velocity.normalize().multiply(-dragCoefficient * Math.exp(-speed));
            CustomPhysics2D.applyForce(entity, dragForce);
        }
    }

    applyStaticFriction(entity) {
        const speed = entity.velocity.magnitude();
        if(speed < 0.1) { // Adjust this threshold as needed
            const staticFrictionForce = entity.staticFrictionForce || new Vector3D(1000, 1000, 0);
            CustomPhysics2D.applyForce(entity, staticFrictionForce);
        }
    }

    update(deltaTime) {
        if(this.entity) {
            this.applyDrag(this.entity);
            //this.applyStaticFriction(this.entity);
        }
    }
}
