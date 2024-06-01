import Vector3D from "../engine/src/utils/maths/Vector3D.js";

export default class CustomPhysics2D {
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
        // Update velocity and position based on acceleration
        entity.velocity = entity.velocity.add(entity.acceleration.multiply(dt));
        entity.pos = entity.pos.add(entity.velocity.multiply(dt));

        // Update angular velocity and orientation based on angular acceleration
        entity.angularVelocity += entity.angularAcceleration * dt;
        entity.orientation += entity.angularVelocity * dt;
        entity.angularAcceleration = 0; // Reset angular acceleration after applying it

        // Normalize orientation to keep it within 0 to 2π
        entity.orientation = entity.orientation % (2 * Math.PI);

        // Reset acceleration for the next update cycle
        entity.acceleration = new Vector3D();

        // Log the updated position
        console.log("Updated Position:", entity.pos);
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

// Example Usage
class Entity {
    constructor(mass, inertiaModifier, accelerationModifier) {
        this.mass = mass; // kg
        this.inertiaModifier = 1; // Default to 1 if not specified
        this.accelerationModifier = 1; // Default to 1 if not specified
        this.momentOfInertia = 1; // Default to 1 if not specified
        this.acceleration = new Vector3D();
        this.velocity = new Vector3D();
        this.pos = new Vector3D();
        this.angularAcceleration = 0;
        this.angularVelocity = 0;
        this.orientation = 0;
    }
}

const car = new Entity(1000, 1, 1); // 1000 kg car

const force = new Vector3D(100000, 0, 0); // 100 kW force in x direction
const dt = 1; // 1 second time step

CustomPhysics2D.applyForce(car, force);
CustomPhysics2D.update(car, dt);

console.log("Car Position after 1 second:", car.pos);
console.log("Car Velocity after 1 second:", car.velocity);
