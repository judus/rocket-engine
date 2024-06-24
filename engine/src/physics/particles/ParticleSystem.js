import Particle from './Particle.js';

export default class ParticleSystem {
    constructor(particleGrid) {
        this.particleGrid = particleGrid;
    }

    update(deltaTime) {
        this.particleGrid.update(deltaTime);
    }

    render(context, camera) {
        const area = {
            x1: camera.pos.x,
            y1: camera.pos.y,
            x2: camera.pos.x + camera.width,
            y2: camera.pos.y + camera.height
        };
        const particles = this.particleGrid.getItemsInArea(area);
        particles.forEach(particle => particle.render(context, camera));
    }

    addParticle(particle) {
        this.particleGrid.addParticle(particle);
    }

    createExplosion(x, y, numParticles, particleCallback) {
        for(let i = 0; i < numParticles; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const speed = Math.random() * 50 + 50;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const lifetime = Math.random() * 0.5 + 0.5;

            let particleProps = {
                vx,
                vy,
                lifetime,
                color: '#FF0000' // Default color
            };

            if(particleCallback) {
                const callbackProps = particleCallback();
                particleProps = {
                    ...particleProps,
                    ...callbackProps
                };
            }

            const particle = new Particle(x, y, particleProps.vx, particleProps.vy, particleProps.lifetime, particleProps.color);
            this.addParticle(particle);
        }
    }


}
