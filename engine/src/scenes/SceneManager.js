import EngineBase from "../abstracts/EngineBase.js";

export default class SceneManager extends EngineBase {
    constructor(renderer, width, height) {
        super();
        this.scenes = new Map();
        this.currentScene = null;
        this.renderer = renderer;
        this.width = width;
        this.height = height;
    }

    /**
     * Adds a scene to the scene manager.
     * @param {string} sceneName - The name of the scene.
     * @param {BaseScene} scene - The scene instance.
     */
    addScene(sceneName, scene) {
        this.scenes.set(sceneName, scene);
        scene.init(this.engine); // Initialize the scene with the engine API
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
    async switchToScene(name) {
        if(this.scenes.has(name)) {
            const nextScene = this.scenes.get(name);

            if(this.currentScene) {
                await this.transitionOutScene(this.currentScene);
                await this.currentScene.onExit();
            }

            const loadingScene = nextScene.onLoad();

            if(loadingScene) {
                this.currentScene = loadingScene;
                loadingScene.init(this.engine);
                await this.transitionInScene(this.currentScene);
                await loadingScene.onEnter();
            }

            await nextScene.load(() => {
                nextScene.init(this.engine);
            });

            if(loadingScene) {
                await this.transitionOutScene(this.currentScene);
                await this.currentScene.onExit();
            }

            this.currentScene = nextScene;
            await this.transitionInScene(this.currentScene);
            this.currentScene.onEnter();
        } else {
            console.error(`Scene "${name}" not found`);
        }
    }

    async transitionInScene(scene) {
        if(scene && scene.transitionInScene) {
            await scene.transitionInScene(this.renderer);
        }
    }

    async transitionOutScene(scene) {
        if(scene && scene.transitionOutScene) {
            await scene.transitionOutScene(this.renderer);
        }
    }
}
