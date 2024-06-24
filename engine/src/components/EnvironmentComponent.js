import BaseComponent from "./BaseComponent.js";
import CustomPhysics2D from "../physics/CustomPhysics2D.js";
import Vector3D from "../utils/maths/Vector3D.js";

export default class EnvironmentComponent extends BaseComponent {

    applyDrag(entity, deltaTime) {
        if(entity.dragCoefficient) {
            const dragCoefficient = entity.dragCoefficient * (entity.dragCoefficientModifier || 1);
            const dragForce = entity.velocity.multiply(-dragCoefficient * deltaTime);
            CustomPhysics2D.applyForce(entity, dragForce);
        }
    }

    applyDragStop(entity, deltaTime) {
        if(entity.dragCoefficient) {
            const dragCoefficient = entity.dragCoefficient * (entity.dragCoefficientModifier || 1);
            const speed = entity.velocity.magnitude();
            if(speed < 0.01) { // Minimum speed threshold to stop the ship
                entity.velocity = new Vector3D(0, 0, 0);
                return;
            }
            // Exponential drag: stronger drag at lower speeds
            const dragForce = entity.velocity.normalize().multiply(-dragCoefficient * Math.exp(-speed) * deltaTime);
            CustomPhysics2D.applyForce(entity, dragForce);
        }
    }

    applyStaticFriction(entity) {
        const speed = entity.velocity.magnitude();
        if(speed < 0.1) { // Threshold for applying static friction
            const staticFrictionCoefficient = entity.staticFrictionCoefficient || 10;
            const frictionForce = entity.velocity.multiply(-staticFrictionCoefficient);
            CustomPhysics2D.applyForce(entity, frictionForce);
        }
    }

    applyRotationalDrag(entity, deltaTime) {
        if(entity.rotationalDragCoefficient) {
            const rotationalDragCoefficient = entity.rotationalDragCoefficient;
            const angularVelocityBefore = entity.angularVelocity;

            // Applying rotational drag
            entity.angularVelocity *= Math.pow(1 - rotationalDragCoefficient, deltaTime);
        }
    }

    update(deltaTime) {
        if(this.entity) {
            this.applyDrag(this.entity, deltaTime);
            this.applyRotationalDrag(this.entity, deltaTime);
            this.applyStaticFriction(this.entity); // Ensure this is applied last
        }
    }
}
