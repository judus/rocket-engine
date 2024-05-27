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
            const attack = this.currentEntity.getComponent("attack");
            if(attack) {
                attack.attack(scopedMouse, mainCamera);
            }
        }
    }

    handleMoveEvent(axis, value, state, isStarting) {
        if(!this.currentEntity) return;

        const movement = this.currentEntity.getComponent("movement");

        if(movement) {
            if(state) {
                if(isStarting) {
                    movement.setState(state);
                } else {
                    movement.setState("walk"); // Default to walk when the state event stops
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
            this.entities.updateEntity(this.currentEntity.id, this.currentEntity);
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

        const movement = this.currentEntity.getComponent("movement");
        if(movement) {
            movement.setDirection(this.movementDirections.x, this.movementDirections.y);
        }
    }
}
