import BaseLayer from "../../engine/src/scenes/BaseLayer.js";

export default class ForegroundLayer extends BaseLayer {
	render(scene, deltaTime, tickCount, totalTime) {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);  // Clear the canvas
		this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';  // Semi-transparent red
		this.context.fillRect(scene.x, 100, 50, 50);  // Draw the moving square
	}
}