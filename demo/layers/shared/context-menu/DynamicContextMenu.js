import BorderBox from './BorderBox.js';
import MainBox from './MainBox.js';

export default class DynamicContextMenu {
    constructor(x, y, items, config) {
        this.x = x;
        this.y = y;
        this.items = items;
        this.config = config;
        this.context = null; // Will be set during render

        this.mainBox = new MainBox(null, this.x + this.config.borderBox.padding, this.y + this.config.borderBox.padding, this.config, this.items);
        this.borderBox = new BorderBox(this.x, this.y, this.mainBox, this.config);

        console.log(`DynamicContextMenu created at x: ${this.x}, y: ${this.y}`);
    }

    render(context, posX, posY) {
        this.context = context;
        this.borderBox.x = posX; // Update position based on passed values
        this.borderBox.y = posY;
        console.log(`Rendering DynamicContextMenu at x: ${this.borderBox.x}, y: ${this.borderBox.y}`);
        this.borderBox.render(this.context);
    }
}
