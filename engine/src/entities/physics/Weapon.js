import Entity2D from "./Entity2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import EntityFactory from "../../../../demo/entities/EntityFactory.js";

export default class Weapon extends Entity2D {
    constructor(engine, config, ownerId, id = null) {
        super(engine, config, id);
        this.damage = config.damage;
        this.energyConsumption = config.energyConsumption;
        this.heatProduction = config.heatProduction;
        this.rateOfFire = config.rateOfFire;
        this.isActive = false;
        this.lastFired = 0;
        this.energyManager = null;
        this.heatManager = null;
        this.ownerId = ownerId;
        this.factory = new EntityFactory(engine);
    }

    onAdd(entity) {
        super.onAdd(entity);
        this.entity.hasComponent('energyManager', (energyManager) => {
            this.energyManager = energyManager;
        });
        this.entity.hasComponent('heatManager', (heatManager) => {
            this.heatManager = heatManager;
        });
    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }

    canFire() {
        return this.energyManager.availableEnergy >= this.energyConsumption;
    }

    fire() {

        const now = performance.now();
        //if(now - this.lastFired >= this.rateOfFire) {
            //this.lastFired = now;
            // this.energyManager.consumeEnergy(this.energyConsumption);
            // this.heatManager.produceHeat(this.heatProduction);

            const initialPosition = this.getProjectileInitialPosition();
            const velocity = this.getProjectileVelocity();

            const projectile = this.factory.createProjectile('bullet_standard', initialPosition, velocity, this.ownerId);
            this.entityManager.addEntity(projectile);
        //}
    }

    getProjectileVelocity() {
        // Calculate the initial velocity of the projectile based on weapon orientation
        const direction = new Vector3D(Math.cos(this.rotation), Math.sin(this.rotation));
        return direction.multiply(50); // Example speed
    }

    getProjectileInitialPosition() {
        // Calculate the initial position of the projectile based on weapon orientation and dimensions
        const direction = new Vector3D(Math.cos(this.rotation), Math.sin(this.rotation));
        const offset = direction.multiply(this.height / 2); // Adjust for weapon's width
        return this.pos.clone().add(offset);
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.isActive) {
            this.fire();
        }
    }
}
