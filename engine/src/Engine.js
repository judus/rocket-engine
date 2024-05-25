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

import EngineApi from "./EngineApi.js";
import BaseContainer from "./abstracts/BaseContainer.js";
import BaseDataStore from "./datastores/BaseDataStore.js";
import EngineInit from "./EngineInit.js";
import CanvasRenderer from "./rendering/CanvasRenderer.js";

/**
 * Engine class to initialize and manage various services.
 */
export default class Engine {
    constructor(config) {
        this.config = this.defaultConfig(config);
        this.serviceContainer = new BaseContainer();
        this.pluginContainer = new BaseContainer();
        this.engineApi = new EngineApi(this);

        (new EngineInit(this)).initializeServices();
        this.serviceContainer.initAll(this.engineApi);
        this.pluginContainer.initAll(this.engineApi);
    }

    /**
     * Sets the default configuration values and merges with provided config.
     * @param {Object} config - Custom configuration object.
     * @returns {Object} Merged configuration object.
     */
    defaultConfig(config) {
        return {
            fps: 60,
            targetElement: document.body,
            inputBindings: null,
            showPerformanceMonitor: false,
            defaultSceneWidth: 1024,
            defaultSceneHeight: 768,
            defaultRenderer: CanvasRenderer,
            disableSceneDirector: false,
            disableSceneManager: false,
            disableRenderSystem: false,
            disableDataStoreManager: false,
            disableEventBus: false,
            disableAssetManager: false,
            disableAudioManager: false,
            disableInputManager: false,
            disableInputBindingsManager: false,
            disableSpriteSheetManager: false,
            disableEntityManager: false,
            disableGlobalMouse: false,
            disableScopedMouse: false,
            disableLayerManager: false,
            defaultDataStore: BaseDataStore,
            ...config
        };
    }

    /**
     * Manages services within the engine.
     * @template {keyof Services} T
     * @param {T} name - The name of the service.
     * @param {Services[T]} [instance=null] - The service instance.
     * @returns {Services[T]} The requested service.
     */
    service(name, instance = null) {
        if(instance === null) {
            return this.serviceContainer.get(name);
        } else if(instance === undefined) {
            this.serviceContainer.remove(name);
        } else {
            this.serviceContainer.add(name, instance);
        }
    }

    /**
     * Starts the engine, setting up the update and render callbacks.
     */
    start() {
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
            updateCallback = (deltaTime, tickCount, totalTime) => {
                try {
                    if(shouldUpdateApp) application.update(deltaTime);
                    if(sceneDirector) sceneDirector.update(deltaTime, tickCount, totalTime);
                } catch(error) {
                    console.error("Update error:", error);
                }
            };
        }

        if(renderSystem && (sceneDirector || shouldRenderApp)) {
            console.log(`Rendering with ${sceneDirector ? 'SceneDirector' : 'Application'}`);

            renderCallback = (deltaTime, tickCount, totalTime) => {
                try {
                    if(shouldRenderApp) application.render(deltaTime);
                    if(sceneDirector) sceneDirector.render(deltaTime, tickCount, totalTime);
                } catch(error) {
                    console.error("Render error:", error);
                }
            };
        }

        const timer = this.service('timer');
        timer.start(updateCallback, renderCallback);
    }

    /**
     * Stops the engine by stopping the timer.
     */
    stop() {
        const timer = this.service('timer');
        timer.stop();
    }


    // Explicit method definitions
    stack(name, setupCallback, options = {}) {
        return this.engineApi.stack(name, setupCallback, options);
    }

    addScene(scene, sceneName = null, sceneGroup = 'main', container = null) {
        return this.engineApi.addScene(scene, sceneName, sceneGroup, container);
    }

    switchScene(sceneName, sceneGroup = 'main') {
        return this.engineApi.switchScene(sceneName, sceneGroup);
    }

    create(name, ...params) {
        return this.engineApi.create(name, ...params);
    }

    plugin(name, instance) {
        return this.engineApi.plugin(name, instance);
    }

    store(name) {
        return this.engineApi.store(name);
    }

    createStore(name, dataStore = null) {
        return this.engineApi.createStore(name, dataStore);
    }

    prune(name) {
        return this.engineApi.prune(name);
    }

    on(event, listener) {
        return this.engineApi.on(event, listener);
    }

    off(event, listener) {
        return this.engineApi.off(event, listener);
    }

    emit(event, ...args) {
        return this.engineApi.emit(event, ...args);
    }

    loadImage(key, src) {
        return this.engineApi.loadImage(key, src);
    }

    loadSound(key, src) {
        return this.engineApi.loadSound(key, src);
    }

    loadJSON(key, src) {
        return this.engineApi.loadJSON(key, src);
    }

    getAsset(key) {
        return this.engineApi.getAsset(key);
    }

    setProgressHandler(callback) {
        return this.engineApi.setProgressHandler(callback);
    }

    setCompleteHandler(callback) {
        return this.engineApi.setCompleteHandler(callback);
    }

    loadAudio(key, src) {
        return this.engineApi.loadAudio(key, src);
    }

    playAudio(key, loop = false) {
        return this.engineApi.playAudio(key, loop);
    }

    pauseAudio(key) {
        return this.engineApi.pauseAudio(key);
    }

    stopAudio(key) {
        return this.engineApi.stopAudio(key);
    }

    getAudio(key) {
        return this.engineApi.getAudio(key);
    }

    registerInputBindings(inputBindings) {
        return this.engineApi.registerInputBindings(inputBindings);
    }

    loadSpritesheet(key, imageUrl, frameWidth, frameHeight) {
        return this.engineApi.loadSpritesheet(key, imageUrl, frameWidth, frameHeight);
    }

    getSpritesheet(key) {
        return this.engineApi.getSpritesheet(key);
    }

    addEntity(entity, type) {
        return this.engineApi.addEntity(entity, type);
    }

    removeEntity(entity) {
        return this.engineApi.removeEntity(entity);
    }

    getEntity(id) {
        return this.engineApi.getEntity(id);
    }

    getEntitiesByType(type) {
        return this.engineApi.getEntitiesByType(type);
    }

    queryEntitiesInArea(area) {
        return this.engineApi.queryEntitiesInArea(area);
    }

    getEntitiesByProperty(property, value) {
        return this.engineApi.getEntitiesByProperty(property, value);
    }

    initService(name) {
        return this.engineApi.initService(name);
    }
}
