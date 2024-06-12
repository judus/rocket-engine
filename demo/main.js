import Rocket from "../engine/src/Rocket.js";
import WorldScene1 from "./scenes/WorldScene1.js";
import WorldScene2 from "./scenes/WorldScene2.js";
import WorldScene3 from "./scenes/WorldScene3.js";
import Cockpit from "./scenes/Cockpit.js";
import Settings from "./scenes/Settings.js";
import Application from "./Application.js";
import EngineParts from "../engine/src/EngineParts.js";
import MyInputBindings from "./inputs/MyInputBindings.js";
import GameOverScene from "./scenes/game-over/GameOverScene.js";

const main = document.getElementById('rocket-main');
const target = document.getElementById('rocket-target');
const minimap = document.getElementById('rocket-minimap');

const rocket = new Rocket({
    targetElement: main,
    showPerformanceMonitor: true,
    inputBindings: new MyInputBindings(),
});

rocket.service('application', new Application());

rocket.stack('world', (stack) => {
    stack.addScene(new WorldScene1());
    // stack.addScene(new GameOverScene());
    // stack.addScene(new WorldScene3());
}, {width: 3840, height: 2160});
//
// rocket.stack('target', (stack) => {
//     stack.addScene(new Cockpit());
// }, {container: target, width: 200, height: 200 });
//
// rocket.stack('minimap', (stack) => {
//     stack.addScene(new Settings());
// }, {container: minimap, width: 200, height: 200});


rocket.launch();