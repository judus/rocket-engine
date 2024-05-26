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
import InputBindings from "./inputs/InputBindings.js";
import CameraManager from "./cameras/CameraManager.js"; // Assuming the file is named CameraManager.js

export default class EngineInit {
    constructor(rocket) {
        this.rocket = rocket;
    }

    initializeServices() {
        this.service('timer', this.service('timer') || this.defaultTimer());
        this.service('defaultRenderer', this.rocket.config.defaultRenderer);
        this.service('defaultDataStore', this.rocket.config.defaultDataStore);

        if(!this.rocket.config.disableEventBus) {
            this.service('eventBus', this.service('eventBus') || this.defaultEventBus());
        }

        if(!this.rocket.config.disableRenderSystem) {
            this.service('renderSystem', this.service('renderSystem') || this.defaultRenderSystem());
        }

        if(!this.rocket.config.disableSceneDirector) {
            this.service('sceneDirector', this.service('sceneDirector') || this.defaultSceneDirector());
        }

        if(!this.rocket.config.disableSceneManager) {
            this.service('sceneManager', this.service('sceneManager') || this.defaultSceneManager());
        }

        if(!this.rocket.config.disableLayerManager) {
            this.service('layerManager', this.service('layerManager') || this.defaultLayerManager());
        }

        if(!this.rocket.config.disableCameraManager) {
            this.service('cameraManager', this.service('cameraManager') || this.defaultCameraManager());
        }

        if(!this.rocket.config.disableDataStoreManager) {
            this.service('dataStoreManager', this.service('dataStoreManager') || this.defaultDataStoreManager());
        }

        if(!this.rocket.config.disableAssetManager) {
            this.service('assetManager', this.service('assetManager') || this.defaultAssetManager());
        }

        if(!this.rocket.config.disableAudioManager) {
            this.service('audioManager', this.service('audioManager') || this.defaultAudioManager());
        }

        if(!this.rocket.config.disableInputManager) {
            this.service('inputManager', this.service('inputManager') || this.defaultInputManager());
        }

        if(!this.rocket.config.disableInputBindingsManager) {
            this.service('inputBindingsManager', this.service('inputBindingsManager') || this.defaultInputBindingsManager());
        }

        if(!this.rocket.config.disableSpriteSheetManager) {
            this.service('spriteSheetManager', this.service('spriteSheetManager') || this.defaultSpriteSheetManager());
        }

        if(!this.rocket.config.disableEntityManager) {
            this.service('entityManager', this.service('entityManager') || this.defaultEntityManager());
        }

        if(!this.rocket.config.disableGlobalMouse) {
            this.service('globalMouse', this.service('globalMouse') || this.defaultGlobalMouse());
        }

        if(!this.rocket.config.disableScopedMouse) {
            this.service('scopedMouse', this.service('scopedMouse') || this.defaultScopedMouse());
        }


    }

    service(name, instance = null) {
        if(instance === null) {
            return this.rocket.serviceContainer.get(name);
        } else if(instance === undefined) {
            this.rocket.serviceContainer.remove(name);
        } else {
            this.rocket.serviceContainer.add(name, instance);
        }
    }

    defaultTimer() {
        return new Timer(this.rocket.config.fps, this.rocket.config.showPerformanceMonitor);
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

    defaultCameraManager() {
        return CameraManager;
    }

    defaultRenderSystem() {
        return new CompositeRenderer();
    }

    defaultDataStoreManager() {
        return new DataStoreManager(this.rocket.create('defaultDataStore', this.rocket.service('eventBus'))); // get a new instance
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

    defaultInputBindings() {
        return new InputBindings(this.service('eventBus'));
    }

    defaultInputBindingsManager() {
        this.rocket.config.inputBindings.init(this.rocket.engine)
        return new InputBindingsManager(
            this.service('eventBus'),
            this.rocket.config.inputBindings
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
        return new ScopedMouse(this.rocket.config.targetElement, this.service('dataStoreManager'));
    }

}
