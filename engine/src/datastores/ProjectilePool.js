import Projectile from "../entities/Projectile.js";

function generateUUID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

export default class ProjectilePool {
    constructor(size, particleSystem) {
        this.pool = [];
        this.activeProjectiles = new Set();
        this.particleSystem = particleSystem;

        for(let i = 0; i < size; i++) {
            this.pool.push(new Projectile(generateUUID(), this.particleSystem));
        }
    }

    getProjectile() {
        for(const projectile of this.pool) {
            if(!projectile.active) {
                this.activeProjectiles.add(projectile);
                return projectile;
            }
        }

        const newProjectile = new Projectile(generateUUID(), this.particleSystem);
        this.pool.push(newProjectile);
        this.activeProjectiles.add(newProjectile);
        return newProjectile;
    }

    update(deltaTime) {
        for(const projectile of this.activeProjectiles) {
            if(projectile.active) {
                projectile.update(deltaTime);
                if(!projectile.active) {
                    this.activeProjectiles.delete(projectile);
                }
            }
        }
    }

    getActiveProjectiles() {
        return Array.from(this.activeProjectiles);
    }

    removeProjectile(projectile) {
        projectile.active = false;
        this.activeProjectiles.delete(projectile);
    }
}
