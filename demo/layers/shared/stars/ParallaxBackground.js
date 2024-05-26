import BaseLayer from "../../../../engine/src/scenes/BaseLayer.js";
import StarBackground from "./StarBackground.js";
import FollowComponent from "../../../../engine/src/cameras/FollowComponent.js";

export default class ParallaxBackground extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
        this.layers = [
            new StarBackground(context, this.canvas.width, this.canvas.height, 100, 0.001), // Distant stars
            new StarBackground(context, this.canvas.width, this.canvas.height, 100, 0.005), // Medium distance stars
            new StarBackground(context, this.canvas.width, this.canvas.height, 100, 0.008), // Closer stars
        ];
    }

    render(scene) {
        this.clear();
        for(const layer of this.layers) {
            layer.render(scene);
        }
    }
}