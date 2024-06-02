import FollowComponent from "../../../../engine/src/cameras/FollowComponent.js";

export default class StarBackground {
    constructor(context, width, height, numStars, parallaxFactor) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.parallaxFactor = parallaxFactor;
        this.stars = this.createStars(numStars);
        this.shootingStars = [];
        this.lastShootingStarTime = 0;
    }

    createStars(numStars) {
        const stars = [];
        for(let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 3 + 2, // Slightly larger size for out-of-focus effect
                opacity: Math.random() * 0.8 + 0.8, // Random opacity for transparency effect
                color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`, // Random opacity for stars
                twinkle: Math.random() * 0.05 // Twinkle effect variation
            });
        }
        return stars;
    }

    createShootingStar() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            length: Math.random() * 80 + 20,
            speed: Math.random() * 5 + 5,
            opacity: Math.random() * 0.5 + 0.5
        };
    }

    render(scene) {
        let vel = {x: 0, y: 0};

        const cameraTarget = scene.camera.getComponent(FollowComponent).target;
        if(cameraTarget) {
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
        if(currentTime - this.lastShootingStarTime > 3000 && Math.random() > 0.9) {
            //this.shootingStars.push(this.createShootingStar());
            this.lastShootingStarTime = currentTime;
        }

        this.context.clearRect(0, 0, this.width, this.height); // Clear the canvas before drawing

        for(const star of this.stars) {
            const twinkleOpacity = star.opacity + Math.sin(currentTime * star.twinkle) * 0.3;
            this.context.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
            this.context.beginPath();
            this.context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            this.context.fill();
        }

        for(const shootingStar of this.shootingStars) {
            shootingStar.x += shootingStar.speed;
            shootingStar.y += shootingStar.speed;

            this.context.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
            this.context.lineWidth = 2;
            this.context.beginPath();
            this.context.moveTo(shootingStar.x, shootingStar.y);
            this.context.lineTo(shootingStar.x - shootingStar.length, shootingStar.y - shootingStar.length);
            this.context.stroke();

            // Remove shooting star if out of bounds
            if(shootingStar.x > this.width || shootingStar.y > this.height) {
                this.shootingStars = this.shootingStars.filter(s => s !== shootingStar);
            }
        }
    }
}
