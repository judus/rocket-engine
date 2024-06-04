import Area from "../engine/src/utils/spatial/Area.js";

export default class InputHandler {
    constructor(eventBus, playerActions) {
        this.eventBus = eventBus;
        this.playerActions = playerActions;

        this.selectionStartWorld = null;
        this.selectionEndWorld = null;
    }

    setupEventListeners() {
        console.log('Setting up input handler...');
        const moveEvents = [
            {start: "moveForward", stop: "stopMoveForward", axis: "y", value: -1},
            {start: "moveBackward", stop: "stopMoveBackward", axis: "y", value: 1},
            {start: "moveLeft", stop: "stopMoveLeft", axis: "x", value: -1},
            {start: "moveRight", stop: "stopMoveRight", axis: "x", value: 1},
            {start: "run", stop: "stopRun", state: "run"},
            {start: "sneak", stop: "stopSneak", state: "sneak"},
        ];

        moveEvents.forEach((event) => {
            this.eventBus.on(event.start, () => this.playerActions.handleMoveEvent(event.axis, event.value, event.state, true));
            this.eventBus.on(event.stop, () => this.playerActions.handleMoveEvent(event.axis, event.value, event.state, false));
        });

        this.eventBus.on('scopedMouseDown', this.handleScopedMouseDown.bind(this));
        this.eventBus.on('scopedMouseUp', this.handleScopedMouseUp.bind(this));
        this.eventBus.on('scopedMouseMove', this.handleScopedMouseMove.bind(this));
        this.eventBus.on('scopedMouseDownPrimary', (event) => this.playerActions.handleAttack(event));
        this.eventBus.on('scopedMouseDownSecondary', (event) => this.playerActions.handleContextClick(event));
        this.eventBus.on('mouse.selection', (area, scopedMouse) => this.playerActions.handleMouseSelection(area, scopedMouse));
        this.eventBus.on("controlEntity", (entityId) => this.playerActions.handleControlEntity(entityId));
        this.eventBus.on("entityDestroyed", (event) => this.playerActions.handleEntityDestroyed(event));
        this.eventBus.on("switchInertiaDampers", (event) => this.playerActions.handleInertiaDamperSwitch(event));
        this.eventBus.on("switchAutoOrientation", (event) => this.playerActions.handleAutoOrientationSwitch(event));
        this.eventBus.on("logState", (event) => this.playerActions.handleLogState(event));
        this.eventBus.on("logThis", (event) => this.playerActions.handleLogThis(event));
        this.eventBus.on("key", (event) => this.playerActions.handleKey(event));
        this.eventBus.on("dropHeatSink", (event) => this.playerActions.handleDropHeatSink(event));
    }



    handleScopedMouseDown(scopedMouse) {
        this.selectionStartWorld = {...scopedMouse.world};
    }

    handleScopedMouseUp(scopedMouse) {
        this.resetSelection();
        this.eventBus.emit("mouse.selection", null);
    }

    handleScopedMouseMove(scopedMouse) {
        if(this.selectionStartWorld) {
            this.selectionEndWorld = {...scopedMouse.world};
            if(this.selectionStartWorld && this.selectionEndWorld) {
                const area = new Area(
                    Math.min(this.selectionStartWorld.x, this.selectionEndWorld.x),
                    Math.min(this.selectionStartWorld.y, this.selectionEndWorld.y),
                    Math.max(this.selectionStartWorld.x, this.selectionEndWorld.x),
                    Math.max(this.selectionStartWorld.y, this.selectionEndWorld.y)
                );
                this.eventBus.emit("mouse.selection", area, scopedMouse);
            }
        }
    }

    resetSelection() {
        this.selectionStartWorld = null;
        this.selectionEndWorld = null;
    }


}
