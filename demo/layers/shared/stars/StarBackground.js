import FollowComponent from "../../../../engine/src/cameras/FollowComponent.js";

export default class StarBackground {
    constructor(context, width, height, numStars, parallaxFactor) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.parallaxFactor = parallaxFactor;
        this.stars = this.createStars(numStars);
        this.colorChangingStars = this.assignColorChangingStars(10); // Adjust number of color-changing stars as needed
    }

    createStars(numStars) {
        const stars = [];
        for(let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 0.5 + 1,
                color: 'white',
                isColorChanging: false,
                colorChangeRate: 0,
                colorChangePhase: 0
            });
        }
        return stars;
    }

    assignColorChangingStars(numColorChangingStars) {
        const colorChangingStars = [];
        for(let i = 0; i < numColorChangingStars; i++) {
            const star = this.stars[Math.floor(Math.random() * this.stars.length)];
            star.isColorChanging = true;
            star.colorChangeRate = Math.random() * 0.05 + 0.01;
            star.colorChangePhase = Math.random() * 2 * Math.PI;
            star.colorPairs = Math.random() < 0.5
                ? ['rgba(255, 0, 0, 0.75)', 'rgba(0, 0, 255, 0.75)']
                : ['rgba(0, 255, 0, 0.75)', 'rgba(255, 255, 0, 0.75)'];
            colorChangingStars.push(star);
        }
        return colorChangingStars;
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

        const currentTime = Date.now() / 1000;
        for(const star of this.colorChangingStars) {
            star.colorChangePhase += star.colorChangeRate;
            const colorIndex = Math.floor((Math.sin(star.colorChangePhase) + 1) / 2 * star.colorPairs.length);
            star.color = star.colorPairs[colorIndex];
        }


        for(const star of this.stars) {
            this.context.fillStyle = star.color;
            this.context.beginPath();
            this.context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            this.context.fill();
        }
    }
}
