import BaseScene from "../../engine/src/scenes/BaseScene.js";
import BackgroundLayer from "./BackgroundLayer.js";
import ForegroundLayer from "./ForegroundLayer.js";

export default class SimpleAnimationWithLayers extends BaseScene {
	constructor() {
		super();
		this.x = 0;  // Horizontal position of the square
	}

	init(engine) {
		super.init(engine);
		// Add the BackgroundLayer and ForegroundLayer to the LayerManager
		this.addLayer('backgroundLayer', BackgroundLayer);
		this.addLayer('foregroundLayer', ForegroundLayer);
	}

	update(deltaTime) {
		this.x += 100 * deltaTime;  // Move the square 100 pixels per second
		if(this.x > 600) this.x = 0;  // Reset position when it reaches the right edge
	}
}
