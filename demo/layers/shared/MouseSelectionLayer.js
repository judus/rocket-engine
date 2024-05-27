import BaseLayer from "../../../engine/src/scenes/BaseLayer.js";

/**
 * MouseSelectionLayer is responsible for drawing the selection area on the canvas.
 */
export default class MouseSelectionLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
        this.selectionStart = null;
        this.selectionEnd = null;
    }

    /**
     * Sets the selection area.
     * @param {Area} area - The selection area.
     */
    setSelectionArea(area) {
        this.selectionStart = {x: area.x1, y: area.y1};
        this.selectionEnd = {x: area.x2, y: area.y2};
    }

    /**
     * Clears the selection area.
     */
    clearSelection() {
        this.selectionStart = null;
        this.selectionEnd = null;
    }

    /**
     * Renders the selection area.
     * @param {Object} scene - The current scene.
     */
    render(scene) {
        this.clear();
        if(this.selectionStart && this.selectionEnd) {
            const camera = scene.camera;
            const zoomLevel = camera.zoomLevel;
            const cameraPos = camera.pos;
            const x = (Math.min(this.selectionStart.x, this.selectionEnd.x) - cameraPos.x) * zoomLevel;
            const y = (Math.min(this.selectionStart.y, this.selectionEnd.y) - cameraPos.y) * zoomLevel;
            const width = Math.abs(this.selectionStart.x - this.selectionEnd.x) * zoomLevel;
            const height = Math.abs(this.selectionStart.y - this.selectionEnd.y) * zoomLevel;

            this.context.strokeStyle = 'rgba(0, 255, 0, 0.5)';
            this.context.lineWidth = 2;
            this.context.strokeRect(x, y, width, height);
        }
    }
}
