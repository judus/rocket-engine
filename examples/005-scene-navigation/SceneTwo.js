import BaseScene from "../../engine/src/scenes/BaseScene.js";

export default class SceneTwo extends BaseScene {
	constructor() {
		super();
		this.x = 0;  // Horizontal position of the square
	}

	update(deltaTime) {
		this.x += 100 * deltaTime;  // Move the square 100 pixels per second
		if(this.x > 600) this.x = 0;  // Reset position when it reaches the right edge
	}

	render(ctx, deltaTime, tickCount, totalTime) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // Clear the canvas
		ctx.fillStyle = '#63774b';  // Dark background color
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // Fill the background

		ctx.fillStyle = 'blue';  // Set the color to red
		ctx.fillRect(this.x, 200, 50, 50);  // Draw the square
	}
}