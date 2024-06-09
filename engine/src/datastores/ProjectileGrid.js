// ParticleGrid.js
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
            this.removeFromGrid(particle);
            particle.update(deltaTime);
            if(!particle.isAlive()) {
                toRemove.push(particle);
            } else {
                this.addToGrid(particle);
            }
        });

        toRemove.forEach(particle => this.removeParticle(particle));
    }

    getItemsInArea(area) {
        const items = new Set();
        const startX = Math.floor(area.x1 / this.cellSize);
        const endX = Math.ceil(area.x2 / this.cellSize) - 1;
        const startY = Math.floor(area.y1 / this.cellSize);
        const endY = Math.ceil(area.y2 / this.cellSize) - 1;

        for(let y = startY; y <= endY; y++) {
            for(let x = startX; x <= endX; x++) {
                const hash = `${x},${y}`;
                const cell = this.grid.get(hash);
                if(cell) {
                    cell.forEach(item => items.add(item));
                }
            }
        }

        return Array.from(items);
    }
}
