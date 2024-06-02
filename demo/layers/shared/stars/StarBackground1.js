import FollowComponent from "../../../../engine/src/cameras/FollowComponent.js";

export default class StarBackground1 {
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
                opacity: Math.random() * 0.8 + 0.8, // Random opacity for transparency effect
                color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.2})`, // Random opacity for stars
                twinkle: Math.random() * 0.05 // Twinkle effect variation
            });
        }
        return stars;
    }

    render(scene) {
        let vel = {x: 0, y: 0};
        let target = null;

        const cameraTarget = scene.camera.getComponent(FollowComponent).target;
        if (cameraTarget) {
            vel = cameraTarget.velocity;
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

        const currentTime = Date.now();

        for(const star of this.stars) {
            const twinkleOpacity = star.opacity + Math.sin(currentTime * star.twinkle) * 0.3;
            this.context.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
            this.context.beginPath();
            this.context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            this.context.fill();
        }
    }
}