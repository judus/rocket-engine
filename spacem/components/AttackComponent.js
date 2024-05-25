import BaseComponent from './BaseComponent.js';

export default class AttackComponent extends BaseComponent {
    constructor(eventBus, dataStoreManager) {
        super(eventBus, dataStoreManager);
        this.eventBus = eventBus;
        this.dataStoreManager = dataStoreManager;
        this.fireRate = 12; // Bullets per second
        this.lastFireTime = 0;
    }

    attack(scopedMouse, projectileType) {
        const camera = this.dataStoreManager.getStore('cameras').get('main');

        const currentTime = performance.now() / 1000; // Convert to seconds
        if(currentTime - this.lastFireTime < 1 / this.fireRate) return;
        this.lastFireTime = currentTime;

        // Get the ship's position on the canvas
        const shipCanvasX = (this.entity.pos.x - camera.pos.x) * camera.zoomLevel;
        const shipCanvasY = (this.entity.pos.y - camera.pos.y) * camera.zoomLevel;

        // Get the mouse position relative to the canvas
        const mouseCanvasX = scopedMouse.pos.x;
        const mouseCanvasY = scopedMouse.pos.y;

        // Calculate angle from ship's position on the canvas to mouse position on the canvas
        const angle = Math.atan2(mouseCanvasY - shipCanvasY, mouseCanvasX - shipCanvasX);
        const bulletSpeed = 100; // Adjust bullet speed
        let velX = bulletSpeed * Math.cos(angle);
        let velY = bulletSpeed * Math.sin(angle);

        // Add ship's velocity if the projectile type is influenced by the ship's velocity
        // if(projectileType.influencedByShipVelocity) {
        //     velX += this.entity.vel.x;
        //     velY += this.entity.vel.y;
        // }

        // Entity's position in world coordinates
        const x = this.entity.pos.x;
        const y = this.entity.pos.y;

        console.log(`Firing projectile from (${x}, ${y}) with velocity (${velX}, ${velY})`); // Debug log

        //this.dataStoreManager.getStore('projectiles').addProjectile(x, y, velX, velY, projectileType.color, projectileType.size, projectileType.lifetime, projectileType.reach, projectileType.damage, this.entity);
        this.dataStoreManager.getStore('projectiles').addProjectile(
            x,               // Start position x-coordinate
            y,               // Start position y-coordinate
            velX,            // Velocity in the x-direction
            velY,            // Velocity in the y-direction
            'red',           // ColorHelper of the projectile
            2,               // Size of the projectile
            3,               // Lifetime of the projectile (in some time units, typically milliseconds or seconds)
            100,             // Reach (distance the projectile can travel)
            10,              // Damage the projectile inflicts on collision
            this.entity      // Owner of the projectile (entity that fired it)
        );
    }
}
