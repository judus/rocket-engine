export default class MovementProfile {
    constructor() {
        this.entity = null;
        this.state = 'default';
    }

    setState(state) {
        this.state = state;
    }

    setEntity(entity) {
        this.entity = entity;
    }

    move(deltaTime, input, state, entity, modifiers) {
        // Logic to move the entity
    }

    update(deltaTime, input, state, modifiers) {
        if (this.entity) {
            this.move(deltaTime, input, state, this.entity, modifiers);
        }
    }
}