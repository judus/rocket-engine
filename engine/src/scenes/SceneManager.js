import EngineBase from "../abstracts/EngineBase.js";
import EngineParts from "../EngineParts.js";
import BaseScene from "./BaseScene.js";

/**
 * Manages scenes within a specific context or stack.
 */
export default class SceneManager extends EngineBase {
    /**
     * Creates an instance of SceneManager.
     * @param {Renderer} renderer - The renderer instance to be used.
     * @param {number} width - The width of the scene.
     * @param {number} height - The height of the scene.
     */
    constructor(renderer, width, height) {
        super();
        this.scenes = new Map();
        this.currentScene = null;
        this.renderer = renderer;
        this.width = width;
        this.height = height;
        this.currentSceneIndex = -1; // Initialize to -1 to indicate no scene is active yet
        this.sceneOrder = []; // To keep track of the order of scenes added
    }

    /**
     * Initializes the SceneManager with the engine instance.
     * @param {Engine} engine - The engine instance.
     */
    init(engine) {
        this.engine = engine;
    }

    /**
     * Adds a scene to the scene manager.
     * @param {string} sceneName - The name of the scene.
     * @param {BaseScene} scene - The scene instance.
     */
    addScene(sceneName, scene) {
        this.scenes.set(sceneName, scene);
        this.sceneOrder.push(sceneName);

        if(scene instanceof BaseScene) {
            scene.init(this.engine); // Initialize the scene with the engine API
        }
    }

    /**
     * Gets the current scene.
     * @returns {BaseScene} The current scene.
     */
    getCurrentScene() {
        return this.currentScene;
    }

    /**
     * Updates the current scene.
     * @param {number} deltaTime - The time elapsed since the last update.
     * @param {number} tickCount - The current tick count.
     * @param {number} totalTime - The total elapsed time.
     */
    updateCurrentScene(deltaTime, tickCount, totalTime) {
        if(this.currentScene) {
            this.currentScene.update(deltaTime, tickCount, totalTime);
        }
    }

    /**
     * Renders the current scene.
     * @param {number} deltaTime - The time elapsed since the last update.
     * @param {number} tickCount - The current tick count.
     * @param {number} totalTime - The total elapsed time.
     */
    renderCurrentScene(deltaTime, tickCount, totalTime) {
        if(this.currentScene) {
            this.renderer.render(this.currentScene, deltaTime, tickCount, totalTime);
        }
    }

    /**
     * Switches to the specified scene.
     * @param {string} name - The name of the scene to switch to.
     */
    /**
     * Switches to the specified scene.
     * @param {string} name - The name of the scene to switch to.
     */
    async switchTo(name) {
        if(this.scenes.has(name)) {
            const nextScene = this.scenes.get(name);
            this.currentSceneIndex = this.sceneOrder.indexOf(name);

            if(this.currentScene instanceof BaseScene) {
                // Perform transition out and exit for the current scene if it's a BaseScene
                await this.transitionOutScene(this.currentScene);
                await this.currentScene.onExit();
            }

            // Load the loading scene if it exists
            const loadingScene = nextScene.onLoad && nextScene.onLoad();

            if(loadingScene instanceof BaseScene) {
                this.currentScene = loadingScene;
                loadingScene.init(this.engine);
                await this.transitionInScene(this.currentScene);
                await loadingScene.onEnter();
            }

            // Load the next scene
            await nextScene.load && nextScene.load(() => {
                if(nextScene instanceof BaseScene) {
                    nextScene.init(this.engine);
                }
            });

            if(loadingScene instanceof BaseScene) {
                await this.transitionOutScene(this.currentScene);
                await this.currentScene.onExit();
            }

            // Set the new current scene
            this.currentScene = nextScene;

            if(nextScene instanceof BaseScene) {
                await this.transitionInScene(this.currentScene);
                this.currentScene.onEnter();
            }
        } else {
            console.error(`Scene "${name}" not found`);
        }
    }

    /**
     * Transitions into a scene.
     * @param {BaseScene} scene - The scene to transition into.
     */
    async transitionInScene(scene) {
        if(scene && scene.transitionInScene) {
            await scene.transitionInScene(this.renderer);
        }
    }

    /**
     * Transitions out of a scene.
     * @param {BaseScene} scene - The scene to transition out of.
     */
    async transitionOutScene(scene) {
        if(scene && scene.transitionOutScene) {
            await scene.transitionOutScene(this.renderer);
        }
    }

    /**
     * Switches to the previous scene.
     */
    previous() {
        if(this.currentSceneIndex > 0) {
            this.currentSceneIndex--;
            const sceneName = this.sceneOrder[this.currentSceneIndex];
            this.switchTo(sceneName);
        }
    }

    /**
     * Switches to the next scene.
     */
    next() {
        if(this.currentSceneIndex < this.sceneOrder.length - 1) {
            this.currentSceneIndex++;
            const sceneName = this.sceneOrder[this.currentSceneIndex];
            this.switchTo(sceneName);
        }
    }

    /**
     * Switches to the first scene.
     */
    first() {
        if(this.sceneOrder.length > 0) {
            this.currentSceneIndex = 0;
            const sceneName = this.sceneOrder[this.currentSceneIndex];
            this.switchTo(sceneName);
        }
    }

    /**
     * Switches to the last scene.
     */
    last() {
        if(this.sceneOrder.length > 0) {
            this.currentSceneIndex = this.sceneOrder.length - 1;
            const sceneName = this.sceneOrder[this.currentSceneIndex];
            this.switchTo(sceneName);
        }
    }
}
