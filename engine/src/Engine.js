import EngineParts from './EngineParts.js';

export default class Engine {
    constructor(rocket) {
        this.rocket = rocket;
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
            return this.rocket.serviceContainer.get(name);
        } else if(instance === undefined) {
            this.rocket.serviceContainer.remove(name);
        } else {
            const service = this.rocket.serviceContainer.add(name, instance);
            if (this.rocket.isInitialized && typeof service.init === 'function') {
                service.init(this);
            }
        }
    }

    create(name, ...params) {
        return this.rocket.serviceContainer.create(name, ...params);
    }

    plugin(name, instance) {
        if(instance === undefined) {
            return this.rocket.pluginContainer.get(name);
        } else if(instance === null) {
            this.rocket.pluginContainer.remove(name);
        } else {
            this.rocket.pluginContainer.add(name, instance);
        }
    }

    timer() {
        return this.service(EngineParts.TIMER);
    }

    eventBus() {
        return this.service(EngineParts.EVENT_BUS);
    }

    renderSystem() {
        return this.service(EngineParts.RENDER_SYSTEM);
    }

    sceneDirector() {
        return this.service(EngineParts.SCENE_DIRECTOR);
    }

    createSceneManager(...params) {
        return this.create(EngineParts.SCENE_MANAGER, ...params);
    }

    createLayerManager(...params) {
        return this.create(EngineParts.LAYER_MANAGER, ...params);
    }

    createScopedMouse(...params) {
        return this.create(EngineParts.SCOPED_MOUSE, ...params);
    }

    dataStoreManager() {
        return this.service(EngineParts.DATA_STORE_MANAGER);
    }

    assetManager() {
        return this.service(EngineParts.ASSET_MANAGER);
    }

    audioManager() {
        return this.service(EngineParts.AUDIO_MANAGER);
    }

    inputManager() {
        return this.service(EngineParts.INPUT_MANAGER);
    }

    inputBindingsManager() {
        return this.service(EngineParts.INPUT_BINDINGS_MANAGER);
    }

    spriteSheetManager() {
        return this.service(EngineParts.SPRITE_SHEET_MANAGER);
    }

    entityManager() {
        return this.service(EngineParts.ENTITY_MANAGER);
    }

    globalMouse() {
        return this.service(EngineParts.GLOBAL_MOUSE);
    }

    store(name) {
        const dataStoreManager = this.service(EngineParts.DATA_STORE_MANAGER);
        if(!dataStoreManager) {
            console.warn('DataStoreManager is not available');
            return null;
        }

        return dataStoreManager.getStore(name);
    }

    createStore(name, dataStore = null) {
        const dataStoreManager = this.service(EngineParts.DATA_STORE_MANAGER);
        if(!dataStoreManager) {
            console.warn('DataStoreManager is not available');
            return;
        }

        dataStoreManager.create(name, dataStore);
    }

    prune(name) {
        const dataStoreManager = this.service(EngineParts.DATA_STORE_MANAGER);
        if(!dataStoreManager) {
            console.warn('DataStoreManager is not available');
            return;
        }

        dataStoreManager.remove(name);
    }

    on(event, listener) {
        const eventBus = this.service(EngineParts.EVENT_BUS);
        if(!eventBus) {
            console.warn('EventBus is not available');
            return;
        }

        eventBus.on(event, listener);
    }

    off(event, listener) {
        const eventBus = this.service(EngineParts.EVENT_BUS);
        if(!eventBus) {
            console.warn('EventBus is not available');
            return;
        }

        eventBus.off(event, listener);
    }

    emit(event, ...args) {
        const eventBus = this.service(EngineParts.EVENT_BUS);
        if(!eventBus) {
            console.warn('EventBus is not available');
            return;
        }

        eventBus.emit(event, ...args);
    }

    loadImage(key, src) {
        const assetManager = this.service(EngineParts.ASSET_MANAGER);
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.loadImage(key, src);
    }

    loadSound(key, src) {
        const assetManager = this.service(EngineParts.ASSET_MANAGER);
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.loadSound(key, src);
    }

    loadJSON(key, src) {
        const assetManager = this.service(EngineParts.ASSET_MANAGER);
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.loadJSON(key, src);
    }

    getAsset(key) {
        const assetManager = this.service(EngineParts.ASSET_MANAGER);
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return null;
        }
        return assetManager.getAsset(key);
    }

    setProgressHandler(callback) {
        const assetManager = this.service(EngineParts.ASSET_MANAGER);
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.setProgressHandler(callback);
    }

    setCompleteHandler(callback) {
        const assetManager = this.service(EngineParts.ASSET_MANAGER);
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.setCompleteHandler(callback);
    }

    loadAudio(key, src) {
        const audioManager = this.service(EngineParts.AUDIO_MANAGER);
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return;
        }
        audioManager.loadSound(key, src);
    }

    playAudio(key, loop = false) {
        const audioManager = this.service(EngineParts.AUDIO_MANAGER);
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return;
        }
        audioManager.playSound(key, loop);
    }

    pauseAudio(key) {
        const audioManager = this.service(EngineParts.AUDIO_MANAGER);
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return;
        }
        audioManager.pauseSound(key);
    }

    stopAudio(key) {
        const audioManager = this.service(EngineParts.AUDIO_MANAGER);
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return;
        }
        audioManager.stopSound(key);
    }

    getAudio(key) {
        const audioManager = this.service(EngineParts.AUDIO_MANAGER);
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return null;
        }
        return audioManager.getSound(key);
    }

    registerInputBindings(inputBindings) {
        const inputBindingsManager = this.service(EngineParts.INPUT_BINDINGS_MANAGER);
        if(!inputBindingsManager) {
            console.warn('InputBindingsManager is not available');
            return;
        }
        inputBindingsManager.registerInputBindings(inputBindings);
    }

    loadSpritesheet(key, imageUrl, frameWidth, frameHeight) {
        const spritesheetManager = this.service(EngineParts.SPRITE_SHEET_MANAGER);
        if(!spritesheetManager) {
            console.warn('SpriteSheetManager is not available');
            return;
        }
        return spritesheetManager.loadSpritesheet(key, imageUrl, frameWidth, frameHeight);
    }

    getSpritesheet(key) {
        const spritesheetManager = this.service(EngineParts.SPRITE_SHEET_MANAGER);
        if(!spritesheetManager) {
            console.warn('SpriteSheetManager is not available');
            return null;
        }
        return spritesheetManager.getSpritesheet(key);
    }

    addEntity(entity, type) {
        const entityManager = this.service(EngineParts.ENTITY_MANAGER);
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return;
        }
        entityManager.addEntity(entity, type);
    }

    removeEntity(entity) {
        const entityManager = this.service(EngineParts.ENTITY_MANAGER);
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return;
        }
        entityManager.removeEntity(entity);
    }

    getEntity(id) {
        const entityManager = this.service(EngineParts.ENTITY_MANAGER);
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return null;
        }
        return entityManager.getEntity(id);
    }

    getEntitiesByType(type) {
        const entityManager = this.service(EngineParts.ENTITY_MANAGER);
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return null;
        }
        return entityManager.getEntitiesByType(type);
    }

    queryEntitiesInArea(area) {
        const entityManager = this.service(EngineParts.ENTITY_MANAGER);
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return null;
        }
        return entityManager.queryEntitiesInArea(area);
    }

    getEntitiesByProperty(property, value) {
        const entityManager = this.service(EngineParts.ENTITY_MANAGER);
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return null;
        }
        return entityManager.getEntitiesByProperty(property, value);
    }

    /**
     * Adds a scene to the default or specified scene manager.
     * @param {BaseScene} scene - The scene instance.
     * @param {string} [sceneName] - The name of the scene.
     * @param {string} [sceneGroup='main'] - The group of the scene manager.
     * @param {HTMLElement} [container=null] - The html element the canvas should be appended to.
     */
    addScene(scene, sceneName = null, sceneGroup = 'main', container = null) {
        const sceneDirector = this.service(EngineParts.SCENE_DIRECTOR);
        sceneDirector.addScene(scene, sceneName, sceneGroup, container);
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
        const sceneDirector = this.service(EngineParts.SCENE_DIRECTOR);
        return sceneDirector.stack(name, setupCallback, options);
    }

    /**
     * Switches to a specific scene within a scene manager.
     * @param {string} sceneName - The name of the scene to switch to.
     * @param {string} [sceneGroup='main'] - The group of the scene manager.
     */
    switchTo(sceneName, sceneGroup = 'main') {
        const sceneDirector = this.service(EngineParts.SCENE_DIRECTOR);
        if(sceneDirector) {
            const sceneManager = sceneDirector.getSceneManager(sceneGroup);
            if(sceneManager) {
                sceneManager.switchTo(sceneName);
            } else {
                console.error(`SceneManager "${sceneGroup}" not found`);
            }
        } else {
            console.error("SceneDirector not found");
        }
    }

    initService(name) {
        const service = this.service(name);
        if(service && typeof service.init === 'function') {
            service.init(this);
        }
    }
}
