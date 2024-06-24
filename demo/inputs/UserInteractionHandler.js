export default class UserInteractionHandler {
    constructor(eventBus, callback) {
        this.eventBus = eventBus;
        this.callback = callback;
        this.enabled = false;

        this.bindEvents();
    }

    bindEvents() {
        const events = ['click', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, this.onUserInteraction.bind(this), {once: true});
        });
    }

    onUserInteraction() {
        this.enabled = true;
        this.callback();
        this.eventBus.emit('user.interaction');
    }
}
