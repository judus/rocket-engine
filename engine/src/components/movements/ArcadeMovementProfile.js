import MovementProfile from "./MovementProfile.js";

export class ArcadeMovementProfile extends MovementProfile {
    move(deltaTime, input, state, entity, modifiers) {
        if(input.dx) {
            entity.vel.x += input.dx * entity.acc.x * deltaTime;
        }
        if(input.dy) {
            entity.vel.y += input.dy * entity.acc.y * deltaTime;
        }

        entity.vel.x *= entity.drag;
        entity.vel.y *= entity.drag;

        entity.pos.set(
            entity.pos.x + entity.vel.x * deltaTime,
            entity.pos.y + entity.vel.y * deltaTime
        );

        // Automatic orientation
        entity.rotation = Math.atan2(entity.vel.y, entity.vel.x);
    }
}