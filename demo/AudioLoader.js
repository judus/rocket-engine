import AudioManager from "../engine/src/audio/AudioManager.js";

export default class AudioLoader {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.audioManager = new AudioManager();
        this.sounds = [
            {name: 'device.failure', url: 'demo/assets/sounds/Short_Device_Failure_SFX_33.wav'},
            {name: 'device.wakeup', url: 'demo/assets/sounds/mech01.wav'},
            {name: 'device.switch', url: 'demo/assets/sounds/Click03.mp3'},
            {name: 'background.theme', url: 'demo/assets/sounds/ApproachingEclipse.wav'},
        ];
    }

    async loadSounds() {
        const loadPromises = this.sounds.map(sound => this.audioManager.load(sound.name, sound.url));
        await Promise.all(loadPromises);
        console.log('All sounds loaded.');
    }

    getAudioManager() {
        return this.audioManager;
    }
}