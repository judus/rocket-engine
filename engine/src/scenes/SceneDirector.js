import EngineBase from "../abstracts/EngineBase.js";

export default class SceneDirector extends EngineBase {
    constructor() {
        super();
        this.sceneManagers = new Map();
    }

    addSceneManager(name, sceneManager) {
        this.sceneManagers.set(name, sceneManager);
    }

    getSceneManager(name) {
        return this.sceneManagers.get(name);
    }

    update(deltaTime, tickCount, totalTime) {
        this.sceneManagers.forEach(sceneManager => {
            sceneManager.updateCurrentScene(deltaTime, tickCount, totalTime);
        });
    }

    render(deltaTime, tickCount, totalTime) {
        this.sceneManagers.forEach(sceneManager => {
            sceneManager.renderCurrentScene(deltaTime, tickCount, totalTime);
        });
    }

    addScene(scene, sceneName = null, stack = 'main', container = null) {
        let sceneManager = this.getSceneManager(stack);
        if(!sceneManager) {
            sceneManager = this.createSceneManager(stack, container);
        }

        this.setupScene(scene, sceneManager, sceneName);

        if(!sceneManager.getCurrentScene()) {
            //sceneManager.first();
        }
    }

    stack(name, setupCallback, options = {}) {
        const stack = name;
        const engine = this.engine;
        const container = options.container || engine.config.targetElement;
        const width = options.width || engine.config.defaultSceneWidth;
        const height = options.height || engine.config.defaultSceneHeight;

        const renderer = options.renderer || this.engine.create('defaultRenderer', container, {
            width,
            height
        }, stack);

        let sceneManager = this.getSceneManager(stack);
        if(!sceneManager) {
            sceneManager = this.createSceneManager(stack, container, width, height, renderer);
        }

        const stackApi = {
            addScene: (scene, sceneName = null) => {
                this.addScene(scene, sceneName, stack, container);
            }
        };

        setupCallback(stackApi);

        return sceneManager; // Return the created sceneManager
    }

    switchTo(sceneName, stack = 'main') {
        const sceneManager = this.getSceneManager(stack);
        if(sceneManager) {
            sceneManager.switchTo(sceneName);
        } else {
            console.error(`SceneManager "${stack}" not found`);
        }
    }

    createSceneManager(stack, container, width = null, height = null, renderer = null) {
        const engine = this.engine;

        width = width || engine.config.defaultSceneWidth;
        height = height || engine.config.defaultSceneHeight;
        container = container || engine.config.targetElement;

        renderer = renderer || this.engine.create('defaultRenderer', container, {width, height}, stack);
        const sceneManager = this.engine.create('sceneManager', renderer, width, height);
        this.addSceneManager(stack, sceneManager);
        engine.service(stack, sceneManager);
        engine.initService(stack);

        return sceneManager;
    }

    setupScene(scene, sceneManager, sceneName = null) {
        scene.setDimensions(sceneManager.width, sceneManager.height);

        const layerManager = this.engine.create('layerManager', sceneManager.width, sceneManager.height);
        scene.setLayerManager(layerManager);

        const cameraManager = this.engine.create('cameraManager');
        scene.setCameraManager(cameraManager);

        sceneManager.addScene(sceneName || scene.constructor.name, scene);
    }

    loadFirstScene() {
        this.sceneManagers.forEach(sceneManager => {
            sceneManager.first();
        });
    }
}
