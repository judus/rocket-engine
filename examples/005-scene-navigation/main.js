import Rocket from "../../engine/src/Rocket.js";  // Import the Rocket engine
import SceneOne from "./SceneOne.js";  // Scene One
import SceneTwo from "./SceneTwo.js";  // Scene Two
import SceneThree from "./SceneThree.js";  // Scene Three

// Initialize the Rocket engine
const rocket = new Rocket({
	targetElement: document.getElementById('my-container')  // The HTML element to attach the canvas
});

// Add scenes to a stack
rocket.stack('my-animation', (stack) => {
	stack.addScene(new SceneOne());
	stack.addScene(new SceneTwo());
	stack.addScene(new SceneThree());
}, {width: 600, height: 400});

// Launch the engine
rocket.launch();

// Handle button clicks for next/previous scene
document.getElementById('prevScene').addEventListener('click', () => {
	rocket.sceneManager('my-animation').previous();
});

document.getElementById('nextScene').addEventListener('click', () => {
	rocket.sceneManager('my-animation').next();
});
