import ScopedMouse from "./ScopedMouse.js";
import EngineBase from "../abstracts/EngineBase.js";

export default class InputManager extends EngineBase {
    /**
     * InputManager constructor.
     * @param {Object} [config={}] - The configuration object.
     * @param {boolean} [config.useGlobalKeyboardListeners=true] - Whether to use global keyboard listeners.
     */
    constructor(config = {}) {
        super();
        this.config = {
            useGlobalKeyboardListeners: true,
            ...config
        };
        this.scopedMice = [];
    }

    /**
     * Initializes the input manager by setting up event listeners.
     * @param {Engine} engine - The engine API.
     */
    init(engine) {
        this.engine = engine;
        this.eventBus = engine.eventBus();
        this.globalMouse = engine.globalMouse();

        this.setupKeyboardListeners();
        this.setupGlobalMouseListeners();

        // Get all canvases from the scene managers
        const director = this.engine.sceneDirector();
        director.sceneManagers.forEach(sceneManager => {
            const renderer = sceneManager.renderer;
            if(renderer && renderer.canvas) {
                const scopedMouse = new ScopedMouse(renderer.canvas, this.engine.service('dataStoreManager'));
                this.addScopedMouse(scopedMouse);
            }
        });
    }

    /**
     * Adds a scoped mouse instance.
     * @param {ScopedMouse} scopedMouse - The scoped mouse instance.
     */
    addScopedMouse(scopedMouse) {
        this.scopedMice.push(scopedMouse);
        this.setupScopedMouseListeners(scopedMouse);
    }

    /**
     * Sets up keyboard event listeners based on the configuration.
     */
    setupKeyboardListeners() {
        if(this.config.useGlobalKeyboardListeners) {
            // Listen for keyboard events on the window
            window.addEventListener('keydown', this.handleKeyDown.bind(this));
            window.addEventListener('keyup', this.handleKeyUp.bind(this));
        } else {
            // Listen for keyboard events on specific canvases
            this.scopedMice.forEach(scopedMouse => {
                scopedMouse.element.addEventListener('keydown', this.handleKeyDown.bind(this));
                scopedMouse.element.addEventListener('keyup', this.handleKeyUp.bind(this));
            });
        }
    }
    /**
     * Handles the key down event.
     * @param {KeyboardEvent} event - The key down event.
     */
    handleKeyDown(event) {
        this.emitKeyEvent('keyDown', event);
    }

    /**
     * Handles the key up event.
     * @param {KeyboardEvent} event - The key up event.
     */
    handleKeyUp(event) {
        this.emitKeyEvent('keyUp', event);
    }

    /**
     * Emits a key event through the event bus.
     * @param {string} actionType - The type of action (keyDown or keyUp).
     * @param {KeyboardEvent} event - The keyboard event.
     */
    emitKeyEvent(actionType, event) {
        const normalizedKey = this.normalizeKey(event.key);
        const combinedKey = this.getCombinedKey(event);
        this.eventBus.emit(actionType, {key: normalizedKey, combinedKey: combinedKey});
    }

    /**
     * Gets the combined key representation.
     * @param {KeyboardEvent} event - The keyboard event.
     * @returns {string} The combined key representation.
     */
    getCombinedKey(event) {
        let combinedKey = '';
        if(event.shiftKey) combinedKey += 'shift+';
        if(event.ctrlKey) combinedKey += 'ctrl+';
        if(event.altKey) combinedKey += 'alt+';
        combinedKey += this.normalizeKey(event.key);
        return combinedKey;
    }

    /**
     * Normalizes the key to a standard representation.
     * @param {string} key - The key to normalize.
     * @returns {string} The normalized key.
     */
    normalizeKey(key) {
        key = key.toLowerCase();
        switch(key) {
            case ' ':
                return 'space';
            case 'arrowup':
                return 'up';
            case 'arrowdown':
                return 'down';
            case 'arrowleft':
                return 'left';
            case 'arrowright':
                return 'right';
            default:
                return key;
        }
    }

    /**
     * Sets up global mouse event listeners.
     */
    setupGlobalMouseListeners() {
        window.addEventListener('mousemove', event => {
            this.globalMouse.updatePosition(event);
            this.eventBus.emit('globalMouseMove', this.globalMouse);
        });
        window.addEventListener('mousedown', event => {
            this.globalMouse.updateButton(event);
            this.eventBus.emit('globalMouseDown', this.globalMouse);
        });
        window.addEventListener('mouseup', event => {
            this.globalMouse.updateButton(event);
            this.eventBus.emit('globalMouseUp', this.globalMouse);
        });
    }

    /**
     * Sets up scoped mouse event listeners for a given scoped mouse instance.
     * @param {ScopedMouse} scopedMouse - The scoped mouse instance.
     */
    setupScopedMouseListeners(scopedMouse) {
        scopedMouse.element.setAttribute('tabindex', '0');
        scopedMouse.element.addEventListener('contextmenu', event => {
            event.preventDefault();
        });

        scopedMouse.element.addEventListener('mouseenter', event => {
            scopedMouse.element.focus();
            this.eventBus.emit('scopedMouseFocus', scopedMouse);
        });

        scopedMouse.element.addEventListener('mouseleave', event => {
            scopedMouse.pos = {x: null, y: null};
            scopedMouse.element.blur();
            this.eventBus.emit('scopedMouseLeave', scopedMouse);
        });

        scopedMouse.element.addEventListener('mousemove', event => {
            scopedMouse.updatePosition(event);
            this.eventBus.emit('scopedMouseMove', scopedMouse);
        });

        scopedMouse.element.addEventListener('mousedown', event => {
            scopedMouse.updateButton(event);
            this.emitMouseButtonEvent(this.eventBus, 'scopedMouseDown', scopedMouse, event);
        });

        scopedMouse.element.addEventListener('mouseup', event => {
            scopedMouse.updateButton(event);
            this.emitMouseButtonEvent(this.eventBus, 'scopedMouseUp', scopedMouse, event);
        });

        scopedMouse.element.addEventListener('wheel', event => {
            this.eventBus.emit('mouseWheelScroll', {deltaY: event.deltaY});
        });
    }

    emitMouseButtonEvent(eventBus, eventType, scopedMouse, event) {
        eventBus.emit(eventType, scopedMouse);

        switch(event.button) {
            case 0:
                eventBus.emit(`${eventType}Primary`, scopedMouse);
                break;
            case 1:
                eventBus.emit(`${eventType}Middle`, scopedMouse);
                break;
            case 2:
                eventBus.emit(`${eventType}Secondary`, scopedMouse);
                break;
        }
    }
}
