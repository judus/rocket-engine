export default class Renderer {
    /**
     * Renderer constructor.
     * @param {HTMLElement} element - The HTML element to render into.
     */
    constructor(element) {
        if(new.target === Renderer) {
            throw new Error('Cannot instantiate abstract class Renderer.');
        }
        this.element = element;
    }

    /**
     * Render method to be implemented by subclasses.
     * @param {BaseScene} scene - The scene to render.
     * @param deltaTime
     * @param tickCount
     * @param totalTime
     */
    render(scene, deltaTime, tickCount, totalTime) {
        throw new Error('Render method must be implemented.');
    }
}
