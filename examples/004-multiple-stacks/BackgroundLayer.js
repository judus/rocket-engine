import BaseLayer from "../../engine/src/scenes/BaseLayer.js";

export default class BackgroundLayer extends BaseLayer {
	constructor(canvas, context) {
		super(canvas, context);
		this.dots = this.createDots();
	}

	createDots() {
		const dots = [];
		for(let i = 0; i < 100; i++) {
			dots.push({
				x: Math.random() * this.context.canvas.width,
				y: Math.random() * this.context.canvas.height,
				color: `hsl(${Math.random() * 360}, 100%, 50%)`
			});
		}
		return dots;
	}

	render(scene, deltaTime, tickCount, totalTime) {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);  // Clear the canvas
		this.context.fillStyle = '#222';  // Dark background color
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);  // Fill the background

		// Draw each dot at its static position
		this.dots.forEach(dot => {
			this.context.fillStyle = dot.color;
			this.context.beginPath();
			this.context.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
			this.context.fill();
		});
	}
}
