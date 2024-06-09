export default class Particle {
    constructor(x, y, vx, vy, lifetime, color) {
        this.pos = {x, y};
        this.vx = vx;
        this.vy = vy;
        this.lifetime = lifetime;
        this.color = color; // Ensure this is used correctly in render
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

    render(context, camera) {
        if(!this.active) return;

        const x = (this.pos.x - camera.pos.x) * camera.zoomLevel;
        const y = (this.pos.y - camera.pos.y) * camera.zoomLevel;
        const size = 2; // or some appropriate size for the particle

        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}
