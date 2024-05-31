### Summary of 2D and 3D Versions

#### 3D Version

The 3D version involves simulating entities in a 3D space with components such as engines, power plants, and inertia
dampers. The `EngineController` handles thrust and torque, while the `CustomPhysics` class manages the physics
calculations.

##### CustomPhysics Class (3D)

```javascript
class CustomPhysics {
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
        CustomPhysics.applyForce(entity1, force);
        CustomPhysics.applyForce(entity2, force.multiply(-1));
    }
}
```

##### EngineController Class (3D)

```javascript
class EngineController {
    constructor(entity) {
        this.entity = entity;
    }

    setInput(ad, ws, profile) {
        if (profile === 'arcade') {
            this.setArcadeInput(ad, ws);
        } else if (profile === 'advanced') {
            this.setAdvancedInput(ad, ws);
        }
    }

    setArcadeInput(ad, ws) {
        const thrustDirection = new Vector3D(ad, ws, 0);
        const thrustMagnitude = thrustDirection.magnitude();

        if (thrustMagnitude > 1) {
            thrustDirection.normalize();
        }

        const thrustPower = thrustMagnitude;
        this.applyThrust(thrustDirection, thrustPower);
    }

    setAdvancedInput(ad, ws) {
        if (ws !== 0) {
            const torquePower = Math.abs(ws);
            const torqueDirection = ws > 0 ? 1 : -1;
            this.applyTorque(torqueDirection, torquePower);
        }

        if (ad !== 0) {
            const thrustDirection = new Vector3D(Math.cos(this.entity.orientation), Math.sin(this.entity.orientation), 0);
            const thrustPower = Math.abs(ad);
            this.applyThrust(thrustDirection.multiply(ad), thrustPower);
        }
    }

    applyThrust(thrustDirection, power) {
        if (this.entity.engine) {
            this.entity.engine.applyThrust(this.entity, thrustDirection, power);
        } else {
            console.log("No engine attached to apply thrust");
        }
    }

    applyTorque(torqueDirection, power) {
        if (this.entity.engine) {
            this.entity.engine.applyTorque(this.entity, torqueDirection, power);
        } else {
            console.log("No engine attached to apply torque");
        }
    }
}
```

#### 2D Version

The 2D version involves simulating entities in a top-down view with similar components as the 3D version.
The `EngineController2D` handles thrust and torque with input mappings specific to a 2D game.

##### CustomPhysics2D Class

```javascript
class CustomPhysics2D {
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
        entity.position = entity.position.add(entity.velocity.multiply(dt));

        entity.angularVelocity += entity.angularAcceleration * dt;
        entity.orientation += entity.angularVelocity * dt;
        entity.angularAcceleration = 0; // Reset angular acceleration after applying it

        // Normalize orientation to keep it within 0 to 2π
        entity.orientation = entity.orientation % (2 * Math.PI);
    }

    static applyGravity(entity1, entity2, G = 6.67430e-11) {
        let r = entity2.position.subtract(entity1.position);
        let distance = r.magnitude();
        let forceMagnitude = (G * entity1.mass * entity2.mass) / (distance ** 2);
        let force = r.normalize().multiply(forceMagnitude);
        CustomPhysics2D.applyForce(entity1, force);
        CustomPhysics2D.applyForce(entity2, force.multiply(-1));
    }
}
```

##### EngineController2D Class

