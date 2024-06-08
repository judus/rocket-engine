export default class EntityController {
    constructor(dataStoreManager) {
        this.dataStoreManager = dataStoreManager
        this.currentEntity = null;
        this.movementDirections = {x: 0, y: 0}; // Track movement direction
    }

    controlEntity(entityId) {
        console.log(`Setting entity controls to: #${entityId}`);
        console.log('State of store: ', this.dataStoreManager.getStore("entities"));
        this.currentEntity = this.dataStoreManager.getStore("entities").get(entityId);
        console.log('currentEntity: ', this.currentEntity);

    }

    handleAttack(scopedMouse, mainCamera) {
        if(this.currentEntity) {
            this.currentEntity.hasComponent("attack", (component) =>{
                component.attack(scopedMouse, mainCamera);
            }, () => {
                console.warn('No attack component found on this entity.');
            });
        }
    }

    handleMoveEvent(axis, value, state, isStarting) {

        if(!this.currentEntity) return;

        this.currentEntity.hasComponent('engine', (engine) => {
            if(state) {
                if(isStarting) {
                    engine.setState(state);
                } else {
                    engine.setState("walk"); // Default to walk when the state event stops
                }
            }

            if(axis) {
                if(isStarting) {
                    this.setDirection(axis, value);
                } else {
                    this.stopDirection(axis, value);
                }
            }
        });
    }

    setDirection(axis, value) {
        this.movementDirections[axis] = value;
        this.updateDirection();
    }

    stopDirection(axis, value) {
        if(this.movementDirections[axis] === value) {
            this.movementDirections[axis] = 0;
        }
        this.updateDirection();
    }

    updateDirection() {
        if(!this.currentEntity) return;
        this.currentEntity.setInput(this.movementDirections.x, this.movementDirections.y);
    }

    switchEngineProfile() {
        if(!this.currentEntity) return;
        this.currentEntity.hasComponent("engineController", (engineController) => {
            engineController.switchProfile();
        });
    }

    switchAutoOrientation() {
        if(!this.currentEntity) return;
        this.currentEntity.hasComponent("engineController", (engineController) => {
            engineController.switchOrientationMode();
        });
    }

    switchGroup(group) {
        console.log('Switching group to: ', group);
        if(!this.currentEntity) return;
        this.currentEntity.hasComponent("weaponSystem", (weaponSystem) => {
            weaponSystem.switchGroup(group);
        });
    }

    dropHeatSink() {
        console.log("Dropping heat sink...");
        if(!this.currentEntity) return;
        this.currentEntity.hasComponent('heatManager', (component) => {
            component.dropHeatSink();
        });
    }
}
