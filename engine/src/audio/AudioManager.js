export default class AudioManager {
    constructor() {
        this.sounds = {};
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
    }

    load(name, url, options = {loop: false}) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                audio.loop = options.loop;
                this.sounds[name] = audio;
                resolve(audio);
            };
            audio.onerror = reject;
            audio.src = url;
        });
    }

    play(name, loop = false) {
        if(!this.enabled) {
            //console.warn(`AudioManager: Audio is not enabled yet. Sound '${name}' not played.`);
            return;
        }

        const sound = this.sounds[name];
        if(sound) {
            sound.loop = loop; // Set the loop property based on the parameter
            sound.play().catch(error => {
                console.error(`AudioManager: Failed to play sound '${name}'`, error);
            });
        } else {
            console.warn(`Sound '${name}' does not exist.`);
        }
    }

    stop(name) {
        const sound = this.sounds[name];
        if(sound) {
            sound.pause();
            sound.currentTime = 0;
        } else {
            console.warn(`Sound '${name}' does not exist.`);
        }
    }

    remove(name) {
        if(!this.sounds[name]) {
            console.warn(`Sound '${name}' does not exist and cannot be removed.`);
            return;
        }
        delete this.sounds[name];
    }
}
