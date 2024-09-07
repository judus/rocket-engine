/**
 * @typedef {import('./timer/Timer').default} Timer
 * @typedef {import('./events/EventBus').default} EventBus
 * @typedef {import('./entities/BaseEntity').default} BaseEntity
 * @typedef {import('./rendering/CompositeRenderer').default} RenderSystem
 * @typedef {import('./scenes/SceneDirector').default} SceneDirector
 */

/**
 * @typedef {Object} Services
 * @property {Timer} timer
 * @property {EventBus} eventBus
 * @property {BaseEntity} application
 * @property {CompositeRenderer} renderSystem
 * @property {SceneDirector} sceneDirector
 */

import Engine from "./Engine.js";
import EngineParts from "./EngineParts.js";
import EngineInit from "./EngineInit.js";
import BaseContainer from "./abstracts/BaseContainer.js";
import CameraManager from "./cameras/CameraManager.js";
import BaseDataStore from "./datastores/BaseDataStore.js";
import CanvasRenderer from "./rendering/CanvasRenderer.js";
import Config from "./services/Config.js";
import defaults from "./defaults.js";

export default class Rocket {
    constructor(config) {
        this.config = new Config(config, defaults);
        this.serviceContainer = new BaseContainer();
        this.pluginContainer = new BaseContainer();
        this.engine = new Engine(this);
        this.engine.config = this.config;

        EngineParts.worldScale(12, 1080);

        (new EngineInit()).initializeServices(this.engine);
        this.serviceContainer.initAll(this.engine);
        this.pluginContainer.initAll(this.engine);

        this.isInitialized = true;
        this.loadCallbacks = [];
    }

    /**
     * Sets the default configuration values and merges with provided config.
     * @param {Object} config - Custom configuration object.
     * @returns {Object} Merged configuration object.
     */
    defaultConfig(config) {
        return {
            fps: 60,
            showPerformanceMonitor: false,

            targetElement: document.body,

            inputBindings: null,

            defaultSceneWidth: 1024,
            defaultSceneHeight: 768,

            defaultRenderer: CanvasRenderer,
            defaultDataStore: BaseDataStore,

            disableEventBus: false,
            disableSceneDirector: false,
            disableSceneManager: false,
            disableRenderSystem: false,
            disableDataStoreManager: false,
            disableAssetManager: false,
            disableAudioManager: false,
            disableInputManager: false,
            disableInputBindingsManager: false,
            disableSpriteSheetManager: false,
            disableEntityManager: false,
            disableGlobalMouse: false,
            disableScopedMouse: false,
            disableLayerManager: false,
            disableCameraManager: false,
            ...config
        };
    }

    /**
     * Register a callback to be called during the loading phase.
     * @param {Function} callback - The callback function to register.
     */
    onLoad(callback) {
        this.loadCallbacks.push(callback);
    }

    async loadResources() {
        // Call registered onLoad callbacks
        for(const callback of this.loadCallbacks) {
            await callback(this.engine);
        }

        // Call application onLoad if exists
        const application = this.service('application');
        if(application && typeof application.onLoad === 'function') {
            console.log('Loading application resources...');
            await application.onLoad();
        }
    }

    /**
     * Manages services within the engine.
     * @template {keyof Services} T
     * @param {T} name - The name of the service.
     * @param {Services[T]} [instance=null] - The service instance.
     * @returns {Services[T]} The requested service.
     */

    /**
     * Starts the engine, setting up the update and render callbacks.
     */
    async start() {
        // All services should be initialized by now
        console.log("✅ Rocket Engine: All systems initialized...");

        // console.log("🔄 Rocket Engine: Initializing input manager...");
        this.inputManager().init(this.engine);
        // console.log("✅ Rocket Engine: Input manager initialized...");

        // Load application resources asynchronously
        console.log("🔄 Rocket Engine: Commencing resource loading...");
        await this.loadResources();
        console.log("✅ Rocket Engine: Resource loading complete...");

        // Set up the update and render callbacks
        console.log("🔄 Rocket Engine: Setting up update and render callbacks...");

        let updateCallback = () => {
        };
        let renderCallback = () => {
        };

        const renderSystem = this.service('renderSystem');
        const sceneDirector = this.service('sceneDirector');
        const application = this.service('application');

        // Check if the application has update and render methods
        const shouldUpdateApp = application && typeof application.update === 'function';
        const shouldRenderApp = application && typeof application.render === 'function';

        if(shouldUpdateApp || sceneDirector) {
            console.log(`🔄 Rocket Engine: Updating with ${sceneDirector ? 'SceneDirector' : 'Application'}...`);

            updateCallback = (deltaTime, tickCount, totalTime) => {
                try {
                    if(shouldUpdateApp) application.update(deltaTime);
                    if(sceneDirector) sceneDirector.update(deltaTime, tickCount, totalTime);
                } catch(error) {
                    console.error("❌ Rocket Engine: Update error:", error);
                }
            };
        }

        if(renderSystem && (sceneDirector || shouldRenderApp)) {
            console.log(`🔄 Rocket Engine: Rendering with ${sceneDirector ? 'SceneDirector' : 'Application'}...`);

            renderCallback = (deltaTime, tickCount, totalTime) => {
                try {
                    if(shouldRenderApp) application.render(deltaTime);
                    if(sceneDirector) sceneDirector.render(deltaTime, tickCount, totalTime);
                } catch(error) {
                    console.error("❌ Rocket Engine: Render error:", error);
                }
            };
        }

        // Load the first scene
        if(sceneDirector) {
            console.log("✅ Rocket Engine: Setting course for first scene...");
            sceneDirector.loadFirstScene();
        }

        console.log("🚀 Rocket Engine: Launching...");
        const timer = this.service('timer');
        timer.start(updateCallback, renderCallback);


        // Return a resolved promise to satisfy the IDE warning
        return Promise.resolve();
    }

