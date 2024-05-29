import PlayerActions from './PlayerActions.js';
import GameLogic from './GameLogic.js';
import EntityInitialization from "./entities/EntityInitialization.js";
import EngineBase from "../engine/src/abstracts/EngineBase.js";

export default class Application extends EngineBase {
    init(engine) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStore = this.engine.dataStoreManager();
        this.entityInitialization = new EntityInitialization(this.engine);
        this.playerActions = new PlayerActions(this.engine);
        this.gameLogic = new GameLogic(this.engine);
        console.log('Application initialized.');
    }

    setupEventListeners() {
        this.eventBus.on('pause', this.gameLogic.pause.bind(this.gameLogic));
        this.eventBus.on('resume', this.gameLogic.resume.bind(this.gameLogic));
        this.eventBus.on('gameOver', this.gameLogic.gameOver.bind(this.gameLogic));
        this.eventBus.on('scene.enter', this.gameLogic.onSceneEnter.bind(this.gameLogic));
        this.eventBus.on('scene.enter', this.playerActions.onSceneEnter.bind(this.playerActions));
        console.log('Event listeners set up.');
    }

    async onLoad() {
        console.log('Starting onLoad...');
        this.setupEventListeners();

        console.log('Preloading sprites...');
        await this.entityInitialization.preloadSprites();
        console.log('Sprites preloaded.');

        console.log('Initializing entity definitions...');
        await this.entityInitialization.initializeEntityDefinitions();
        console.log('Entity definitions ready.');

        console.log('Creating factions...');
        this.entityInitialization.initializeFactions();
        console.log('Factions created.');

        console.log('Creating entities...');
        this.entityInitialization.createEntities();
        console.log('Entities created.');

        this.playerActions.inputHandler.setupEventListeners();


    }

    update(deltaTime) {
        this.gameLogic.update(deltaTime);
    }
}
