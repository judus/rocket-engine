import Entity2D from "./Entity2D.js";
import EngineComponent from "./EngineComponent.js";
import PowerPlantComponent from "./PowerPlantComponent.js";
import InertiaDamperComponent from "./InertiaDamperComponent.js";
import EngineControllerComponent from "./EngineControllerComponent.js";
import PhysicsComponent from "./PhysicsComponent.js";
import EngineProfile from "./EngineProfile.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import EnvironmentComponent from "./EnvironmentComponent.js";
import WorldScaleComponent from "./WorldScaleComponent.js";

export default class StarShip extends Entity2D {
    constructor(engine, config, id) {
        config = {
            ...config,
            // Initially the vehicle is at rest at the origin
            pos: new Vector3D(0, 0, 0),
            velocity: new Vector3D(0, 0, 0),

            // The vehicle
            mass: 1000, // 1000 kg car

            // Physic modifiers, reset to have no effect
            momentOfInertia: 1, // Increased slightly for stability
            accelerationModifier: 1, // Reduced for balanced acceleration
            inertiaModifier: 1, // Keeping it low for agility
            dragCoefficient: 500,
            dragCoefficientModifier: 1, // New property for drag coefficient modifier
            rotationalDragCoefficient: 0.999, // New property for rotational drag coefficient
            staticFrictionCoefficient: 10, // New property for static friction coefficient


            // Energy settings set to great capacity and recharge rate
            // in order for our car to be able to use it's maxThrust
            maxEnergy: 1000000000, // Reduced to reasonable levels
            rechargeRate: 10000000, // Reduced to reasonable levels


        };

        super(engine, config, id);

        // Set up engine profile for our car - we use the "boost" profile
        config.engineProfile = new EngineProfile({
            'idle': { efficiency: 1, maxThrust: 10000, maxTorque: 10},
            'cruise': {efficiency: 1, maxThrust: 10000, maxTorque: 10},
            'boost': { efficiency: 1, maxThrust: 10000, maxTorque: 10}
        });

        // The damper settings and reset to have no effect
        config.damperSettings = {
            'arcade': {accelerationModifier: 1, inertiaModifier: 1, dragCoefficientModifier: 50},
            'advanced': {accelerationModifier: 1, inertiaModifier: 1, dragCoefficientModifier: 1},
        };

        this.config = config;


        // Add PowerPlant component before others that depend on it
        this.addComponent('powerPlant', new PowerPlantComponent(config.maxEnergy, config.rechargeRate), 1 / 60, 2);

        // Add inertia damper after scaling and powerPlant
        const inertiaDamper = new InertiaDamperComponent(config.damperSettings);
        inertiaDamper.setProfile('arcade'); // Set the profile here
        this.addComponent('inertiaDamper', inertiaDamper, 1 / 60, 3);

        // Add engine component which depends on powerPlant and possibly inertiaDamper
        const engineComponent = new EngineComponent(config.engineProfile);
        engineComponent.setState('cruise'); // Start with cruise for better control
        this.addComponent('engine', engineComponent, 1 / 60, 4);

        // Add engineController component which depends on engine
        this.addComponent('engineController', new EngineControllerComponent(), 1 / 60, 5);

        // Add EnvironmentComponent to apply environmental effects like drag
        this.addComponent('environment', new EnvironmentComponent(), 1 / 60, 6);

        // Add PhysicsComponent last to update physics after all other components
        this.addComponent('physics', new PhysicsComponent(), 1 / 60, 7);
    }

    setInput(ad, ws) {
        this.getComponent('engineController').setInput(ad, ws);
    }
}

