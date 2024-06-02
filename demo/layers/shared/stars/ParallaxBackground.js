import BaseLayer from "../../../../engine/src/scenes/BaseLayer.js";
import StarBackground from "./StarBackground.js";
import FollowComponent from "../../../../engine/src/cameras/FollowComponent.js";
import StarBackground1 from "./StarBackground1.js";
import Nebula1 from "./Nebula1.js";

export default class ParallaxBackground extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
        this.layers = [
            new StarBackground(context, this.canvas.width, this.canvas.height, 40, 0.001), // Distant stars
            new StarBackground(context, this.canvas.width, this.canvas.height, 40, 0.01), // Distant stars
            new StarBackground1(context, this.canvas.width, this.canvas.height, 50, 0.1), // Medium distance stars
            //new StarBackground(context, this.canvas.width, this.canvas.height, 100, 0.008), // Closer stars
        ];
        this.lazy = false;
    }

    render(scene) {
        this.clear();
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for(const layer of this.layers) {
            layer.render(scene);
        }
    }
}