import GameOverLayer from "./GameOverLayer.js";
import BaseScene from "../../../engine/src/scenes/BaseScene.js";

export default class GameOverScene extends BaseScene {
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
}
