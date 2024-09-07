import Rocket from "../../engine/src/Rocket.js";  // Import the Rocket engine
import SimpleAnimationWithLayers from "./SimpleAnimationWithLayers.js";  // Import the new SimpleAnimationScene with layers

// Initialize the Rocket engine
const rocket = new Rocket({
	targetElement: document.getElementById('my-container')  // The HTML element to attach the canvas
});

// Define the stack and add the simple animation scene
rocket.stack('simple-animation-with-layers', (stack) => {
	stack.addScene(new SimpleAnimationWithLayers());
}, {width: 600, height: 400});

// Launch the engine to start the animation
rocket.launch();
