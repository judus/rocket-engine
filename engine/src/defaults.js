import CanvasRenderer from "./rendering/CanvasRenderer.js";
import BaseDataStore from "./datastores/BaseDataStore.js";

const defaults = {
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
    disableCameraManager: false
};

export default defaults;
