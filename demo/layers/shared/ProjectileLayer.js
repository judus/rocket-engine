import BaseLayer from "../../../engine/src/scenes/BaseLayer.js";

/**
 * ProjectileLayer is responsible for rendering projectiles (bullets) on the canvas.
 */
export default class ProjectileLayer extends BaseLayer {
    /**
     * Retrieves the projectiles to be rendered in the current scene.
     * @param {BaseScene} scene - The current scene.
     * @returns {Array} The list of projectiles and particles in the camera's visible area.
     */
    getEntities(scene) {
        // Retrieve projectiles within the camera's visible area
        return scene.dataStoreManager.getStore('projectiles').getProjectilesInArea(scene.camera.getArea());
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
                if(typeof entity.getComponent === 'function') {
                    const renderComponent = entity.getComponent('render');
                    if(renderComponent) {
                        renderComponent.render(this.deltaTime, this.context, scene.camera);
                    }
                }
            }
        });
    }
}