    launch() {
        this.start().then(() => {
            console.log("✅ Rocket Engine: All system nominal, congratulation!");
        }).catch(error => {
            console.error("Error starting Rocket:", error);
        });
    }


    /**
     * Stops the engine by stopping the timer.
     */
    stop() {
        const timer = this.service('timer');
        timer.stop();
    }

    /* ######## ACCESS ENGINE PARTS ######## */
    timer() {
        return this.engine.timer();
    }

    eventBus() {
        return this.engine.eventBus();
    }

    renderSystem() {
        return this.engine.renderSystem();
    }

    sceneDirector() {
        return this.engine.sceneDirector();
    }

    createSceneManager(...params) {
        return this.engine.createSceneManager(...params);
    }

    createLayerManager(...params) {
        return this.engine.createLayerManager(...params);
    }

    createScopedMouse(...params) {
        return this.engine.createScopedMouse(...params);
    }

    dataStoreManager() {
        return this.engine.dataStoreManager();
    }

    assetManager() {
        return this.engine.assetManager();
    }

    audioManager() {
        return this.engine.audioManager();
    }

    inputManager() {
        return this.engine.inputManager();
    }

    inputBindingsManager() {
        return this.engine.inputBindingsManager();
    }

    spriteSheetManager() {
        return this.engine.spriteSheetManager();
    }

    entityManager() {
        return this.engine.entityManager();
    }

    globalMouse() {
        return this.engine.globalMouse();
    }

    /* ######## GENERAL API ######## */
    service(name, instance = null) {
        return this.engine.service(name, instance);
    }

    stack(name, setupCallback, options = {}) {
        return this.engine.stack(name, setupCallback, options);
    }

    addScene(scene, sceneName = null, sceneGroup = 'main', container = null) {
        return this.engine.addScene(scene, sceneName, sceneGroup, container);
    }

    switchTo(sceneName, sceneGroup = 'main') {
        return this.engine.switchTo(sceneName, sceneGroup);
    }

    create(name, ...params) {
        return this.engine.create(name, ...params);
    }

    plugin(name, instance) {
        return this.engine.plugin(name, instance);
    }

    store(name) {
        return this.engine.store(name);
    }

    createStore(name, dataStore = null) {
        return this.engine.createStore(name, dataStore);
    }

    prune(name) {
        return this.engine.prune(name);
    }

    on(event, listener) {
        return this.engine.on(event, listener);
    }

    off(event, listener) {
        return this.engine.off(event, listener);
    }

    emit(event, ...args) {
        return this.engine.emit(event, ...args);
    }

    loadImage(key, src) {
        return this.engine.loadImage(key, src);
    }

    loadSound(key, src) {
        return this.engine.loadSound(key, src);
    }

    loadJSON(key, src) {
        return this.engine.loadJSON(key, src);
    }

    getAsset(key) {
        return this.engine.getAsset(key);
    }

    setProgressHandler(callback) {
        return this.engine.setProgressHandler(callback);
    }

    setCompleteHandler(callback) {
        return this.engine.setCompleteHandler(callback);
    }

    loadAudio(key, src) {
        return this.engine.loadAudio(key, src);
    }

    playAudio(key, loop = false) {
        return this.engine.playAudio(key, loop);
    }

    pauseAudio(key) {
        return this.engine.pauseAudio(key);
    }

    stopAudio(key) {
        return this.engine.stopAudio(key);
    }

    getAudio(key) {
        return this.engine.getAudio(key);
    }

    registerInputBindings(inputBindings) {
        return this.engine.registerInputBindings(inputBindings);
    }

    loadSpritesheet(key, imageUrl, frameWidth, frameHeight) {
        return this.engine.loadSpritesheet(key, imageUrl, frameWidth, frameHeight);
    }

    getSpritesheet(key) {
        return this.engine.getSpritesheet(key);
    }

    addEntity(entity, type) {
        return this.engine.addEntity(entity, type);
    }

    removeEntity(entity) {
        return this.engine.removeEntity(entity);
    }

    getEntity(id) {
        return this.engine.getEntity(id);
    }

    getEntitiesByType(type) {
        return this.engine.getEntitiesByType(type);
    }

    queryEntitiesInArea(area) {
        return this.engine.queryEntitiesInArea(area);
    }

    getEntitiesByProperty(property, value) {
        return this.engine.getEntitiesByProperty(property, value);
    }

    initService(name) {
        return this.engine.initService(name);
    }

    sceneManager(stackName) {
        return this.engine.sceneManager(stackName);
    }
}
