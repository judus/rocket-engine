// systems/ProjectileGrid.js
import BaseGridDataStore from './BaseGridDataStore.js';
import ProjectilePool from "./ProjectilePool.js";
import ParticleSystem from "../systems/particles/ParticleSystem.js";

export default class ProjectileGrid extends BaseGridDataStore {
    constructor(eventBus, cellSize = 100, projectilePool) {
        super(cellSize);
        this.projectilePool = projectilePool;
    }

    addProjectile(x, y, vx, vy, color, size, lifetime, reach, damage, owner) {
        const projectile = this.projectilePool.getProjectile();
        projectile.initialize(x, y, 0, vx, vy, 0, color, size, lifetime, reach, damage, owner);
        this.addToGrid(projectile);
    }

    update(deltaTime) {
        this.projectilePool.update(deltaTime);
        for(const projectile of this.projectilePool.getActiveProjectiles()) {
            this.removeFromGrid(projectile);
            if(projectile.active) {
                this.addToGrid(projectile);
            }
        }
    }

    getProjectilesInArea(area) {
        return this.getItemsInArea(area);
    }
}
