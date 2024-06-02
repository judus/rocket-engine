import FollowComponent from "../../../../engine/src/cameras/FollowComponent.js";

export default class Nebula1 {
    constructor(context, width, height, amount) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.nebulaClouds = this.createNebulaClouds(amount)
        this.lazy = true;
    }

    createNebulaClouds(numClouds) {
        const clouds = [];
        for(let i = 0; i < numClouds; i++) {
            clouds.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 800 + 1200,
                color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.001 + 0.02})`
            });
        }
        return clouds;
    }

    render(scene) {
        // Existing code...

        // Render nebula clouds
        for(const cloud of this.nebulaClouds) {
            const gradient = this.context.createRadialGradient(cloud.x, cloud.y, cloud.radius / 2, cloud.x, cloud.y, cloud.radius);
            gradient.addColorStop(0, cloud.color);
            gradient.addColorStop(1, 'transparent');

            this.context.fillStyle = gradient;
            this.context.beginPath();
            this.context.arc(cloud.x, cloud.y, cloud.radius, 0, 2 * Math.PI);
            this.context.fill();
        }

        // Existing code...
    }
}