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
import EntityVerticesComponent from "../../../../demo/components/EntityVerticesComponent.js";
import CollisionComponent from "../../components/collisions/CollisionComponent.js";
import DefaultCollisionResponse from "../../components/collisions/DefaultCollisionResponse.js";
import TransformComponent from "../../components/TransformComponent.js";
import CollisionDataComponent from "./CollisionDataComponent.js";
import EntityHighlightRenderComponent from "../../../../demo/components/EntityHighlightRenderComponent.js";
import HealthComponent from "../../components/HealthComponent.js";


export default class StarShip extends Entity2D {
    constructor(engine, config, x, y, id) {
        config = {
            ...config,
            pos: new Vector3D(x, y, 0),
            velocity: new Vector3D(0, 0, 0),
            mass: 1000,
            momentOfInertia: 50,
            accelerationModifier: 1,
            inertiaModifier: 1,
            dragCoefficient: 5000,
            dragCoefficientModifier: 1,
            rotationalDragCoefficient: 1,
            staticFrictionCoefficient: 100,
        };

        super(engine, config, id);

        this.config = config;
        this.particleSystem = engine.particleSystem();
        this.isControlled = false;

        // Profiles
        this.cargoBayProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 0.01,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 1,
                capacityMultiplier: 1
            }
        };

        this.shieldProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 0.01,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 2,
                shieldStrength: 1000, // 1000 units of shield strength
                rechargeRateMW: 0.5 // megawatts for recharging
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
                position: {x: 16, y: -35}
            },
            {
                id: 'mount4',
                type: 'weapon',
                typeCompatibility: ['laser', 'kinetic'],
                position: {x: 16, y: 35}
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

        // Add common components
        this.addComponent('physics', new PhysicsComponent(), 1 / 60, 7);
        this.addComponent('mounts', new EntityMountsComponent(mountProfiles), 1 / 60, 8);
        this.addComponent('weaponSystem', new WeaponSystemComponent(), 1 / 60, 9);
        this.addComponent('attack', new ShipAttackComponent(), 1 / 60, 10);
        this.addComponent('collisionData', new CollisionDataComponent(), 1 / 30, 1);
        this.addComponent('collision', new CollisionComponent(new DefaultCollisionResponse(this.particleSystem), false), 1 / 30, 1);
        this.spriteSheet = this.engine.spriteSheetManager().getSpriteSheet(this.spriteSheet.name);
        this.addComponent('sprite', new SpriteComponent(this.spriteSheet, 0), 1 / 60, 12);

        this.addComponent('health', new HealthComponent(100));
        this.addComponent('highlight', new EntityHighlightRenderComponent(), 1 / 60, 12);

        this.addComponent('cargo', new CargoBayComponent(this.cargoBayProfiles, 2, 'default'), 1 / 10, 2);
        this.addComponent('shields', new ShieldComponent(this.shieldProfiles, 4), 1 / 30, 7);

        this.hasComponent('mounts', (mounts) => {
            const laser1 = this.entityFactory.createEntity('weapons', 'laser');
            const laser2 = this.entityFactory.createEntity('weapons', 'laser');
            const laser3 = this.entityFactory.createEntity('weapons', 'laser');
            const laser4 = this.entityFactory.createEntity('weapons', 'laser');

            laser1.ownerId = this.id;
            laser2.ownerId = this.id;
            laser3.ownerId = this.id;
            laser4.ownerId = this.id;

            mounts.attachEntity(laser1, 'mount1');
            mounts.attachEntity(laser2, 'mount2');
            mounts.attachEntity(laser3, 'mount3');
            mounts.attachEntity(laser4, 'mount4');
        });

        this.hasComponent('weaponSystem', (weaponSystemComponent) => {
            weaponSystemComponent.createWeaponGroup('1', [0, 1]);
            weaponSystemComponent.createWeaponGroup('2', [2, 3]);
            weaponSystemComponent.switchGroup(1);
            weaponSystemComponent.switchGroup(2);
        });

        this.addComponent('engineController', new ControllerComponent(engine.eventBus()), 1 / 60, 5);

    }

    takeControl() {
        if(this.isControlled) return;

        const powerPlantProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 0.01,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 0,
                maxEnergyMW: 100, // megawatts
                rechargeRateMW: 0.3 // megawatts
            }
        };

        const coolingSystemProfiles = {
            default: {
                maxTemperature: 100,  // Maximum operational temperature in °C
                heatProductionRate: 0.01,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                dissipationFactor: 0.5,  // Reduces the heat accumulation rate in other components by this factor
                health: 100,  // Health points of the cooling system, indicating its damage threshold
                energyCostMW: 1,  // Energy cost in megawatts for the cooling system to operate
            }
        };

        const engineProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 0.01,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 2,
                states: {
                    idle: {efficiency: 1, maxThrust: 200000, maxTorque: 10},
                    cruise: {efficiency: 1, maxThrust: 200000, maxTorque: 10},
                    boost: {efficiency: 1, maxThrust: 200000, maxTorque: 10}
                }
            }
        };

        const damperProfiles = {
            default: {
                maxTemperature: 100, // in °C
                heatProductionRate: 0.01,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 2,
                massModifier: 0.4,
                inertiaModifier: 0.08,
                dragCoefficientModifier: 3,
                accelerationModifier: 1
            },
            advanced: {
                maxTemperature: 100, // in °C
                heatProductionRate: 0.01,  // The rate at which the cooling system itself adds heat, as a percentage of its max temperature
                health: 100,
                energyCostMW: 2,
                accelerationModifier: 1,
                inertiaModifier: 1,
                dragCoefficientModifier: 1
            }
        };

        // Remove existing cargo and shields before re-adding them
        this.removeComponent('cargo');
        this.removeComponent('shields');

        this.addComponent('energyManager', new EnergyManagerComponent(), 1 / 30, 1);
        this.addComponent('heatManager', new HeatManagerComponent(100), 1 / 30, 1);
        this.addComponent('powerPlant', new ReactorComponent(powerPlantProfiles, 1, 'default'), 1 / 60, 2);
        this.addComponent('cooling', new CoolingSystemComponent(coolingSystemProfiles, 1, 'default'), 1 / 30, 2);
        this.addComponent('inventory', new InventoryComponent({}, 3), 1 / 10, 2);
        this.addComponent('damper', new DamperComponent(damperProfiles, 5, 'default'), 1 / 60, 3);
        this.addComponent('engine', new EngineComponent(engineProfiles, 3, 'default'), 1 / 60, 4);
        this.addComponent('environment', new EnvironmentComponent(), 1 / 30, 6);
        this.addComponent('cargo', new CargoBayComponent(this.cargoBayProfiles, 2, 'default'), 1 / 10, 2);
        this.addComponent('shields', new ShieldComponent(this.shieldProfiles, 4), 1 / 30, 7);
        this.addComponent('highlight', new EntityHighlightRenderComponent(), 1 / 60, 7);

        this.isControlled = true;
    }

    releaseControl() {
        if(!this.isControlled) return;

        this.removeComponent('energyManager');
        this.removeComponent('heatManager');
        this.removeComponent('powerPlant');
        this.removeComponent('cooling');
        this.removeComponent('inventory');
        this.removeComponent('damper');
        this.removeComponent('engine');
        this.removeComponent('environment');
        this.removeComponent('highlight');

        // Remove and re-add common components
        this.removeComponent('cargo');
        this.removeComponent('shields');
        this.addComponent('cargo', new CargoBayComponent(this.cargoBayProfiles, 2, 'default'), 1 / 10, 2);
        this.addComponent('shields', new ShieldComponent(this.shieldProfiles, 4), 1 / 30, 7);

        this.isControlled = false;
    }
}
