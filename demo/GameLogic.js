import UnifiedCollisionSystem from "../engine/src/physics/collisions/UnifiedCollisionSystem.js";
import SceneDirector from "../engine/src/scenes/SceneDirector.js";
import CollisionSystem from "../engine/src/physics/collisions/CollisionSystem.js";

export default class
GameLogic {
    constructor(engine) {
        this.engine = engine;
        this.dataStore = this.engine.dataStoreManager();
        this.unifiedCollisionSystem = new UnifiedCollisionSystem();
        this.isPaused = false;
    }

    onSceneEnter(scene) {
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

        const entities = this.dataStore.getStore('entities').getEntitiesInArea(this.mainCamera.getArea());

        entities.forEach(entity => {
            CollisionSystem.update(entity);
            CollisionSystem.check(entity, entities);
        });

        this.engine.particleSystem().update(deltaTime);
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
