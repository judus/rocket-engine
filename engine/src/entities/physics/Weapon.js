import Entity2D from "./Entity2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import EntityFactory from "../../../../demo/entities/EntityFactory.js";
import SpriteComponent from "../../sprites/SpriteComponent.js";

export default class Weapon extends Entity2D {
    constructor(engine, config, ownerId, id = null) {
        super(engine, config, id);
        this.damage = config.damage;
        this.energyConsumption = config.energyConsumption;
        this.heatProduction = config.heatProduction;
        this.rateOfFire = config.rateOfFire;
        this.muzzles = config.muzzles || []; // Default to empty if muzzles not defined
        this.isActive = false;
        this.lastFired = 0;
        this.energyManager = null;
        this.heatManager = null;
        this.ownerId = ownerId;
        this.factory = new EntityFactory(engine);
        this.reactor = null;
        this.ammunition = config.ammunition || null;
        this.speedMultiplier = config.speedMultiplier || 1; // Speed multiplier for projectile

        this.addComponent('sprite', new SpriteComponent(config.sprite, 0, config.sprite.renderOrder), 1 / 60);
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

            // Fire projectiles from each muzzle or center position if no muzzles are defined
            if(this.muzzles.length > 0) {
                this.muzzles.forEach((muzzle, index) => {
                    this.createAndFireProjectile(muzzle, index);
                });
            } else {
                this.createAndFireProjectile();
            }
        }
    }

    createAndFireProjectile(muzzle = null, index = 0) {
        const initialPosition = this.getProjectileInitialPosition(muzzle);
        const orientation = this.getProjectileOrientation();

        const projectile = this.factory.createProjectile(this.ammunition, initialPosition, orientation, this.speedMultiplier, this.ownerId, this, muzzle);
        this.entityManager.addEntity(projectile);
    }

    getProjectileInitialPosition(muzzle) {
        const direction = new Vector3D(Math.cos(this.rotation), Math.sin(this.rotation));

        let offset;
        if(muzzle) {
            // Calculate the initial position of the projectile based on muzzle position
            offset = direction.multiply(muzzle.x).add(new Vector3D(-direction.y, direction.x).multiply(muzzle.y)); // Adjust for muzzle offset
        } else {
            // Default to center-right position if no muzzle is provided
            offset = direction.multiply(this.width / 2 + 5);
        }

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
