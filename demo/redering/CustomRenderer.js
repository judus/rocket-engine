export default class CustomRenderSystem extends RenderSystem {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    render(deltaTime, tickCount, currentTime) {
        console.log("Rendering...");
        // Render logic using canvas context
    }
}