export default class CustomPhysics2D {
    static applyForce(entity, force) {
        const effectiveMass = entity.mass * entity.inertiaModifier;
        const acceleration = force.divide(effectiveMass).multiply(entity.accelerationModifier);
        entity.acceleration = entity.acceleration.add(acceleration);
    }

    static applyTorque(entity, torque) {
        const effectiveMomentOfInertia = entity.momentOfInertia * entity.inertiaModifier;
        const angularAcceleration = torque / effectiveMomentOfInertia * entity.accelerationModifier;
        entity.angularAcceleration += angularAcceleration;
    }

    static update(entity, dt) {
        entity.velocity = entity.velocity.add(entity.acceleration.multiply(dt));
        entity.pos = entity.pos.add(entity.velocity.multiply(dt));

        entity.angularVelocity += entity.angularAcceleration * dt;
        entity.orientation += entity.angularVelocity * dt;
        entity.angularAcceleration = 0; // Reset angular acceleration after applying it

        // Normalize orientation to keep it within 0 to 2π
        entity.orientation = entity.orientation % (2 * Math.PI);
    }

    static applyGravity(entity1, entity2, G = 6.67430e-11) {
        let r = entity2.pos.subtract(entity1.pos);
        let distance = r.magnitude();
        let forceMagnitude = (G * entity1.mass * entity2.mass) / (distance ** 2);
        let force = r.normalize().multiply(forceMagnitude);
        CustomPhysics2D.applyForce(entity1, force);
        CustomPhysics2D.applyForce(entity2, force.multiply(-1));
    }
}
