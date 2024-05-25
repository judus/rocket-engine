import BaseScene from "./core/BaseScene.js";
import BackgroundLayer from "./BackgroundLayer.js";
import ForegroundLayer from "./ForegroundLayer.js";
import ProjectileLayer from "./ProjectileLayer.js";
import ParticleLayer from "./ParticleLayer.js";
import LoadingScreenScene from "./LoadingScreenScene.js";

export default class FirstScene extends BaseScene {
    constructor(config) {
        super(config);
        this.fadeInDuration = 5;
        this.fadeOutDuration = 0;
    }

    onLoad() {
        return new LoadingScreenScene(this.config);
    }

    load(callback) {
        // Simulate loading assets with a delay
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 0); // Delay for 3 seconds
        }).then(() => {
            if(typeof callback === 'function') {
                callback();
            }
        });
    }

    init() {
        this.addLayer('background', BackgroundLayer);
        this.addLayer('projectiles', ProjectileLayer);
        this.addLayer('foreground', ForegroundLayer);
        this.addLayer('particles', ParticleLayer);
    }

    onEnter() {
        super.onEnter();

        const player = this.dataStoreManager.getStore('entities').get('player');
        if(player) {
            this.camera.setTarget(player);
            this.eventBus.emit('controlEntity', 'player');
        } else {
            console.error("Player entity not found in the data store");
        }
    }
}
