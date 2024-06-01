import Vector3D from "../utils/maths/Vector3D.js";

export default class CustomPhysics2D {
    static SCALE_FACTOR = 12; // 1 meter = 12 pixels

    static pixelsToMeters(value) {
        return value / CustomPhysics2D.SCALE_FACTOR;
    }

    static metersToPixels(value) {
        return value * CustomPhysics2D.SCALE_FACTOR;
    }

    static vectorPixelsToMeters(vector) {
        return vector.multiply(1 / CustomPhysics2D.SCALE_FACTOR);
    }
    static vectorMetersToPixels(vector) {
        return vector.multiply(CustomPhysics2D.SCALE_FACTOR);
    }

    static applyForce(entity, force) {
        const effectiveMass = entity.mass * entity.inertiaModifier;
        const acceleration = force.divide(effectiveMass).multiply(entity.accelerationModifier);
        entity.acceleration = entity.acceleration.add(acceleration);
    }

    static applyTorque(entity, torque) {
        const effectiveMomentOfInertia = entity.momentOfInertia * entity.inertiaModifier;
        const angularAcceleration = (torque / effectiveMomentOfInertia) * entity.accelerationModifier;
        entity.angularAcceleration += angularAcceleration;
    }

    static update(entity, dt) {
        // Update velocity in meters based on acceleration
        entity.velocity = entity.velocity.add(entity.acceleration.multiply(dt));

        // Convert the current position from pixels to meters
        let oldPosition = CustomPhysics2D.vectorPixelsToMeters(entity.pos);

        // Update position in meters based on velocity
        let newPosition = oldPosition.add(entity.velocity.multiply(dt));

        // Convert the new position from meters to pixels
        entity.pos = CustomPhysics2D.vectorMetersToPixels(newPosition);

        // Update angular velocity and orientation based on angular acceleration
        entity.angularVelocity += entity.angularAcceleration * dt;
        entity.orientation += entity.angularVelocity * dt;
        entity.angularAcceleration = 0; // Reset angular acceleration after applying it

        // Normalize orientation to keep it within 0 to 2π
        entity.orientation = entity.orientation % (2 * Math.PI);

        // Reset acceleration for the next update cycle
        entity.acceleration = new Vector3D();

        // Log the updated position
        //console.log("Updated Position (Meters):", entity.pos);
    }

    static applyGravity(entity1, entity2, G = 6.67430e-11) {
        let r = entity2.pos.subtract(entity1.pos);
        let distance = r.magnitude();
        let forceMagnitude = (G * entity1.mass * entity2.mass) / (distance ** 2);
        let force = r.normalize().multiply(forceMagnitude);
        CustomPhysics2D.applyForce(entity1, force);
        CustomPhysics2D.applyForce(entity2, force.multiply(-1));

        console.log("Gravity Applied: Force Magnitude", forceMagnitude);
    }
}
