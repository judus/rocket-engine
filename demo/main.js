import Engine from "../engine/src/Engine.js";
import WorldScene1 from "./scenes/WorldScene1.js";
import WorldScene2 from "./scenes/WorldScene2.js";
import WorldScene3 from "./scenes/WorldScene3.js";
import Cockpit from "./scenes/Cockpit.js";
import Settings from "./scenes/Settings.js";
import Application from "./Application.js";

const main = document.getElementById('engine-main');
const world = document.getElementById('engine-world');
const cockpit = document.getElementById('engine-cockpit');

const engine = new Engine({
    targetElement: main,
    showPerformanceMonitor: true,
});

engine.service('application', new Application(
    engine.service('eventBus'),
    engine.service('dataStoreManager')
));

engine.stack('world', (engine) => {
   engine.addScene(new WorldScene1());
   // engine.addScene(new WorldScene2());
   // engine.addScene(new WorldScene3());
}, {container: world, width: 1920, height: 1080});
//
engine.stack('cockpit', (engine) => {
    engine.addScene(new Cockpit());
}, {container: cockpit, width: 200, height: 200 });

engine.stack('settings', (engine) => {
    engine.addScene(new Settings());
}, {container: cockpit, width: 200, height: 200});

engine.start();