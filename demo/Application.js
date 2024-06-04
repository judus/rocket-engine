import PlayerActions from './PlayerActions.js';
import GameLogic from './GameLogic.js';
import EntityInitialization from "./entities/EntityInitialization.js";
import EngineBase from "../engine/src/abstracts/EngineBase.js";
import Cockpit from "./html-ui/Cockpit.js";
import AudioLoader from "./AudioLoader.js";
import AudioEventHandler from "./AudioEventHandler.js";
import UserInteractionHandler from "./UserInteractionHandler.js";

export default class Application extends EngineBase {
    init(engine) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStore = this.engine.dataStoreManager();
        this.entityInitialization = new EntityInitialization(this.engine);
        this.playerActions = new PlayerActions(this.engine);
        this.gameLogic = new GameLogic(this.engine);
        this.cockpit = new Cockpit(this.engine);
        this.audioLoader = new AudioLoader(this.eventBus);
        this.audioEventHandler = null;
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

        console.log('Loading sounds...');
        await this.audioLoader.loadSounds();
        this.audioEventHandler = new AudioEventHandler(this.eventBus, this.audioLoader.getAudioManager());
        console.log('Sounds loaded.');

        this.playerActions.inputHandler.setupEventListeners();

        // Initialize user interaction handler to enable audio
        new UserInteractionHandler(this.eventBus, () => {
            this.audioLoader.getAudioManager().enable();
            this.eventBus.emit('play.music.theme');
            console.log('User interaction detected. Audio enabled.');
        });
    }

    update(deltaTime) {
        this.gameLogic.update(deltaTime);
        this.cockpit.update(deltaTime);
    }
}
