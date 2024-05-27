export default class BorderBox {
    constructor(x, y, mainBox, config) {
        this.x = x;
        this.y = y;
        this.mainBox = mainBox;
        this.config = config;
        this.width = 0;
        this.height = 0;

        this.calculateDimensions();
        console.log(`BorderBox created at x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height}`);
    }

    calculateDimensions() {
        this.width = this.mainBox.width + 2 * this.config.borderBox.padding;
        this.height = this.mainBox.height + 2 * this.config.borderBox.padding;
        console.log(`Calculated BorderBox dimensions: width=${this.width}, height=${this.height}`);
    }

    render(context) {
        this.calculateDimensions(); // Ensure dimensions are calculated before rendering

        // Draw border box
        context.fillStyle = this.config.borderBox.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        // Draw inner main box
        this.mainBox.render(context, this.x + this.config.borderBox.padding, this.y + this.config.borderBox.padding);

        console.log(`Rendering BorderBox at x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height}`);
    }
}
