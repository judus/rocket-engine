import BaseLayer from "./rendering/BaseLayer.js";

/**
 * ProjectileLayer is responsible for rendering projectiles (bullets) on the canvas.
 */
export default class ParticleLayer extends BaseLayer {
    /**
     * Retrieves the projectiles to be rendered in the current scene.
     * @param {BaseScene} scene - The current scene.
     * @returns {Array} The list of projectiles and particles in the camera's visible area.
     */
    getEntities(scene) {
        // Retrieve projectiles within the camera's visible area
        return scene.dataStoreManager.getStore('particles').getItemsInArea(scene.camera.getArea());
    }

    /**
     * Renders the projectiles (bullets) and particles on the canvas.
     * @param {BaseScene} scene - The current scene.
     */
    render(scene) {
        this.clear();

        // Get the entities (projectiles and particles) to render
        const entities = this.getEntities(scene);

        // Loop through each entity and draw it
        entities.forEach(entity => {
            if(entity.active) {
                // Handle rendering for particles
                this.context.fillStyle = entity.color;
                this.context.beginPath();
                this.context.arc(
                    entity.pos.x - scene.camera.pos.x,
                    entity.pos.y - scene.camera.pos.y,
                    2, // Size of the particle
                    0,
                    Math.PI * 2
                );
                this.context.fill();
            }
        });
    }
}
