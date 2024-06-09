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
import SceneManager from "./scenes/SceneManager.js";
import SceneDirector from "./scenes/SceneDirector.js";
import CompositeRenderer from "./rendering/CompositeRenderer.js";
import LayerManager from "./scenes/LayerManager.js";
import InputBindings from "./inputs/InputBindings.js";
import CameraManager from "./cameras/CameraManager.js";
import EngineParts from "./EngineParts.js";
import ScopedMouse from "./inputs/ScopedMouse.js";
import EntitySelector from "./services/EntitySelector.js";
import EntityController from "./services/EntityController.js";
import TaskScheduler from "./services/TaskScheduler.js";
import ParticleSystem from "./particles/ParticleSystem.js";
import ParticleGrid from "./datastores/ParticleGrid.js";

export default class EngineInit {
    initializeServices(engine) {
        this.engine = engine;
        this.engine.service(EngineParts.TIMER, this.engine.service(EngineParts.TIMER) || this.defaultTimer());
        this.engine.service(EngineParts.DEFAULT_RENDERER, this.engine.config.defaultRenderer);
        this.engine.service(EngineParts.DATA_STORE_MANAGER, this.engine.config.defaultDataStore);
        this.engine.service(EngineParts.ENTITY_SELECTOR, this.engine.service(EngineParts.ENTITY_SELECTOR) || this.defaultEntitySelector());
        this.engine.service(EngineParts.ENTITY_CONTROLLER, this.engine.service(EngineParts.ENTITY_CONTROLLER) || this.defaultEntityController());
        this.engine.service(EngineParts.TASK_SCHEDULER, this.engine.service(EngineParts.TASK_SCHEDULER) || this.defaultTaskScheduler());
        this.engine.service(EngineParts.PARTICLE_SYSTEM, this.engine.service(EngineParts.PARTICLE_SYSTEM) || this.defaultParticleSystem());


        if(!this.engine.config.disableEventBus) {
            this.engine.service(EngineParts.EVENT_BUS, this.engine.service(EngineParts.EVENT_BUS) || this.defaultEventBus());
        }

        if(!this.engine.config.disableRenderSystem) {
            this.engine.service(EngineParts.RENDER_SYSTEM, this.engine.service(EngineParts.RENDER_SYSTEM) || this.defaultRenderSystem());
        }

        if(!this.engine.config.disableSceneDirector) {
            this.engine.service(EngineParts.SCENE_DIRECTOR, this.engine.service(EngineParts.SCENE_DIRECTOR) || this.defaultSceneDirector());
        }

        if(!this.engine.config.disableSceneManager) {
            this.engine.service(EngineParts.SCENE_MANAGER, this.engine.service(EngineParts.SCENE_MANAGER) || this.defaultSceneManager());
        }

        if(!this.engine.config.disableLayerManager) {
            this.engine.service(EngineParts.LAYER_MANAGER, this.engine.service(EngineParts.LAYER_MANAGER) || this.defaultLayerManager());
        }

        if(!this.engine.config.disableCameraManager) {
            this.engine.service(EngineParts.CAMERA_MANAGER, this.engine.service(EngineParts.CAMERA_MANAGER) || this.defaultCameraManager());
        }

        if(!this.engine.config.disableDataStoreManager) {
            this.engine.service(EngineParts.DATA_STORE_MANAGER, this.engine.service(EngineParts.DATA_STORE_MANAGER) || this.defaultDataStoreManager());
        }

        if(!this.engine.config.disableAssetManager) {
            this.engine.service(EngineParts.ASSET_MANAGER, this.engine.service(EngineParts.ASSET_MANAGER) || this.defaultAssetManager());
        }

        if(!this.engine.config.disableAudioManager) {
            this.engine.service(EngineParts.AUDIO_MANAGER, this.engine.service(EngineParts.AUDIO_MANAGER) || this.defaultAudioManager());
        }

        if(!this.engine.config.disableInputManager) {
            this.engine.service(EngineParts.INPUT_MANAGER, this.engine.service(EngineParts.INPUT_MANAGER) || this.defaultInputManager());
        }

        if(!this.engine.config.disableInputBindingsManager) {
            this.engine.service(EngineParts.INPUT_BINDINGS_MANAGER, this.engine.service(EngineParts.INPUT_BINDINGS_MANAGER) || this.defaultInputBindingsManager());
        }

        if(!this.engine.config.disableSpriteSheetManager) {
            this.engine.service(EngineParts.SPRITE_SHEET_MANAGER, this.engine.service(EngineParts.SPRITE_SHEET_MANAGER) || this.defaultSpriteSheetManager());
        }

        if(!this.engine.config.disableEntityManager) {
            this.engine.service(EngineParts.ENTITY_MANAGER, this.engine.service(EngineParts.ENTITY_MANAGER) || this.defaultEntityManager());
        }

        if(!this.engine.config.disableGlobalMouse) {
            this.engine.service(EngineParts.GLOBAL_MOUSE, this.engine.service(EngineParts.GLOBAL_MOUSE) || this.defaultGlobalMouse());
        }

        if(!this.engine.config.disableScopedMouse) {
            this.engine.service(EngineParts.SCOPED_MOUSE, this.engine.service(EngineParts.SCOPED_MOUSE) || this.defaultScopedMouse());
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

    defaultCameraManager() {
        return CameraManager;
    }

    defaultRenderSystem() {
        return new CompositeRenderer();
    }

    defaultDataStoreManager() {
        return new DataStoreManager(this.engine.create(EngineParts.DATA_STORE_MANAGER, this.engine.service(EngineParts.EVENT_BUS)));
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
        return new InputBindings(this.engine.service(EngineParts.EVENT_BUS));
    }

    defaultInputBindingsManager() {
        this.engine.config.inputBindings.init(this.engine);
        return new InputBindingsManager(
            this.engine.service(EngineParts.EVENT_BUS),
            this.engine.config.inputBindings
        );
    }

    defaultSpriteSheetManager() {
        return new SpriteSheetManager();
    }

    defaultEntityManager() {
        return new EntityManager(this.engine.service(EngineParts.DATA_STORE_MANAGER));
    }

    defaultGlobalMouse() {
        return new GlobalMouse();
    }

    defaultScopedMouse() {
        return ScopedMouse;
    }

    defaultEntitySelector() {
        return EntitySelector; // The main camera will be set later
    }

    defaultEntityController() {
        return EntityController;
    }

    defaultTaskScheduler() {
        return TaskScheduler;
    }

    defaultParticleSystem() {
        return new ParticleSystem();
    }
}
