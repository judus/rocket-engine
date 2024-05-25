export default class Particle {
    constructor(x, y, vx, vy, lifetime, color) {
        this.pos = {x, y};
        this.vx = vx;
        this.vy = vy;
        this.lifetime = lifetime;
        this.color = color;
        this.active = true;
    }

    update(deltaTime) {
        if(!this.active) return;

        this.lifetime -= deltaTime;
        if(this.lifetime <= 0) {
            this.active = false;
        } else {
            this.pos.x += this.vx * deltaTime;
            this.pos.y += this.vy * deltaTime;
        }
    }

    isAlive() {
        return this.active;
    }
}
