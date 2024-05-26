import Rocket from 'engine/src/Rocket.js';


const canvasElement = document.getElementById('canvas');
const inputBindings = {
    getBindings: () => ({
        'ctrl+c': {down: () => console.log('Ctrl+C pressed')},
        'ctrl+v': {down: () => console.log('Ctrl+V pressed')},
        'space': {down: () => console.log('Space pressed'), up: () => console.log('Space released')}
    })
};

const engine = new Rocket({
    disableRenderSystem: false,
    disableDataStoreManager: false,
    disableEventBus: false,
    disableAssetManager: false,
    disableAudioManager: false,
    disableInputManager: false,
    disableInputBindingsManager: false,
    disableSpritesheetManager: false,
    disableEntityManager: false,
    disableGlobalMouse: false,
    disableScopedMouse: false,
    defaultDataStore: {}, // Provide a default data store implementation if needed
    scopedMouseElement: canvasElement,
    inputBindings: inputBindings
});

// Register services
engine.service('timer', new CustomTimerService(60, true));
engine.service('application', new ExampleApplication());
engine.service('renderSystem', new CustomRenderSystem(canvasElement));


const compositeRenderer = new CompositeRenderer();
const canvasRenderer = new CanvasRenderer(element, {width: WIDTH, height: HEIGHT});
const domRenderer = new DOMRenderer(element);
compositeRenderer.addRenderer(canvasRenderer);
compositeRenderer.addRenderer(domRenderer);

engine.service('renderSystem', compositeRenderer);


// Register plugins
engine.plugin('examplePlugin', new ExamplePlugin());

// Initialize Input Manager
const inputManager = engine.service('inputManager');
inputManager.initialize();

// Register Input Bindings
engine.registerInputBindings(inputBindings);

// Load assets
engine.loadImage('hero', 'path/to/hero.png');
engine.loadSound('theme', 'path/to/theme.mp3');
engine.loadJSON('config', 'path/to/config.json');

// Set asset loading handlers
engine.setProgressHandler(progress => console.log(`Progress: ${progress * 100}%`));
engine.setCompleteHandler(() => console.log('All assets loaded'));

// Retrieve assets
const heroImage = engine.getAsset('hero');
const themeSound = engine.getAsset('theme');
const configData = engine.getAsset('config');

// Load audio
engine.loadAudio('backgroundMusic', 'path/to/background.mp3');

// Play audio
engine.playAudio('backgroundMusic', true); // Play in a loop

// Pause audio
engine.pauseAudio('backgroundMusic');

// Stop audio
engine.stopAudio('backgroundMusic');

// Retrieve audio
const backgroundMusic = engine.getAudio('backgroundMusic');

// Load spritesheet
const heroSpritesheet = engine.loadSpritesheet('hero', 'path/to/hero.png', 64, 64);

// Add frames to spritesheet
heroSpritesheet.addFrame(0, 0);
heroSpritesheet.addFrame(64, 0);
heroSpritesheet.addFrame(128, 0);

// Retrieve spritesheet
const retrievedSpritesheet = engine.getSpritesheet('hero');

// Add entities
const parentEntity = new Entity('parent1', 'parentType');
const childEntity = new Entity('child1', 'childType');

const parentHierarchy = new HierarchyComponent();
const childHierarchy = new HierarchyComponent();

parentEntity.addComponent('HierarchyComponent', parentHierarchy);
childEntity.addComponent('HierarchyComponent', childHierarchy);

parentHierarchy.addChild(childEntity);

engine.addEntity(parentEntity, 'parentType');
engine.addEntity(childEntity, 'childType');

// Simulate an update-render loop
const deltaTime = 0.016;
const tick = 1;
const totalTime = 0.016;

parentEntity.update(deltaTime, tick, totalTime);
parentEntity.render(deltaTime, tick, totalTime);

// Retrieve entities
const retrievedParent = engine.getEntity('parent1');
const retrievedChild = engine.getEntity('child1');

console.log(retrievedParent);
console.log(retrievedChild);

// Event Bus Usage Example
engine.on('eventName', data => console.log(data));
engine.emit('eventName', {message: 'Hello, World!'});

engine.init().start();
