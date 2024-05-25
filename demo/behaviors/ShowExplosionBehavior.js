import Behavior from "../../engine/src/behaviors/Behavior.js";
export default class ShowExplosionBehavior extends Behavior {
    constructor(particleSystem, color = 'red', numParticles = 10) {
        super();
        this.particleSystem = particleSystem;
        this.color = color;
        this.numParticles = numParticles;

        // Maintain the correct context for the perform method
        this.perform = this.perform.bind(this);
    }

    perform(entity) {
        if(this.particleSystem) {
            this.particleSystem.createExplosion(entity.pos.x, entity.pos.y, this.numParticles, this.color);
            this.isComplete(entity);

        } else {
            console.error("Particle system is undefined");
        }
    }

    isComplete(entity) {
        return true;
    }
}
