import Timer from "./timer/Timer.js";
import EventBus from "./events/EventBus.js";
import DataStoreManager from "./datastores/DataStoreManager.js";
import AssetManager from "./assets/AssetManager.js";
import AudioManager from "./audio/AudioManager.js";
import InputManager from "./inputs/InputManager.js";
import InputBindingsManager from "./inputs/InputBindingManager.js";
import SpriteSheetManager from "./sprites/SpriteSheetManager.js";
import EntityManager from "./entities/EntityManager.js";
import GlobalMouse from "./inputs/GlobalMouse.js";
import ScopedMouse from "./inputs/ScopedMouse.js";
import SceneManager from "./scenes/SceneManager.js";
import SceneDirector from "./scenes/SceneDirector.js";
import CompositeRenderer from "./rendering/CompositeRenderer.js";
import LayerManager from "./scenes/LayerManager.js";

export default class EngineInit {
    constructor(engine) {
        this.engine = engine;
    }

    initializeServices() {
        this.service('timer', this.service('timer') || this.defaultTimer());
        this.service('defaultRenderer', this.engine.config.defaultRenderer);

        if(!this.engine.config.disableRenderSystem) {
            this.service('renderSystem', this.service('renderSystem') || this.defaultRenderSystem());
        }

        if(!this.engine.config.disableSceneDirector) {
            this.service('sceneDirector', this.service('sceneDirector') || this.defaultSceneDirector());
        }

        if(!this.engine.config.disableSceneManager) {
            this.service('sceneManager', this.service('sceneManager') || this.defaultSceneManager());
        }

        if(!this.engine.config.disableLayerManager) {
            this.service('layerManager', this.service('layerManager') || this.defaultLayerManager());
        }

        if(!this.engine.config.disableDataStoreManager) {
            this.service('dataStoreManager', this.service('dataStoreManager') || this.defaultDataStoreManager());
        }

        if(!this.engine.config.disableEventBus) {
            this.service('eventBus', this.service('eventBus') || this.defaultEventBus());
        }

        if(!this.engine.config.disableAssetManager) {
            this.service('assetManager', this.service('assetManager') || this.defaultAssetManager());
        }

        if(!this.engine.config.disableAudioManager) {
            this.service('audioManager', this.service('audioManager') || this.defaultAudioManager());
        }

        if(!this.engine.config.disableInputManager) {
            this.service('inputManager', this.service('inputManager') || this.defaultInputManager());
        }

        if(!this.engine.config.disableInputBindingsManager) {
            this.service('inputBindingsManager', this.service('inputBindingsManager') || this.defaultInputBindingsManager());
        }

        if(!this.engine.config.disableSpriteSheetManager) {
            this.service('spriteSheetManager', this.service('spriteSheetManager') || this.defaultSpriteSheetManager());
        }

        if(!this.engine.config.disableEntityManager) {
            this.service('entityManager', this.service('entityManager') || this.defaultEntityManager());
        }

        if(!this.engine.config.disableGlobalMouse) {
            this.service('globalMouse', this.service('globalMouse') || this.defaultGlobalMouse());
        }

        if(!this.engine.config.disableScopedMouse) {
            this.service('scopedMouse', this.service('scopedMouse') || this.defaultScopedMouse());
        }
    }

    service(name, instance = null) {
        if(instance === null) {
            return this.engine.serviceContainer.get(name);
        } else if(instance === undefined) {
            this.engine.serviceContainer.remove(name);
        } else {
            this.engine.serviceContainer.add(name, instance);
        }
    }

    defaultTimer() {
        return new Timer(this.engine.config.fps, this.engine.config.showPerformanceMonitor);
    }

    defaultSceneDirector() {
        return new SceneDirector();
    }

    defaultSceneManager() {
        return SceneManager;
    }

    defaultLayerManager() {
        return LayerManager;
    }

    defaultRenderSystem() {
        return new CompositeRenderer();
    }

    defaultDataStoreManager() {
        return new DataStoreManager(this.engine.config.defaultDataStore);
    }

    defaultEventBus() {
        return new EventBus();
    }

    defaultAssetManager() {
        return new AssetManager();
    }

    defaultAudioManager() {
        return new AudioManager();
    }

    defaultInputManager() {
        return new InputManager();
    }

    defaultInputBindingsManager() {
        return new InputBindingsManager(
            this.service('eventBus'),
            this.engine.config.inputBindings
        );
    }

    defaultSpriteSheetManager() {
        return new SpriteSheetManager();
    }

    defaultEntityManager() {
        return new EntityManager(this.service('dataStoreManager'));
    }

    defaultGlobalMouse() {
        return new GlobalMouse();
    }

    defaultScopedMouse() {
        return new ScopedMouse(this.engine.config.targetElement, this.service('dataStoreManager'));
    }
}
