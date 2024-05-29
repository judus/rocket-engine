import UnifiedCollisionSystem from "../engine/src/physics/collisions/UnifiedCollisionSystem.js";
import SceneDirector from "../engine/src/scenes/SceneDirector.js";

export default class GameLogic {
    constructor(engine) {
        this.engine = engine;
        this.dataStore = this.engine.dataStoreManager();
        this.unifiedCollisionSystem = new UnifiedCollisionSystem();
        this.isPaused = false;
    }

    onSceneEnter(scene) {
        console.log('GameLogic: onSceneEnter...');
        this.sceneDirector = this.engine.sceneDirector();
        this.sceneManager = this.sceneDirector.getSceneManager('world');
        this.currentScene = this.sceneManager.getCurrentScene();
        this.mainCamera = this.currentScene.cameraManager.getCamera('main');
        this.resume();
    }

    update(deltaTime) {
        if(!this.isPaused && this.mainCamera) {
            this.processGameLogic(deltaTime);
            this.checkGameConditions();
        }
    }

    processGameLogic(deltaTime) {


        this.dataStore.getStore('entities').forEach(entity => {
            entity.update(deltaTime);
        });

        this.dataStore.getStore('projectiles').update(deltaTime);

        const entities = this.dataStore.getStore('entities').getEntitiesInArea(this.mainCamera.getArea());
        const projectiles = this.dataStore.getStore('projectiles').getProjectilesInArea(this.mainCamera.getArea());

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
        await this.sceneManager.switchTo('GameOverScene');
        this.pause();
    }


}
