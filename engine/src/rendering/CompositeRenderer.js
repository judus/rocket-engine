import Renderer from "./Renderer.js";

export default class CompositeRenderer extends Renderer {
    /**
     * CompositeRenderer constructor.
     */
    constructor() {
        super(null); // No specific element needed at this level
        this.renderers = [];
    }

    /**
     * Adds a renderer to the composite.
     * @param {Renderer} renderer - The renderer to add.
     */
    addRenderer(renderer) {
        this.renderers.push(renderer);
    }

    /**
     * Renders the scene using all added renderers.
     * @param {BaseScene} scene - The scene to render.
     * @param deltaTime
     * @param tickCount
     * @param totalTime
     */
    render(scene, deltaTime, tickCount, totalTime) {
        this.renderers.forEach(renderer => {
            try {
                renderer.render(scene, deltaTime, tickCount, totalTime);
            } catch(error) {
                console.error("Error rendering with renderer:", error);
            }
        });
    }
}
