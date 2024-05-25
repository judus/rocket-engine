import EngineBase from "../abstracts/EngineBase.js";

export default class SceneDirector extends EngineBase {
    constructor() {
        super();
        this.sceneManagers = new Map();
    }

    /**
     * Adds a SceneManager instance to the director.
     * @param {string} name - The name of the SceneManager.
     * @param {SceneManager} sceneManager - The SceneManager instance.
     */
    addSceneManager(name, sceneManager) {
        this.sceneManagers.set(name, sceneManager);
    }

    /**
     * Retrieves a SceneManager by name.
     * @param {string} name - The name of the SceneManager.
     * @returns {SceneManager} The SceneManager instance.
     */
    getSceneManager(name) {
        return this.sceneManagers.get(name);
    }

    /**
     * Updates all scenes managed by the SceneManagers.
     * @param {number} deltaTime - The time elapsed since the last update.
     * @param {number} tickCount - The current tick count.
     * @param {number} totalTime - The total elapsed time.
     */
    update(deltaTime, tickCount, totalTime) {
        this.sceneManagers.forEach(sceneManager => {
            sceneManager.updateCurrentScene(deltaTime, tickCount, totalTime);
        });
    }

    /**
     * Renders all scenes managed by the SceneManagers.
     * @param {number} deltaTime - The time elapsed since the last update.
     * @param {number} tickCount - The current tick count.
     * @param {number} totalTime - The total elapsed time.
     */
    render(deltaTime, tickCount, totalTime) {
        this.sceneManagers.forEach(sceneManager => {
            sceneManager.renderCurrentScene(deltaTime, tickCount, totalTime);
        });
    }

    /**
     * Adds a scene to the default or specified scene manager.
     * @param {BaseScene} scene - The scene instance.
     * @param {string} [sceneName] - The name of the scene.
     * @param {string} [sceneGroup='main'] - The group of the scene manager.
     * @param {HTMLElement} [container=null] - The html element the canvas should be appended to.
     */
    addScene(scene, sceneName = null, sceneGroup = 'main', container = null) {
        console.log('Adding scene', scene.constructor.name, 'to stack', sceneGroup);

        let sceneManager = this.getSceneManager(sceneGroup);
        if(!sceneManager) {
            // Create the SceneManager using the factory method
            const engine = this.engine;
            const width = engine.engine.config.defaultSceneWidth;
            const height = engine.engine.config.defaultSceneHeight;

            container = container || engine.config.targetElement;
            const renderer = this.engine.create('defaultRenderer', container, {width, height}, sceneGroup);

            sceneManager = this.engine.create('sceneManager', renderer, width, height);
            this.addSceneManager(sceneGroup, sceneManager);
            engine.service(sceneGroup, sceneManager);
            engine.initService(sceneGroup);
        }

        // Set the scene dimensions
        scene.setDimensions(sceneManager.width, sceneManager.height);

        // Create the LayerManager from the container and set it on the scene
        const layerManager = this.engine.create('layerManager', sceneManager.width, sceneManager.height);
        scene.setLayerManager(layerManager);

        sceneManager.addScene(sceneName || scene.constructor.name, scene);

        // Set the current scene if not already set
        if(!sceneManager.getCurrentScene()) {
            sceneManager.switchToScene(sceneName || scene.constructor.name);
        }
    }

    /**
     * Sets up scenes with specific configuration.
     * @param {string} name - The name of the scene manager.
     * @param {Function} setupCallback - The setup callback function.
     * @param {Object} [options] - Optional parameters.
     * @param {Renderer} [options.renderer=null] - The renderer for the scene manager.
     * @param {number} [options.width] - The width of the scene.
     * @param {number} [options.height] - The height of the scene.
     * @param {HTMLElement} [options.container=null] - The html element the canvas should be appended to.
     */
    stack(name, setupCallback, options = {}) {
        const sceneGroup = name;
        const engine = this.engine;
        const container = options.container || engine.engine.config.targetElement;
        const width = options.width || engine.engine.config.defaultSceneWidth;
        const height = options.height || engine.engine.config.defaultSceneHeight;

        const renderer = options.renderer || this.engine.create('defaultRenderer', container, {
            width,
            height
        }, sceneGroup);

        let sceneManager = this.getSceneManager(sceneGroup);
        if(!sceneManager) {
            // Create the SceneManager using the factory method
            sceneManager = this.engine.create('sceneManager', renderer, width, height);
            this.addSceneManager(sceneGroup, sceneManager);
            engine.service(sceneGroup, sceneManager);
            engine.initService(sceneGroup);
        }

        const stackApi = {
            addScene: (scene, sceneName = null) => {
                this.addScene(scene, sceneName, sceneGroup);
            }
        };

        setupCallback(stackApi);
    }

    /**
     * Switches to a specific scene within a scene manager.
     * @param {string} sceneName - The name of the scene to switch to.
     * @param {string} [sceneGroup='main'] - The group of the scene manager.
     */
    switchScene(sceneName, sceneGroup = 'main') {
        const sceneManager = this.getSceneManager(sceneGroup);
        if(sceneManager) {
            sceneManager.switchToScene(sceneName);
        } else {
            console.error(`SceneManager "${sceneGroup}" not found`);
        }
    }
}
