import BaseLayer from "../../../engine/src/scenes/BaseLayer.js";
import P5noise from "../../../engine/src/utils/noise/p5noise.js";
import CustomPhysics2D from "../../../engine/src/physics/CustomPhysics2D.js";

export default class AxisBackground extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
    }

    formatDistance(distanceInMeters) {
        if(distanceInMeters >= 9.461e15) {
            return `${(distanceInMeters / 9.461e15).toFixed(2)} ly`; // Convert to light-years
        } else if(distanceInMeters >= 1.496e11) {
            return `${(distanceInMeters / 1.496e11).toFixed(2)} AU`; // Convert to astronomical units
        } else if(distanceInMeters >= 1e6) {
            return `${(distanceInMeters / 1e6).toFixed(2)} Mm`; // Convert to megameters
        } else if(distanceInMeters >= 1e3) {
            return `${(distanceInMeters / 1e3).toFixed(2)} km`; // Convert to kilometers
        } else {
            return `${distanceInMeters.toFixed(2)} m`; // Keep in meters
        }
    }

    drawGrid(scene) {
        const camera = scene.camera;
        const baseCellSizeMeters = 50; // Base grid size in meters
        const zoomFactor = Math.pow(2, Math.floor(Math.log2(camera.zoomLevel))); // Adjust cell size based on zoom level
        const cellSizeMeters = baseCellSizeMeters / zoomFactor;
        const cellSizePixels = CustomPhysics2D.metersToPixels(cellSizeMeters); // Convert grid size to pixels
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Calculate start positions based on camera position and cell size
        const startX = Math.floor(CustomPhysics2D.pixelsToMeters(camera.pos.x) / cellSizeMeters) * cellSizeMeters;
        const startY = Math.floor(CustomPhysics2D.pixelsToMeters(camera.pos.y) / cellSizeMeters) * cellSizeMeters;

        this.context.strokeStyle = 'rgba(20, 148, 189, 0.05)';
        this.context.fillStyle = 'rgba(20, 148, 189, 0.5)';
        this.context.font = `${12 * camera.zoomLevel}px Arial`;

        for(let x = startX; x <= CustomPhysics2D.pixelsToMeters(camera.pos.x + width) / camera.zoomLevel; x += cellSizeMeters) {
            for(let y = startY; y <= CustomPhysics2D.pixelsToMeters(camera.pos.y + height) / camera.zoomLevel; y += cellSizeMeters) {
                const pixelX = CustomPhysics2D.metersToPixels(x) * camera.zoomLevel - camera.pos.x * camera.zoomLevel;
                const pixelY = CustomPhysics2D.metersToPixels(y) * camera.zoomLevel - camera.pos.y * camera.zoomLevel;

                // Draw vertical grid line
                this.context.beginPath();
                this.context.moveTo(pixelX, 0);
                this.context.lineTo(pixelX, height);
                this.context.stroke();

                // Draw horizontal grid line
                this.context.beginPath();
                this.context.moveTo(0, pixelY);
                this.context.lineTo(width, pixelY);
                this.context.stroke();

                // Display cell position in human-readable units
                const formattedPosX = this.formatDistance(x);
                const formattedPosY = this.formatDistance(y);

                this.context.fillText(`(${formattedPosX}, ${formattedPosY})`, pixelX + 2, pixelY + 12 * camera.zoomLevel);
            }
        }
    }


    drawAxis(scene) {
        // Get camera position and zoom level
        const camera = scene.camera;

        const xAxisY = -(camera.pos.y * camera.zoomLevel);
        const yAxisX = -(camera.pos.x * camera.zoomLevel);

        // Draw the x-axis
        this.context.strokeStyle = 'rgb(105,0,0)';
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
        this.clear();
        this.drawGrid(scene);
        this.drawAxis(scene);
    }
}
