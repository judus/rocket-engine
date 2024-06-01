import Entity2D from "./Entity2D.js";

export default class Weapon extends Entity2D {
    constructor(engine, config) {
        super(engine, config);
        this.type = config.type;
        this.damage = config.damage;
        this.energyConsumption = config.energyConsumption;
        this.rateOfFire = config.rateOfFire;
        this.isActive = false;
        this.lastFired = 0;
    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }

    fire() {
        const now = performance.now();
        if(this.isActive && now - this.lastFired >= this.rateOfFire) {
            this.lastFired = now;
            console.log(`${this.type} weapon fired! Damage: ${this.damage}`);
            // Logic to deal damage, consume energy, etc.
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        // Logic for updating the weapon's state
        if(this.isActive) {
            this.fire();
        }
    }
}
