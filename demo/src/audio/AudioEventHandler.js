export default class AudioEventHandler {
    constructor(eventBus, audioManager) {
        this.eventBus = eventBus;
        this.audioManager = audioManager;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.eventBus.on('play.music.theme', () => {
            this.audioManager.play('background.theme', true);
        });

        this.eventBus.on('component.activate', () => {
            this.audioManager.stop('device.switch');
            this.audioManager.play('device.wakeup');
        });

        this.eventBus.on('component.overheat', () => {
            this.audioManager.play('device.overheat');
        });

        this.eventBus.on('component.break', () => {
            this.audioManager.stop('device.switch');
            this.audioManager.play('device.failure');
        });

        this.eventBus.on('component.toggle', () => {
            this.audioManager.stop('device.switch');
            this.audioManager.play('device.switch');
        });
    }
}
