import BaseLayer from "../../../engine/src/scenes/BaseLayer.js";
import P5noise from "../../../engine/src/utils/noise/p5noise.js";

export default class AxisBackground extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
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
        this.clear()
        this.drawAxis(scene);
    }
}
