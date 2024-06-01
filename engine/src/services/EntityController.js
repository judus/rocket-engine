export default class EntityController {
    constructor(dataStoreManager) {
        this.dataStoreManager = dataStoreManager
        this.entities = this.dataStoreManager.getStore("entities");
        this.currentEntity = null;
        this.movementDirections = {x: 0, y: 0}; // Track movement direction
    }

    controlEntity(entityId) {
        this.currentEntity = this.entities.get(entityId);
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

        const engine = this.currentEntity.getComponent("engine");

        if(engine) {
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

            // Update the entity in the SpatialHashGrid
            this.entities.updateEntity(this.currentEntity);
        }
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
        console.log('Switching group to: ', group);1
        if(!this.currentEntity) return;
        this.currentEntity.hasComponent("weaponSystem", (weaponSystem) => {
            weaponSystem.switchGroup(group);
        });
    }

}
