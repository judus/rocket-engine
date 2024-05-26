import FollowComponent from "../../../../engine/src/cameras/FollowComponent.js";

export default class StarBackground {
    constructor(context, width, height, numStars, parallaxFactor) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.parallaxFactor = parallaxFactor;
        this.stars = this.createStars(numStars);
    }

    createStars(numStars) {
        const stars = [];
        for(let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 1,
            });
        }
        return stars;
    }

    render(scene) {
        let vel = {x: 0, y: 0};
        let target = null;

        const cameraTarget = scene.camera.getComponent(FollowComponent).target;
        if (cameraTarget) {
            const movement = cameraTarget.getComponent('movement');
            if (movement) {
                vel = movement.vel;
            }
        }

        for(const star of this.stars) {
            star.x -= vel.x * this.parallaxFactor;
            star.y -= vel.y * this.parallaxFactor;

            // Wrap around
            if(star.x < 0) star.x += this.width;
            if(star.x > this.width) star.x -= this.width;
            if(star.y < 0) star.y += this.height;
            if(star.y > this.height) star.y -= this.height;
        }

        this.context.fillStyle = 'white';
        for(const star of this.stars) {
            this.context.beginPath();
            this.context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            this.context.fill();
        }

    }
}