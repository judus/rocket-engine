import Timer from "./core/Timer.js";
import Engine from "./core/Rocket.js";
import SceneManager from "./core/SceneManager.js";
import DataStoreManager from "./core/DataStoreManager.js";
import InputManager from "./core/InputManager.js";
import EventBus from "./core/EventBus.js";
import GlobalMouse from "./input/GlobalMouse.js";
import ScopedMouse from "./input/ScopedMouse.js";
import InputBindingsManager from "./core/InputBindingManager.js";
import MyInputBindings from "./MyInputBindings.js";
import CompositeRenderer from "./rendering/CompositeRenderer.js";
import CanvasRenderer from "./rendering/CanvasRenderer.js";
import DOMRenderer from "./rendering/DOMRenderer.js";
import FirstScene from "./FirstScene.js";
import SpaceMonkey from "./SpaceMonkey.js";
import SpatialHashGrid2DDataStore from "./datastores/SpatialHashGrid2DDataStore.js";
import ProjectileGrid from "./datastores/ProjectileGrid.js";
import BaseDataStore from "./datastores/BaseDataStore.js";
import ParticleGrid from "./datastores/ParticleGrid.js";
import ProjectilePool from "./datastores/ProjectilePool.js";
import ParticleSystem from "./systems/particles/ParticleSystem.js";
import GameOverScene from "./GameOverScene.js";
import LoadingScreenScene from "./LoadingScreenScene.js";
import CameraECS from "./camera/CameraECS.js";
import ZoomComponent from "./camera/ZoomComponent.js";
import FollowComponent from "./camera/FollowComponent.js";
import TouchComponent from "./camera/TouchComponent.js";
import ShakeComponent from "./camera/ShakeComponent.js";

/**
 * Initializes the game engine with all necessary configurations.
 * @returns {Engine} The initialized game engine instance.
 */
const initializeGameEngine = () => {
    // Retrieve the game container element
    const element = document.getElementById('gameContainer');
    if(!element) {
        throw new Error('Game container element not found');
    }

    const WIDTH = 1920;
    const HEIGHT = 1080;

    // Setup EventBus
    const eventBus = new EventBus();

    // Default data store for the DataStoreManager
    const defaultDataStore = new BaseDataStore(eventBus);

    // Initialize DataStoreManager with default data store
    const dataStoreManager = new DataStoreManager(defaultDataStore);

    // Create and register data stores
    dataStoreManager.create('global');
    dataStoreManager.create('systems');
    dataStoreManager.create('cameras', new BaseDataStore(eventBus));
    dataStoreManager.create('entities', new SpatialHashGrid2DDataStore(eventBus, 100));

    // Initialize the particle system and register it in the global store
    dataStoreManager.create('particles', new ParticleGrid(eventBus, 100));
    const particleSystem = new ParticleSystem(dataStoreManager.getStore('particles'));
    dataStoreManager.getStore('global').set('particleSystem', particleSystem);

    // Initialize the projectile pool and register it in the projectile store
    const projectilePool = new ProjectilePool(100, particleSystem);
    dataStoreManager.create('projectiles', new ProjectileGrid(eventBus, 100, projectilePool));



    // Setup CompositeRenderer with Canvas and DOM renderers
    const compositeRenderer = new CompositeRenderer();
    const canvasRenderer = new CanvasRenderer(element, {width: WIDTH, height: HEIGHT});
    const domRenderer = new DOMRenderer(element);
    compositeRenderer.addRenderer(canvasRenderer);
    compositeRenderer.addRenderer(domRenderer);

    dataStoreManager.getStore('systems').set('domRenderer', domRenderer);
    dataStoreManager.getStore('systems').set('canvasRenderer', canvasRenderer);
    dataStoreManager.getStore('systems').set('sceneManager', new SceneManager());

    const globalMouse = new GlobalMouse();
    const scopedMouse = new ScopedMouse(element, dataStoreManager);
    const myInputBindings = new MyInputBindings(eventBus);

    const camera = new CameraECS(WIDTH, HEIGHT, eventBus);
    camera.addComponent(ZoomComponent);
    camera.addComponent(FollowComponent, 480, 270);
    camera.addComponent(TouchComponent, 100, 500);
    camera.addComponent(ShakeComponent);
    dataStoreManager.create('cameras');
    dataStoreManager.getStore('cameras').set('main', camera);


    // Configure the engine with necessary components
    const engineConfig = {
        container: element,
        timer: new Timer(60, true),
        sceneManager: dataStoreManager.getStore('systems').get('sceneManager'),
        dataStoreManager: dataStoreManager,
        inputManager: new InputManager(eventBus, globalMouse, scopedMouse),
        eventBus: eventBus,
        inputBindingManager: new InputBindingsManager(eventBus, myInputBindings),
        renderer: compositeRenderer,
        renderConfig: {
            width: WIDTH,
            height: HEIGHT,
        }
    };


    // Create the engine instance
    const myGame = new Engine(engineConfig);

    // Add the main application to the game
    const spaceMonkeyApp = new SpaceMonkey({eventBus, dataStoreManager});
    myGame.setApp(spaceMonkeyApp);

    // Setup initial scenes and start the game
    myGame.addScene('loadingScreenScene', LoadingScreenScene);
    myGame.addScene('gameOverScene', GameOverScene);
    myGame.addScene('firstScene', FirstScene);

    myGame.switchScene('firstScene');

    return myGame;
};

/**
 * Runs the game by initializing and starting the game engine.
 */
const runGame = () => {
    const myGame = initializeGameEngine();
    myGame.initialize();
};

// Start the game
runGame();
