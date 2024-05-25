import BaseLayer from "./rendering/BaseLayer.js";

export default class LoadingScreenLayer {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }

    render(scene, deltaTime) {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = '#6B1919';
        this.context.font = '64px sans-serif';
        this.context.textAlign = 'center';
        this.context.fillText('LOADING...', this.canvas.width / 2, this.canvas.height / 2);
    }
}
