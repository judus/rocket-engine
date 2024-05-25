import BaseLayer from "./rendering/BaseLayer.js";

export default class GameOverLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
    }

    render(scene) {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = '#6b1919';
        this.context.font = '64px sans-serif';
        this.context.textAlign = 'center';
        this.context.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
    }
}
