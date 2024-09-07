import SimpleAnimation from "./SimpleAnimation.js";
import Rocket from "../../engine/src/Rocket.js";  // Import the simple animation scene

// Initialize the Rocket engine
const rocket = new Rocket({
	targetElement: document.getElementById('my-container') // The HTML element to attach the canvas
});

// Define the stack and add the simple animation scene
rocket.stack('stack1', (stack) => {
	stack.addScene(new SimpleAnimation());
}, {width: 600, height: 400});

// Launch the engine to start the animation
rocket.launch();