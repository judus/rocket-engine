import CustomPhysics2D from "./physics/CustomPhysics2D.js";

export default class EngineParts {
    static TIMER = 'timer';
    static EVENT_BUS = 'eventBus';
    static RENDER_SYSTEM = 'renderSystem';
    static SCENE_DIRECTOR = 'sceneDirector';
    static SCENE_MANAGER = 'sceneManager';
    static LAYER_MANAGER = 'layerManager';
    static DATA_STORE_MANAGER = 'dataStoreManager';
    static ASSET_MANAGER = 'assetManager';
    static AUDIO_MANAGER = 'audioManager';
    static INPUT_MANAGER = 'inputManager';
    static INPUT_BINDINGS_MANAGER = 'inputBindingsManager';
    static SPRITE_SHEET_MANAGER = 'spriteSheetManager';
    static ENTITY_MANAGER = 'entityManager';
    static GLOBAL_MOUSE = 'globalMouse';
    static SCOPED_MOUSE = 'scopedMouse';
    static CAMERA_MANAGER = 'cameraManager';
    static DEFAULT_RENDERER = 'defaultRenderer';
    static ENTITY_SELECTOR = 'entitySelector';
    static ENTITY_CONTROLLER = 'entityController';
    static TASK_SCHEDULER = 'taskScheduler';
    static ENTITY_STORE_NAME = 'entities';
    static PARTICLE_SYSTEM = 'particleSystem';

    static worldScale = (meterInPixels, screenHeight) => {
        const scaleFactor = screenHeight / meterInPixels;
        //CustomPhysics2D.SCALE_FACTOR = scaleFactor;
        //console.log(CustomPhysics2D.SCALE_FACTOR);
        return scaleFactor;
    }
}
