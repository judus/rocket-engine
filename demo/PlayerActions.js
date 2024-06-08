import InputHandler from "./InputHandler.js";
import EngineParts from "../engine/src/EngineParts.js";

export default class PlayerActions {
    constructor(engine) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStoreManager = this.engine.dataStoreManager();
        this.entities = this.dataStoreManager.getStore("entities");
        this.currentEntity = null;

        this.inputHandler = new InputHandler(this.eventBus, this);
        this.entitySelector = this.engine.create(EngineParts.ENTITY_SELECTOR, this.dataStoreManager);
        this.entityController = this.engine.create(EngineParts.ENTITY_CONTROLLER, this.dataStoreManager);
        this.mouseSelectionLayer = null;

        this.selectedEntities = new Set();
    }

    onSceneEnter() {
        this.sceneDirector = this.engine.sceneDirector();
        this.sceneManager = this.sceneDirector.getSceneManager("world");
        this.currentScene = this.sceneManager.getCurrentScene();
        this.mainCamera = this.currentScene.cameraManager.getCamera("main");

        // Update the main camera in entitySelector
        this.entitySelector.mainCamera = this.mainCamera;

        // Get the mouse selection layer
        this.mouseSelectionLayer = this.currentScene.layerManager.getLayer('mouseSelectionLayer');
        // Get the context menu layer
        this.contextMenuLayer = this.currentScene.layerManager.getLayer('contextMenuLayer');

    }

    handleContextClick(scopedMouse) {
        const area = scopedMouse.getArea();
        if(area) {
            this.handleAreaSelection(area);
        } else {
            //this.handleClickSelection(scopedMouse);
            this.showContextMenu(scopedMouse);
        }
    }

    showContextMenu(scopedMouse) {
        const actions = ['Action 1', 'Action 2', 'Action 3']; // Example actions
        if(this.contextMenuLayer) {
            //this.contextMenuLayer.showContextMenu(scopedMouse.world.x, scopedMouse.world.y, actions);
        }
    }


    handleAreaSelection(area) {
        console.log("Area selection: ", area);
        const entities = this.entitySelector.selectEntitiesInArea(area);
        this.enableHighlighting(entities);

        // Clear selection area after handling
        if(this.mouseSelectionLayer) {
            this.mouseSelectionLayer.clearSelection();
        }
    }

    handleClickSelection(scopedMouse) {
        console.log("Click selection at: ", scopedMouse.world);
        const entities = this.entitySelector.selectEntitiesAtPoint(scopedMouse.world.x, scopedMouse.world.y);
        this.enableHighlighting(entities);
    }

    handleMouseSelection(selection, scopedMouse) {
        if(!selection) {
            if(this.mouseSelectionLayer) {
                this.mouseSelectionLayer.clearSelection();
            }
            return;
        }

        if(this.mouseSelectionLayer) {
            this.mouseSelectionLayer.setSelectionArea(selection);
        }

        const entities = this.entitySelector.selectEntitiesInArea(selection);
        this.enableHighlighting(entities);
    }

    enableHighlighting(entities) {
        // Disable highlighting for previously selected entities
        this.disableHighlighting();

        // Enable highlighting for newly selected entities
        entities.forEach(entity => {
            const highlightComponent = entity.getComponent('highlight');
            if(highlightComponent) {
                highlightComponent.enableHighlight();
                this.selectedEntities.add(entity);
            }
        });
    }

    disableHighlighting() {
        this.selectedEntities.forEach(entity => {
            const highlightComponent = entity.getComponent('highlight');
            if(highlightComponent) {
                highlightComponent.disableHighlight();
            }
        });
        this.selectedEntities.clear();
    }

    handleEntityDestroyed(entity) {
        if(this.currentEntity && entity.id === this.currentEntity.id) {
            this.currentEntity = null;
            this.eventBus.emit("gameOver", null);
        }
    }

    handleControlEntity(entityId) {
        console.log("Handling Control entity: ", entityId);
        this.currentEntity = entityId;
        this.entityController.controlEntity(entityId);
    }

    handleAttack(scopedMouse) {
        this.entityController.handleAttack(scopedMouse, this.mainCamera);
    }

    handleMoveEvent(axis, value, state, isStarting) {
        console.log("Move event: ", axis, value, state, isStarting)
        this.entityController.handleMoveEvent(axis, value, state, isStarting);
    }

    handleScopedMouseUp(scopedMouse) {
        if(this.mouseSelectionLayer) {
            this.mouseSelectionLayer.clearSelection();  // Clear selection after handling
        }
    }

    handleAutoOrientationSwitch(event) {
        this.entityController.switchAutoOrientation();
    }

    handleInertiaDamperSwitch(event) {
        this.entityController.switchEngineProfile();
    }

    handleDropHeatSink(event) {
        this.entityController.dropHeatSink();
    }

    handleKey(key) {
        this.entityController.switchGroup(key);
    }

    handleLogState(event) {
        this.entityController.currentEntity && this.entityController.currentEntity.logState();
    }

    handleLogThis(event) {
        this.entityController.currentEntity && this.entityController.currentEntity.logThis();
    }
}
