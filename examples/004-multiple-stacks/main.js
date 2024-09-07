import Rocket from "../../engine/src/Rocket.js";  // Import the Rocket engine
import SimpleAnimationWithLayers from "./SimpleAnimationWithLayers.js";  // Import the new SimpleAnimationScene with layers

// Initialize the Rocket engine
const rocket = new Rocket({
	targetElement: document.getElementById('my-container')  // The HTML element to attach the canvas
});

// Define the stack and add the simple animation scene
rocket.stack('stack1', (stack) => {
	stack.addScene(new SimpleAnimationWithLayers());
}, {width: 600, height: 400});

rocket.stack('stack2', (stack) => {
	stack.addScene({
		x: 0,  // Horizontal position of the square

		update(deltaTime) {
			this.x += 100 * deltaTime;  // Move the square 100 pixels per second
			if(this.x > 600) this.x = 0;  // Reset position when it reaches the right edge
		},

		render(ctx, deltaTime, tickCount, totalTime) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // Clear the canvas
			ctx.fillStyle = 'blue';  // Set the color to blue
			ctx.fillRect(this.x, 100, 50, 50);  // Draw the square
		}
	});  // Add the plain object scene
}, {width: 600, height: 400});

rocket.stack('stack3', (stack) => {
	stack.addScene({
		x: 0,  // Horizontal position of the square

		update(deltaTime) {
			this.x += 100 * deltaTime;  // Move the square 100 pixels per second
			if(this.x > 600) this.x = 0;  // Reset position when it reaches the right edge
		},

		render(ctx, deltaTime, tickCount, totalTime) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // Clear the canvas
			ctx.fillStyle = 'green';  // Set the color to blue
			ctx.fillRect(this.x, 100, 50, 50);  // Draw the square
		}
	});  // Add the plain object scene
}, {width: 600, height: 400});

// Launch the engine to start the animation
rocket.launch();
