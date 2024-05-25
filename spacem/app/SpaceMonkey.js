import PlayerActions from './PlayerActions.js';
import GameLogic from './GameLogic.js';
import EntityInitialization from "./EntityInitialization.js";
import BoxCollisionSystem from "./systems/collisions/BoxCollisionSystem.js";

export default class SpaceMonkey {
    constructor(config) {
        this.eventBus = config.eventBus;
        this.dataStore = config.dataStoreManager;
        this.entityInitialization = new EntityInitialization(this.dataStore, this.eventBus);
        this.playerActions = new PlayerActions(this.eventBus, this.dataStore);
        this.gameLogic = new GameLogic(this.dataStore);
        this.setupEventListeners();
        this.initializeEntities();
    }

    setupEventListeners() {
        this.eventBus.on('pause', this.gameLogic.pause.bind(this.gameLogic));
        this.eventBus.on('resume', this.gameLogic.resume.bind(this.gameLogic));
        this.eventBus.on('gameOver', this.gameLogic.gameOver.bind(this.gameLogic));
    }

    initializeEntities() {
        this.entityInitialization.createEntities();
    }

    update(deltaTime) {
        this.gameLogic.update(deltaTime);
    }
}