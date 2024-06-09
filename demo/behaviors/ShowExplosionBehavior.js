import Behavior from "../../engine/src/behaviors/Behavior.js";
import ColorHelper from "../../engine/src/utils/ColorHelper.js";
import MathHelper from "../../engine/src/utils/MathHelper.js";

export default class ShowExplosionBehavior extends Behavior {
    constructor(particleSystem, numParticlesFactor = 1, minParticles = 5, maxParticles = 100, particleCallback = null) {
        super();
        this.particleSystem = particleSystem;
        this.numParticlesFactor = numParticlesFactor;
        this.minParticles = minParticles;
        this.maxParticles = maxParticles;
        this.particleCallback = particleCallback || this.defaultParticleCallback;
    }

    perform(entity) {
        if(this.particleSystem) {
            entity.hasComponent('health', (component) => {
                const maxHealth = component.maxHealth;
                const currentHealth = component.currentHealth;
                const numParticles = Math.max(this.minParticles, Math.min(Math.ceil(maxHealth * this.numParticlesFactor), this.maxParticles));
                this.particleSystem.createExplosion(entity.pos.x, entity.pos.y, numParticles, () => this.particleCallback(entity, maxHealth, currentHealth));
            });
        } else {
            console.error("Particle system is undefined");
        }
        this.isComplete(entity);
    }


    defaultParticleCallback(entity, maxHealth, currentHealth) {
        // Define a range of colors
        const colors = ['#FF0000', '#FFA500', '#FFA500', '#FFA500', '#FFFF00'];
        const randomColor = colors[MathHelper.randomInt(0, colors.length - 1)];

        const angle = Math.random() * 2 * Math.PI;
        const baseSpeed = Math.random() * 50 + 50;
        const speedVariation = Math.random() * 100 - 50; // Adding randomness to speed
        const finalSpeed = baseSpeed + speedVariation;
        const vx = Math.cos(angle) * finalSpeed;
        const vy = Math.sin(angle) * finalSpeed;
        const lifetime = Math.random() * 0.5 + 0.5;

        return {
            vx,
            vy,
            lifetime,
            color: randomColor
        };
    }

    isComplete(entity) {
        return true;
    }
}
