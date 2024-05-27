export default class MainBox {
    constructor(context, x, y, config, items) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.config = config;
        this.items = items;
        this.width = 0;
        this.height = 0;

        this.calculateDimensions();
        console.log(`MainBox created at x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height}`);
    }

    calculateDimensions() {
        if(!this.context) {
            console.error("Context is not defined in MainBox");
            return;
        }

        this.context.font = `${this.config.itemBox.fontSize}px ${this.config.itemBox.font}`;
        this.width = this.items.reduce((maxWidth, item) => {
            const textWidth = this.context.measureText(item).width;
            return Math.max(maxWidth, textWidth);
        }, 0);

        this.width += this.config.itemBox.padding * 2;
        this.width += this.config.mainBox.padding * 2;

        this.height = this.items.length * (this.config.itemBox.fontSize + this.config.itemBox.padding * 2 + this.config.itemBox.spacing) - this.config.itemBox.spacing;
        this.height += this.config.mainBox.padding * 2;

        console.log(`Calculated dimensions: width=${this.width}, height=${this.height}`);
    }

    render(context, x, y) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.calculateDimensions(); // Ensure dimensions are calculated before rendering

        // Draw main box
        context.fillStyle = this.config.mainBox.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        // Draw items
        this.items.forEach((item, index) => {
            const itemX = this.x + this.config.mainBox.padding;
            const itemY = this.y + this.config.mainBox.padding + index * (this.config.itemBox.fontSize + this.config.itemBox.padding * 2 + this.config.itemBox.spacing);

            context.fillStyle = this.config.itemBox.color;
            context.fillRect(itemX, itemY, this.width - this.config.mainBox.padding * 2, this.config.itemBox.fontSize + this.config.itemBox.padding * 2);

            context.fillStyle = this.config.itemBox.textColor;
            context.font = `${this.config.itemBox.fontSize}px ${this.config.itemBox.font}`;
            context.fillText(item, itemX + this.config.itemBox.padding, itemY + this.config.itemBox.fontSize + this.config.itemBox.padding);
        });

        console.log(`Rendering MainBox at x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height}`);
    }
}