```javascript
class EngineController2D {
    constructor(entity) {
        this.entity = entity;
    }

    setInput(ad, ws, profile) {
        if (profile === 'arcade') {
            this.setArcadeInput(ad, ws);
        } else if (profile === 'advanced') {
            this.setAdvancedInput(ad, ws);
        }
    }

    setArcadeInput(ad, ws) {
        // InertiaDamper ON - Direct translation
        const thrustDirection = new Vector3D(ad, ws, 0); // Map input directly to x and y axis
        const thrustMagnitude = thrustDirection.magnitude();

        if (thrustMagnitude > 1) {
            thrustDirection.normalize();
        }

        const thrustPower = thrustMagnitude;
        this.applyThrust(thrustDirection, thrustPower);
    }

    setAdvancedInput(ad, ws) {
        // InertiaDamper OFF - Thrust-based with rotation
        if (ws !== 0) {
            const torquePower = Math.abs(ws); // Rotate based on ws input
            const torqueDirection = ws > 0 ? 1 : -1; // Clockwise or counterclockwise
            this.applyTorque(torqueDirection, torquePower);
        }

        if (ad !== 0) {
            const thrustDirection = new Vector3D(Math.cos(this.entity.orientation), Math.sin(this.entity.orientation), 0);
            const thrustPower = Math.abs(ad); // Forward or backward thrust based on ad input
            this.applyThrust(thrustDirection.multiply(ad), thrustPower);
        }
    }

    applyThrust(thrustDirection, power) {
        if (this.entity.engine) {
            this.entity.engine.applyThrust(this.entity, thrustDirection, power);
        } else {
            console.log("No engine attached to apply thrust");
        }
    }

    applyTorque(torqueDirection, power) {
        if (this.entity.engine) {
            this.entity.engine.applyTorque(this.entity, torqueDirection, power);
        } else {
            console.log("No engine attached to apply torque");
        }
    }
}
```

#### Entity Class Update for 2D

Update the `Entity` class to handle 2D properties and integrate with `EngineController2D`.

```javascript
class Entity {
    constructor(mass, position = new Vector3D(), velocity = new Vector3D(), acceleration = new Vector3D(), momentOfInertia = 1, angularVelocity = 0, angularAcceleration = 0, orientation = 0, engine = null, powerPlant = null, inertiaDamper = null) {
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.momentOfInertia = momentOfInertia;
        this.angularVelocity = angularVelocity;
        this.angularAcceleration = angularAcceleration;
        this.orientation = orientation;
        this.engine = engine;
        this.powerPlant = powerPlant;
        this.inertiaDamper = inertiaDamper;
        this.engineController = new EngineController2D(this);
        this.accelerationModifier = 1;
        this.inertiaModifier = 1;
    }

    update(dt) {
        if (this.powerPlant) {
            this.powerPlant.recharge(dt);
        }

        if (this.inertiaDamper) {
            this.inertiaDamper.applyModifiers(this);
        }

        CustomPhysics2D.update(this, dt);
    }

    applyDrag() {
        const dragForce = this.velocity.multiply(-this.dragCoefficient);
        CustomPhysics2D.applyForce(this, dragForce);
    }
}
```

### Example Usage

Here's an example of how to use the updated classes in both 2D and 3D simulations.

#### 3D Simulation

```javascript
const engineProfile = new EngineProfile({
    'idle': {efficiency: 0.5, maxThrust: 200, maxTorque: 100},
    'cruise': {efficiency: 0.8, maxThrust: 500, maxTorque: 250},
    'boost': {
        efficiency:

            0.9, maxThrust: 1000, maxTorque: 500
    }
});

const inertiaDamperSettings = {
    'arcade': {accelerationModifier: 3, inertiaModifier: 0.1},
    'advanced': {accelerationModifier: 1, inertiaModifier: 1}
};

const engine = new Engine(engineProfile);
engine.setState('cruise');

const powerPlant = new PowerPlant(10000, 100);
const inertiaDamper = new InertiaDamper(inertiaDamperSettings);
inertiaDamper.setProfile('arcade');

let earth = new Entity(5.972e24, new Vector3D(0, 0, 0), new Vector3D(0, 0, 0), new Vector3D(0, 0, 0), 1, new Vector3D(), new Quaternion());
let satellite = new Entity(1000, new Vector3D(7000e3, 0, 0), new Vector3D(0, 7.12e3, 0), new Vector3D(0, 0, 0), 1, new Vector3D(), new Quaternion(), engine, powerPlant, inertiaDamper);

satellite.engineController.setInput(1, 0, 'arcade'); // Apply force in the x direction
satellite.engineController.setInput(0, 1, 'arcade'); // Apply force in the y direction

const dt = 1.0; // time step in seconds
const steps = 10000;

function updateSimulation(entities, dt, steps) {
    for(let i = 0; i < steps; i++) {
        entities.forEach(entity => {
            entity.applyDrag();
            entity.update(dt);
        });
    }
}

updateSimulation([earth, satellite], dt, steps);

console.log(`Earth Position: ${earth.position.toString()}`);
console.log(`Satellite Position: ${satellite.position.toString()}`);
console.log(`Satellite Velocity: ${satellite.velocity.toString()}`);
console.log(`Satellite Orientation: ${satellite.orientation}`);
console.log(`Satellite Energy: ${satellite.powerPlant.energy}`);
```

