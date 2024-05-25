export default class PlayerActions {
    constructor(eventBus, dataStore) {
        this.eventBus = eventBus;
        this.dataStore = dataStore;
        this.entities = this.dataStore.getStore('entities');
        this.currentEntity = null;
        this.movementDirections = {x: 0, y: 0}; // Track movement direction
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Example event names, these should be dynamically set by your input manager
        const moveEvents = [
            {start: 'moveForward', stop: 'stopMoveForward', axis: 'y', value: -1},
            {start: 'moveBackward', stop: 'stopMoveBackward', axis: 'y', value: 1},
            {start: 'moveLeft', stop: 'stopMoveLeft', axis: 'x', value: -1},
            {start: 'moveRight', stop: 'stopMoveRight', axis: 'x', value: 1},
            {start: 'run', stop: 'stopRun', state: 'run'},
            {start: 'sneak', stop: 'stopSneak', state: 'sneak'},
        ];

        moveEvents.forEach(event => {
            this.eventBus.on(event.start, () => this.handleMoveEvent(event.axis, event.value, event.state, true));
            this.eventBus.on(event.stop, () => this.handleMoveEvent(event.axis, event.value, event.state, false));
        });

        this.eventBus.on('controlEntity', (entityId) => this.control(entityId));
        this.eventBus.on('scopedMouseDownPrimary', (event) => this.attack(event));
        this.eventBus.on('scopedMouseDownSecondary', (event) => this.contextClick(event));

        this.eventBus.on('entityDestroyed', (event) => this.die(event));
    }

    die(entity) {
        if(this.currentEntity && entity.id === this.currentEntity.id) {
            this.currentEntity = null;
            this.eventBus.emit('gameOver', null);
        }
    }

    control(entityId) {
        this.currentEntity = this.entities.get(entityId);
    }

    contextClick(scopedMouse) {
        const camera = this.dataStore.getStore('cameras').get('main');
        const entities = this.dataStore.getStore('entities').getEntitiesInArea(camera.getArea());

        for(const entity of entities) {
            const clickableComponent = entity.getComponent('clickable');

            if(clickableComponent && this.isEntityClicked(entity, scopedMouse.world.x, scopedMouse.world.y)) {
                clickableComponent.handleClick(scopedMouse);
                break; // Only handle the first clicked entity
            }
        }
        /*
        if(this.currentEntity) {
            const navigation = this.currentEntity.getComponent('navigation');
            if(navigation) {
                navigation.setDestination(event.pos);
            }
        }
         */
    }

    attack(event) {
        if(this.currentEntity) {
            const attack = this.currentEntity.getComponent('attack');
            if(attack) {
                attack.attack(event);
            }
        }
    }

    handleMoveEvent(axis, value, state, isStarting) {
        if(!this.currentEntity) return;

        const movement = this.currentEntity.getComponent('movement');
        if(movement) {
            if(state) {
                if(isStarting) {
                    movement.setState(state);
                } else {
                    movement.setState('walk'); // Default to walk when the state event stops
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

        const movement = this.currentEntity.getComponent('movement');
        if(movement) {
            movement.setDirection(this.movementDirections.x, this.movementDirections.y);
        }
    }

    /**
     * Checks if an entity was clicked.
     * @param {SpatialECS2D} entity - The entity to check.
     * @param {number} mouseX - The X coordinate of the mouse in the game world.
     * @param {number} mouseY - The Y coordinate of the mouse in the game world.
     * @returns {boolean} True if the entity was clicked, false otherwise.
     */
    isEntityClicked(entity, mouseX, mouseY) {
        const boundingBox = entity.getComponent('boundingBox');
        if(boundingBox) {
            const bounds = boundingBox.getBounds(entity.pos, entity.rotation);
            for(const box of bounds) {
                if(mouseX >= box.left && mouseX <= box.right && mouseY >= box.top && mouseY <= box.bottom) {
                    return true;
                }
            }
        }

        const transformComponent = entity.getComponent('transform');
        if(transformComponent) {
            const vertices = transformComponent.applyTransform(entity.definition.vertices);
            return this.isPointInPolygon(vertices, mouseX, mouseY);
        }

        return false;
    }

    /**
     * Checks if a point is inside a polygon.
     * @param {Array} vertices - The vertices of the polygon.
     * @param {number} x - The X coordinate of the point.
     * @param {number} y - The Y coordinate of the point.
     * @returns {boolean} True if the point is inside the polygon, false otherwise.
     */
    isPointInPolygon(vertices, x, y) {
        let inside = false;
        for(let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const xi = vertices[i].x, yi = vertices[i].y;
            const xj = vertices[j].x, yj = vertices[j].y;

            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if(intersect) inside = !inside;
        }
        return inside;
    }
}
