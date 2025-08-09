import AudioManager from "../../../engine/src/audio/AudioManager.js";

export default class AudioLoader {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.audioManager = new AudioManager();
        this.sounds = [
            {name: 'device.overheat', url: 'src/assets/sounds/2_SHORT_Electro_Cyber_Chaos_P1-03.wav'},
            {name: 'device.failure', url: 'src/assets/sounds/Short_Device_Failure_SFX_33.wav'},
            {name: 'device.wakeup', url: 'src/assets/sounds/mech01.wav'},
            {name: 'device.switch', url: 'src/assets/sounds/Click03.mp3'},
            {name: 'background.theme', url: 'src/assets/sounds/ApproachingEclipse.wav'},
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