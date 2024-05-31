import MovementProfile from "./MovementProfile.js";

export default class AdvancedMovementProfile extends MovementProfile {
    move(deltaTime, input, state, entity, modifiers) {
        const {vel, acc, drag, pos, rotationSpeed, rotation} = entity;

        if(input.dy === -1) { // W Key
            vel.x += Math.cos(rotation) * acc.x * deltaTime;
            vel.y += Math.sin(rotation) * acc.y * deltaTime;
        }
        if(input.dy === 1) { // S Key
            vel.x -= Math.cos(rotation) * acc.x * deltaTime;
            vel.y -= Math.sin(rotation) * acc.y * deltaTime;
        }

        if(input.dx === -1) { // A Key
            entity.rotation -= rotationSpeed * deltaTime;
        }
        if(input.dx === 1) { // D Key
            entity.rotation += rotationSpeed * deltaTime;
        }

        entity.vel.x *= drag;
        entity.vel.y *= drag;

        entity.pos.x += vel.x * deltaTime;
        entity.pos.y += vel.y * deltaTime;

        console.log('AdvancedMovementProfile', entity);
    }
}