#### 2D Simulation

```javascript
const engineProfile2D = new EngineProfile({
    'idle': {efficiency: 0.5, maxThrust: 200, maxTorque: 100},
    'cruise': {efficiency: 0.8, maxThrust: 500, maxTorque: 250},
    'boost': {efficiency: 0.9, maxThrust: 1000, maxTorque: 500}
});

const inertiaDamperSettings2D = {
    'arcade': {accelerationModifier: 3, inertiaModifier: 0.1},
    'advanced': {accelerationModifier: 1, inertiaModifier: 1}
};

const engine2D = new Engine(engineProfile2D);
engine2D.setState('cruise');

const powerPlant2D = new PowerPlant(10000, 100);
const inertiaDamper2D = new InertiaDamper(inertiaDamperSettings2D);
inertiaDamper2D.setProfile('arcade');

let earth2D = new Entity(5.972e24, new Vector3D(0, 0, 0), new Vector3D(0, 0, 0), new Vector3D(0, 0, 0), 1, 0, 0, 0, engine2D, powerPlant2D, inertiaDamper2D);
let satellite2D = new Entity(1000, new Vector3D(7000e3, 0, 0), new Vector3D(0, 7.12e3, 0), new Vector3D(0, 0, 0), 1, 0, 0, 0, engine2D, powerPlant2D, inertiaDamper2D);

satellite2D.engineController.setInput(1, 0, 'arcade'); // Move right
satellite2D.engineController.setInput(0, 1, 'arcade'); // Move up

satellite2D.engineController.setInput(0, 1, 'advanced'); // Rotate clockwise
satellite2D.engineController.setInput(1, 0, 'advanced'); // Thrust forward

const dt2D = 1.0; // time step in seconds
const steps2D = 10000;

function updateSimulation2D(entities, dt, steps) {
    for(let i = 0; i < steps; i++) {
        entities.forEach(entity => {
            entity.applyDrag();
            entity.update(dt);
        });
    }
}

updateSimulation2D([earth2D, satellite2D], dt2D, steps2D);

console.log(`Earth Position: ${earth2D.position.toString()}`);
console.log(`Satellite Position: ${satellite2D.position.toString()}`);
console.log(`Satellite Velocity: ${satellite2D.velocity.toString()}`);
console.log(`Satellite Orientation: ${satellite2D.orientation}`);
console.log(`Satellite Energy: ${satellite2D.powerPlant.energy}`);
```

### Summary

- **3D Version**: CustomPhysics, EngineController, and Entity classes handle 3D physics and controls.
- **2D Version**: CustomPhysics2D, EngineController2D, and Entity classes handle 2D top-down physics and controls.
- **Profiles**: Arcade and Advanced profiles for different movement behaviors.
- **InertiaDamper**: Manages inertia and acceleration modifiers based on the active profile.

With these implementations, both 2D and 3D versions of your game can simulate the desired behaviors and control schemes,
providing a flexible and engaging experience for players.