import Renderer from "./Renderer.js";
import HtmlHelper from "../utils/HtmlHelpers.js";

export default class CanvasRenderer extends Renderer {
    /**
     * CanvasRenderer constructor.
     * @param {HTMLElement} element - The HTML element to render into.
     * @param dimensions
     * @param canvasId
     */
    constructor(element, dimensions, canvasId = undefined) {
        super(element);
        this.canvas = HtmlHelper.createCanvas(dimensions.width, dimensions.height, canvasId);
        this.element.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');

        this.fadeAlpha = 0;
        this.isFadingOut = false;
        this.isFadingIn = false;
    }

    /**
     * Gets the dimensions of the canvas.
     * @returns {Object} The width and height of the canvas.
     */
    getDimensions() {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    /**
     * Renders the scene using all added renderers.
     * @param {BaseScene} scene - The scene to render.
     * @param deltaTime
     * @param tickCount
     * @param totalTime
     */
    render(scene, deltaTime, tickCount, totalTime) {
        try {
            if(!scene) {
                console.error("No scene to render.");
                return;
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            scene.getLayers().forEach((layer) => {
                if(!layer.lazy || (scene.camera && scene.camera.isMoving())) {
                    layer.render(scene, deltaTime, tickCount, totalTime);
                }
                this.context.drawImage(layer.canvas, 0, 0);
            });

            // Apply fade effect
            if(this.isFadingOut || this.isFadingIn) {
                this.context.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }

        } catch(error) {
            console.error("Error rendering scene in CanvasRenderer:", error);
        }
    }

    /**
     * Starts the fade-out effect.
     * @param {number} duration - The duration of the fade-out in seconds.
     * @param {Function} [callback] - The callback function to execute after fade-out is complete.
     * @returns {Promise} A promise that resolves when the fade-out is complete.
     */
    fadeOut(duration, callback) {
        return new Promise((resolve) => {
            this.isFadingOut = true;
            const fadeStep = 1 / (duration * 60);
            const fade = () => {
                this.fadeAlpha += fadeStep;
                if(this.fadeAlpha >= 1) {
                    this.fadeAlpha = 1;
                    this.isFadingOut = false;
                    if(callback) {
                        callback();
                    }
                    resolve();
                } else {
                    requestAnimationFrame(fade);
                }
            };
            fade();
        });
    }

    /**
     * Starts the fade-in effect.
     * @param {number} duration - The duration of the fade-in in seconds.
     * @returns {Promise} A promise that resolves when the fade-in is complete.
     */
    fadeIn(duration) {
        return new Promise((resolve) => {
            this.isFadingIn = true;
            const fadeStep = 1 / (duration * 60);
            const fade = () => {
                this.fadeAlpha -= fadeStep;
                if(this.fadeAlpha <= 0) {
                    this.fadeAlpha = 0;
                    this.isFadingIn = false;
                    resolve();
                } else {
                    requestAnimationFrame(fade);
                }
            };
            fade();
        });
    }
}
