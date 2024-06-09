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
        this.reactor = null;
    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }

    canFire() {
        if(!this.reactor) {
            this.parent.hasComponent('powerPlant', (component) => {
                this.reactor = component;
            });
        }
        return this.reactor && this.reactor.energy >= this.energyConsumption;
    }

    fire() {
        const now = performance.now();
        if(now - this.lastFired >= this.rateOfFire && this.canFire()) {
            this.lastFired = now;

            this.reactor.consume(this.energyConsumption);

            const initialPosition = this.getProjectileInitialPosition();
            const velocity = this.getProjectileVelocity();
            const orientation = this.getProjectileOrientation();

            const projectile = this.factory.createProjectile('bullet_standard', initialPosition, orientation, velocity, this.ownerId);
            this.entityManager.addEntity(projectile);
        }
    }

    getProjectileVelocity() {
        // Calculate the initial velocity of the projectile based on weapon orientation
        const direction = new Vector3D(Math.cos(this.rotation), Math.sin(this.rotation));
        const projectileSpeed = direction.multiply(200); // Example speed

        // Add the velocity of the ship to the projectile velocity
        const parentVelocity = this.parent.velocity;
        return projectileSpeed.add(parentVelocity);
    }

    getProjectileInitialPosition() {
        // Calculate the initial position of the projectile based on weapon orientation and dimensions
        const direction = new Vector3D(Math.cos(this.rotation), Math.sin(this.rotation));
        const offset = direction.multiply(this.width / 2 + 5); // Adjust for weapon's width
        return this.pos.clone().add(offset);
    }

    getProjectileOrientation() {
        // Combine weapon and ship orientation
        return this.rotation;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.isActive) {
            this.fire();
        }
    }
}
