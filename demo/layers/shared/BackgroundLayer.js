import BaseLayer from "../../../engine/src/scenes/BaseLayer.js";
import P5noise from "../../../engine/src/utils/noise/p5noise.js";
export default class BackgroundLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
        this.starDensity = 0.001; // Number of stars per pixel
        this.noiseScale = 0.0005; // Scale for noise function
        this.brightnessThreshold = 0.8; // Threshold for star brightness
        this.p5noise = new P5noise();
        this.p5noise.noiseSeed(12345); // Set a seed for the noise function
    }

    drawAxis(scene) {
        // Get camera position and zoom level
        const camera = scene.camera;

        const xAxisY = -(camera.pos.y * camera.zoomLevel);
        const yAxisX = -(camera.pos.x * camera.zoomLevel);


        // Draw the x-axis
        this.context.strokeStyle = 'red';
        this.context.beginPath();
        this.context.moveTo(0, xAxisY);
        this.context.lineTo(this.canvas.width, xAxisY);
        this.context.stroke();

        // Draw the y-axis
        this.context.beginPath();
        this.context.moveTo(yAxisX, 0);
        this.context.lineTo(yAxisX, this.canvas.height);
        this.context.stroke();
    }

    render(scene) {
        const camera = scene.camera;

        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawAxis(scene);
    }
}
