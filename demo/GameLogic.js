import UnifiedCollisionSystem from "../engine/src/physics/collisions/UnifiedCollisionSystem.js";

export default class GameLogic {
    constructor(dataStore) {
        this.dataStore = dataStore;
        this.isPaused = false;
        this.unifiedCollisionSystem = new UnifiedCollisionSystem();
    }

    update(deltaTime) {
        if(!this.isPaused) {
            this.processGameLogic(deltaTime);
            this.checkGameConditions();
        }
    }

    processGameLogic(deltaTime) {
        this.dataStore.getStore('entities').forEach(entity => {
            entity.update(deltaTime);
        });

        this.dataStore.getStore('projectiles').update(deltaTime);

        const camera = this.dataStore.getStore('cameras').get('main');
        const entities = this.dataStore.getStore('entities').getEntitiesInArea(camera.getArea());
        const projectiles = this.dataStore.getStore('projectiles').getProjectilesInArea(camera.getArea());

        // Combine entities and projectiles
        const allObjects = [...entities, ...projectiles];

        //this.movementSystem.update(deltaTime, allObjects);
        this.unifiedCollisionSystem.update(allObjects);

        // Update the particle system
        this.dataStore.getStore('particles').update(deltaTime);
    }

    checkGameConditions() {
        // Check for end-game conditions or other important game events
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    async gameOver() {
        const renderer = this.dataStore.getStore('systems').get('canvasRenderer');
        if(renderer instanceof CanvasRenderer) {
            const sceneManager = this.dataStore.getStore('systems').get('sceneManager');
            await sceneManager.switchToScene('gameOverScene');
        };
    }


}
