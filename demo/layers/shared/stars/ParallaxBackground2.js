import BaseLayer from "../../../../engine/src/scenes/BaseLayer.js";
import StarBackground from "./StarBackground.js";
import FollowComponent from "../../../../engine/src/cameras/FollowComponent.js";
import StarBackground2 from "./StarBackground2.js";
import Nebula1 from "./Nebula1.js";

export default class ParallaxBackground2 extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
        this.layers = [
            //new StarBackground(context, this.canvas.width, this.canvas.height, 100, 0.001), // Distant stars
            //new StarBackground(context, this.canvas.width, this.canvas.height, 100, 0.005), // Medium distance stars
            new StarBackground2(context, this.canvas.width, this.canvas.height, 10, 0.8), // Closer stars
            new Nebula1(context, this.canvas.width, this.canvas.height, 10), // Nebula clouds

        ];
        this.lazy = false;
    }

    render(scene) {
        this.clear();
        for(const layer of this.layers) {
            layer.render(scene);
        }
    }
}