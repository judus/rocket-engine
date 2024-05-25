import SceneManager from "./scenes/SceneManager.js";

export default class EngineApi {
    constructor(engine) {
        this.engine = engine;
    }

    service(name, instance = null) {
        return this.engine.service(name, instance);
    }

    create(name, ...params) {
        return this.engine.serviceContainer.create(name, ...params);
    }

    plugin(name, instance) {
        if(instance === undefined) {
            return this.engine.pluginContainer.get(name);
        } else if(instance === null) {
            this.engine.pluginContainer.remove(name);
        } else {
            this.engine.pluginContainer.add(name, instance);
        }
    }

    store(name) {
        const dataStoreManager = this.engine.service('dataStoreManager');
        if(!dataStoreManager) {
            console.warn('DataStoreManager is not available');
            return null;
        }

        return dataStoreManager.getStore(name);
    }

    createStore(name, dataStore = null) {
        const dataStoreManager = this.engine.service('dataStoreManager');
        if(!dataStoreManager) {
            console.warn('DataStoreManager is not available');
            return;
        }

        dataStoreManager.create(name, dataStore);
    }

    prune(name) {
        const dataStoreManager = this.engine.service('dataStoreManager');
        if(!dataStoreManager) {
            console.warn('DataStoreManager is not available');
            return;
        }

        dataStoreManager.remove(name);
    }

    on(event, listener) {
        const eventBus = this.engine.service('eventBus');
        if(!eventBus) {
            console.warn('EventBus is not available');
            return;
        }

        eventBus.on(event, listener);
    }

    off(event, listener) {
        const eventBus = this.engine.service('eventBus');
        if(!eventBus) {
            console.warn('EventBus is not available');
            return;
        }

        eventBus.off(event, listener);
    }

    emit(event, ...args) {
        const eventBus = this.engine.service('eventBus');
        if(!eventBus) {
            console.warn('EventBus is not available');
            return;
        }

        eventBus.emit(event, ...args);
    }

    loadImage(key, src) {
        const assetManager = this.engine.service('assetManager');
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.loadImage(key, src);
    }

    loadSound(key, src) {
        const assetManager = this.engine.service('assetManager');
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.loadSound(key, src);
    }

    loadJSON(key, src) {
        const assetManager = this.engine.service('assetManager');
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.loadJSON(key, src);
    }

    getAsset(key) {
        const assetManager = this.engine.service('assetManager');
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return null;
        }
        return assetManager.getAsset(key);
    }

    setProgressHandler(callback) {
        const assetManager = this.engine.service('assetManager');
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.setProgressHandler(callback);
    }

    setCompleteHandler(callback) {
        const assetManager = this.engine.service('assetManager');
        if(!assetManager) {
            console.warn('AssetManager is not available');
            return;
        }
        assetManager.setCompleteHandler(callback);
    }

    loadAudio(key, src) {
        const audioManager = this.engine.service('audioManager');
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return;
        }
        audioManager.loadSound(key, src);
    }

    playAudio(key, loop = false) {
        const audioManager = this.engine.service('audioManager');
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return;
        }
        audioManager.playSound(key, loop);
    }

    pauseAudio(key) {
        const audioManager = this.engine.service('audioManager');
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return;
        }
        audioManager.pauseSound(key);
    }

    stopAudio(key) {
        const audioManager = this.engine.service('audioManager');
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return;
        }
        audioManager.stopSound(key);
    }

    getAudio(key) {
        const audioManager = this.engine.service('audioManager');
        if(!audioManager) {
            console.warn('AudioManager is not available');
            return null;
        }
        return audioManager.getSound(key);
    }

    registerInputBindings(inputBindings) {
        const inputBindingsManager = this.engine.service('inputBindingsManager');
        if(!inputBindingsManager) {
            console.warn('InputBindingsManager is not available');
            return;
        }
        inputBindingsManager.registerInputBindings(inputBindings);
    }

    loadSpritesheet(key, imageUrl, frameWidth, frameHeight) {
        const spritesheetManager = this.engine.service('spritesheetManager');
        if(!spritesheetManager) {
            console.warn('SpriteSheetManager is not available');
            return;
        }
        return spritesheetManager.loadSpritesheet(key, imageUrl, frameWidth, frameHeight);
    }

    getSpritesheet(key) {
        const spritesheetManager = this.engine.service('spritesheetManager');
        if(!spritesheetManager) {
            console.warn('SpriteSheetManager is not available');
            return null;
        }
        return spritesheetManager.getSpritesheet(key);
    }

    addEntity(entity, type) {
        const entityManager = this.engine.service('entityManager');
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return;
        }
        entityManager.addEntity(entity, type);
    }

    removeEntity(entity) {
        const entityManager = this.engine.service('entityManager');
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return;
        }
        entityManager.removeEntity(entity);
    }

    getEntity(id) {
        const entityManager = this.engine.service('entityManager');
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return null;
        }
        return entityManager.getEntity(id);
    }

    getEntitiesByType(type) {
        const entityManager = this.engine.service('entityManager');
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return null;
        }
        return entityManager.getEntitiesByType(type);
    }

    queryEntitiesInArea(area) {
        const entityManager = this.engine.service('entityManager');
        if(!entityManager) {
            console.warn('EntityManager is not available');
            return null;
        }
        return entityManager.queryEntitiesInArea(area);
    }

    getEntitiesByProperty(property, value) {
        const entityManager = this.engine.service('entityManager');
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
        const sceneDirector = this.service('sceneDirector');
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
        const sceneDirector = this.service('sceneDirector');
        sceneDirector.stack(name, setupCallback, options);
    }

    /**
     * Switches to a specific scene within a scene manager.
     * @param {string} sceneName - The name of the scene to switch to.
     * @param {string} [sceneGroup='main'] - The group of the scene manager.
     */
    switchScene(sceneName, sceneGroup = 'main') {
        const sceneDirector = this.engine.service('sceneDirector');
        if(sceneDirector) {
            const sceneManager = sceneDirector.getSceneManager(sceneGroup);
            if(sceneManager) {
                sceneManager.switchToScene(sceneName);
            } else {
                console.error(`SceneManager "${sceneGroup}" not found`);
            }
        } else {
            console.error("SceneDirector not found");
        }
    }

    initService(name) {
        const service = this.engine.service(name);
        if(service && typeof service.init === 'function') {
            service.init(this);
        }
    }
}

