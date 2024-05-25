import BaseScene from "./core/BaseScene.js";
import LoadingScreenLayer from "./LoadingScreenLayer.js";
import GameOverLayer from "./GameOverLayer.js";

export default class GameOverScene extends BaseScene {

    constructor(config) {
        super(config);
    }

    init() {
        this.addLayer('background', GameOverLayer);
    }

    onEnter() {
        console.log("Entering Loading Screen");
        // Additional code for entering the loading screen
    }

    onExit() {
        console.log("Exiting Loading Screen");
        // Additional code for exiting the loading screen
    }

    update(deltaTime) {
        // Update logic for the loading screen
    }

}
