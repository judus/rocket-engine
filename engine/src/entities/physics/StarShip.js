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
import EntityMountsComponent from "./EntityMountsComponent.js";
import WeaponSystemComponent from "./WeaponSystemComponent.js";
import MountProfile from "./MountProfile.js";
import LaserWeapon from "./LaserWeapon.js";
import KineticWeapon from "./KineticWeapon.js";
import Scanner from "./Scanner.js";
import Jammer from "./Jammer.js";
import ShipAttackComponent from "./ShipAttackComponent.js";
import RenderComponent from "../../components/RenderComponent.js";
import Drawing from "../../services/Drawing.js";

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
            maxEnergy: 10000000, // Reduced to reasonable levels
            rechargeRate: 300000, // Reduced to reasonable levels
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
            'arcade': {accelerationModifier: 1, inertiaModifier: 0.1, dragCoefficientModifier: 500},
            'advanced': {accelerationModifier: 1, inertiaModifier: 1, dragCoefficientModifier: 1},
        };

        config.mountProfile = new MountProfile([
            {
                id: 'mount1',
                type: 'weapon',
                typeCompatibility: ['laser', 'kinetic'],
                position: {x: 80, y: 20}
            },
            {
                id: 'mount2',
                type: 'weapon',
                typeCompatibility: ['laser', 'kinetic'],
                position: {x: -80, y: 20}
            },
            {
                id: 'mount3',
                type: 'weapon',
                typeCompatibility: ['laser', 'kinetic'],
                position: {x: 80, y: 20}
            },
            {
                id: 'mount4',
                type: 'weapon',
                typeCompatibility: ['laser', 'kinetic'],
                position: {x: -80, y: 20}
            },
            {
                id: 'mount5',
                type: 'utility',
                typeCompatibility: ['scanner', 'jammer'],
                position: {x: -0, y: 0}
            },
            {
                id: 'mount6',
                type: 'utility',
                typeCompatibility: ['scanner', 'jammer'],
                position: {x: -0, y: 0}
            }
        ]);

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

        // Add EntityMountsComponent to manage mounts
        this.addComponent('mounts', new EntityMountsComponent(config.mountProfile), 1 / 60, 8);

        // Add WeaponSystemComponent to manage weapons
        this.addComponent('weaponSystem', new WeaponSystemComponent(), 1 / 60, 9);

        this.addComponent('attack', new ShipAttackComponent(), 1 / 60, 10);


        // Mounting weapons
        this.hasComponent('mounts', (mounts) => {
            const laserWeapon1 = new LaserWeapon(engine);
            const laserWeapon2 = new LaserWeapon(engine);
            const kineticWeapon1 = new KineticWeapon(engine);
            const kineticWeapon2 = new KineticWeapon(engine);
            const scanner = new Scanner(engine);
            const jammer = new Jammer(engine);

            mounts.attachEntity(laserWeapon1, 'mount1');
            mounts.attachEntity(laserWeapon2, 'mount2');
            mounts.attachEntity(kineticWeapon1, 'mount3');
            mounts.attachEntity(kineticWeapon2, 'mount4');
        });

        // Create weapon groups
        // The first parameter is the key to activate the group (can be any int or char)
        // The second parameter is an array of indices referring to the mount positions of the weapons
        // The order in the array determines the order of firing
        this.hasComponent('weaponSystem', (weaponSystemComponent) => {
            weaponSystemComponent.createWeaponGroup('1', [0, 1]); // Group '1' with weapons on mount1 and mount2
            weaponSystemComponent.createWeaponGroup('2', [2, 3]); // Group '2' with weapons on mount3 and mount4
        });

        this.addComponent('render', new RenderComponent((deltaTime, context, entity, camera) => {
            Drawing.draw(context, entity, camera, entity.color);
        }, false));

    }

    setInput(ad, ws) {
        this.getComponent('engineController').setInput(ad, ws);
    }
}

