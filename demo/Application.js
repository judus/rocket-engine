import PlayerActions from './PlayerActions.js';
import GameLogic from './GameLogic.js';
import EntityInitialization from "./entities/EntityInitialization.js";
import EngineBase from "../engine/src/abstracts/EngineBase.js";

export default class Application {
    init(engine) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStore = this.engine.dataStoreManager();
        this.entityInitialization = new EntityInitialization(this.engine);
        this.playerActions = new PlayerActions(this.engine);
        this.gameLogic = new GameLogic(this.engine);
        this.setupEventListeners();
        this.initializeEntities();
    }

    setupEventListeners() {
        this.eventBus.on('pause', this.gameLogic.pause.bind(this.gameLogic));
        this.eventBus.on('resume', this.gameLogic.resume.bind(this.gameLogic));
        this.eventBus.on('gameOver', this.gameLogic.gameOver.bind(this.gameLogic));
        this.eventBus.on('scene.enter', this.gameLogic.onSceneEnter.bind(this.gameLogic));
        this.eventBus.on('scene.enter', this.playerActions.onSceneEnter.bind(this.playerActions));
    }

    initializeEntities() {
        this.entityInitialization.createEntities();
    }

    update(deltaTime) {
        this.gameLogic.update(deltaTime);
    }
}