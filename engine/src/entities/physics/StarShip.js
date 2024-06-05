// StarShip.js
import Entity2D from "./Entity2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import EngineComponent from "./EngineComponent.js";
import DamperComponent from "./DamperComponent.js";
import ControllerComponent from "./ControllerComponent.js";
import PhysicsComponent from "./PhysicsComponent.js";
import EnvironmentComponent from "./EnvironmentComponent.js";
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
import SpriteComponent from "../../sprites/SpriteComponent.js";
import EnergyManagerComponent from "./EnergyManagerComponent.js";
import InventoryComponent from "./InventoryComponent.js";
import CargoBayComponent from "./CargoBayComponent.js";
import ReactorComponent from "./ReactorComponent.js";
import ShieldComponent from "./ShieldComponent.js";
import HeatManagerComponent from "./HeatManagerComponent.js";
import CoolingSystemComponent from "./CoolingSystemComponent.js";

export default class StarShip extends Entity2D {
    constructor(engine, config, id) {
        config = {
            ...config,
            pos: new Vector3D(0, 0, 0),
            velocity: new Vector3D(0, 0, 0),
            mass: 1000,
            momentOfInertia: 1,
            accelerationModifier: 1,
            inertiaModifier: 1,
            dragCoefficient: 500,
            dragCoefficientModifier: 1,
            rotationalDragCoefficient: 0.999,
            staticFrictionCoefficient: 10,
        };

        super(engine, config, id);

        const powerPlantProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 1,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 0,
                maxEnergyMW: 10, // megawatts
                rechargeRateMW: 0.3 // megawatts
            }
        };

        const coolingSystemProfiles = {
            default: {
                maxTemperature: 100,  // Maximum operational temperature in °C
                heatProductionRate: 1,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                dissipationFactor: 0.5,  // Reduces the heat accumulation rate in other components by this factor
                health: 100,  // Health points of the cooling system, indicating its damage threshold
                energyCostMW: 1,  // Energy cost in megawatts for the cooling system to operate
            }
        };

        const engineProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 1,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 2,
                states: {
                    idle: {efficiency: 1, maxThrust: 200000, maxTorque: 10},
                    cruise: {efficiency: 1, maxThrust: 200000, maxTorque: 10},
                    boost: {efficiency: 1, maxThrust: 200000, maxTorque: 10}
                }
            }
        };

        const shieldProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 5,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 2,
                shieldStrength: 1000, // 1000 units of shield strength
                rechargeRateMW: 0.5 // megawatts for recharging
            }
        };

        const cargoBayProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 1,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 1,
                capacityMultiplier: 1
            }
        };

        const damperProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 1,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 2,
                accelerationModifier: 1,
                inertiaModifier: 0.1,
                dragCoefficientModifier: 500
            },
            advanced: {
                maxTemperature: 100, // in °C
                heatProductionRate: 1,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 2,
                accelerationModifier: 1,
                inertiaModifier: 1,
                dragCoefficientModifier: 1
            }
        };


        const mountProfiles = new MountProfile([
            {
                id: 'mount1',
                type: 'weapon',
                typeCompatibility: ['laser', 'kinetic'],
                position: {x: 20, y: -25}
            },
            {
                id: 'mount2',
                type: 'weapon',
                typeCompatibility: ['laser', 'kinetic'],
                position: {x: 20, y: 25}
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

        this.addComponent('energyManager', new EnergyManagerComponent(), 1 / 60, 1);
        this.addComponent('heatManager', new HeatManagerComponent(100), 1 / 60, 1);
        this.addComponent('powerPlant', new ReactorComponent(powerPlantProfiles, 1, 'default'), 1 / 60, 2);
        this.addComponent('cooling', new CoolingSystemComponent(coolingSystemProfiles, 1, 'default'), 1 / 60, 2);
        this.addComponent('cargo', new CargoBayComponent(cargoBayProfiles, 2, 'default'), 1 / 60, 2);
        this.addComponent('inventory', new InventoryComponent({}, 3), 1 / 60, 2);
        this.addComponent('damper', new DamperComponent(damperProfiles, 5, 'default'), 1 / 60, 3);
        this.addComponent('engine', new EngineComponent(engineProfiles, 3, 'default'), 1 / 60, 4);
        this.addComponent('engineController', new ControllerComponent(), 1 / 60, 5);
        this.addComponent('environment', new EnvironmentComponent(), 1 / 60, 6);
        this.addComponent('physics', new PhysicsComponent(), 1 / 60, 7);
        this.addComponent('shields', new ShieldComponent(shieldProfiles, 4), 1 / 60, 7);
        this.addComponent('mounts', new EntityMountsComponent(mountProfiles), 1 / 60, 8);
        this.addComponent('weaponSystem', new WeaponSystemComponent(), 1 / 60, 9);
        this.addComponent('attack', new ShipAttackComponent(), 1 / 60, 10);

        this.spriteSheet = this.engine.spriteSheetManager().getSpriteSheet('gunship-fighter-3');
        this.addComponent('sprite', new SpriteComponent(this.spriteSheet, 0), 1 / 60, 12);

        this.hasComponent('mounts', (mounts) => {
            const laserWeapon1 = new LaserWeapon(engine, 'laser1');
            const laserWeapon2 = new LaserWeapon(engine, 'laser2');
            const kineticWeapon1 = new KineticWeapon(engine, 'kinetic1');
            const kineticWeapon2 = new KineticWeapon(engine, 'kinetic2');
            const scanner = new Scanner(engine);
            const jammer = new Jammer(engine);

            mounts.attachEntity(laserWeapon1, 'mount1');
            mounts.attachEntity(laserWeapon2, 'mount2');
            mounts.attachEntity(kineticWeapon1, 'mount3');
            mounts.attachEntity(kineticWeapon2, 'mount4');
        });

        this.hasComponent('weaponSystem', (weaponSystemComponent) => {
            weaponSystemComponent.createWeaponGroup('1', [0, 1]);
            weaponSystemComponent.createWeaponGroup('2', [2, 3]);
        });
    }

    setInput(ad, ws) {
        this.getComponent('engineController').setInput(ad, ws);
    }
}
