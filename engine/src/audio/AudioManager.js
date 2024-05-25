export default class AudioManager {
    constructor() {
        this.sounds = {};
    }

    load(name, url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                this.sounds[name] = audio;
                resolve(audio);
            };
            audio.onerror = reject;
            audio.src = url;
        });
    }

    play(name) {
        const sound = this.sounds[name];
        if(sound) {
            sound.play();
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
