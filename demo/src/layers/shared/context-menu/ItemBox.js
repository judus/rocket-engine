export default class ItemBox {
    constructor(text, x, y, width, height, config) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.config = config;
    }

    render(context) {
        context.fillStyle = this.config.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = this.config.textColor;
        context.font = `${this.config.fontSize}px ${this.config.font}`;
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
}
