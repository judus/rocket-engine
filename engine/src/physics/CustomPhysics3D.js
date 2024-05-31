import Quaternion from "../utils/maths/Quaternion.js";
import Vector3D from "../utils/maths/Vector3D.js";

export default class CustomPhysics3D {
    static applyForce(entity, force) {
        const effectiveMass = entity.mass * entity.inertiaModifier;
        const acceleration = force.divide(effectiveMass).multiply(entity.accelerationModifier);
        entity.acceleration = entity.acceleration.add(acceleration);
    }

    static applyTorque(entity, torque) {
        const effectiveMomentOfInertia = entity.momentOfInertia * entity.inertiaModifier;
        const angularAcceleration = torque.divide(effectiveMomentOfInertia).multiply(entity.accelerationModifier);
        entity.angularAcceleration = entity.angularAcceleration.add(angularAcceleration);
    }

    static update(entity, dt) {
        entity.velocity = entity.velocity.add(entity.acceleration.multiply(dt));
        entity.position = entity.position.add(entity.velocity.multiply(dt));

        entity.angularVelocity = entity.angularVelocity.add(entity.angularAcceleration.multiply(dt));
        entity.angularAcceleration = new Vector3D();

        const qAngularVelocity = new Quaternion(0, entity.angularVelocity.x, entity.angularVelocity.y, entity.angularVelocity.z);
        const qRotation = qAngularVelocity.multiply(entity.orientation).multiply(0.5 * dt);
        entity.orientation = entity.orientation.add(qRotation);
        entity.orientation.normalize();
    }

    static applyGravity(entity1, entity2, G = 6.67430e-11) {
        let r = entity2.position.subtract(entity1.position);
        let distance = r.magnitude();
        let forceMagnitude = (G * entity1.mass * entity2.mass) / (distance ** 2);
        let force = r.normalize().multiply(forceMagnitude);
        CustomPhysics3D.applyForce(entity1, force);
        CustomPhysics3D.applyForce(entity2, force.multiply(-1));
    }
}
