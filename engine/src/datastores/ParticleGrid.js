import BaseGridDataStore from './BaseGridDataStore.js';

export default class ParticleGrid extends BaseGridDataStore {
    constructor(eventBus, cellSize = 100) {
        super(cellSize);
        this.eventBus = eventBus;
        this.particles = new Set();
    }

    addParticle(particle) {
        this.particles.add(particle);
        this.addToGrid(particle);
    }

    removeParticle(particle) {
        this.particles.delete(particle);
        this.removeFromGrid(particle);
    }

    update(deltaTime) {
        const toRemove = [];
        this.particles.forEach(particle => {
            this.removeFromGrid(particle); // Remove particle from the grid based on its current position
            particle.update(deltaTime); // Update particle position and lifetime
            if(!particle.isAlive()) {
                toRemove.push(particle);
            } else {
                this.addToGrid(particle); // Add particle back to the grid based on its new position
            }
        });

        toRemove.forEach(particle => this.removeParticle(particle));
    }
}
