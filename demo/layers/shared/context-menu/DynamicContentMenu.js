import BorderBox from './BorderBox.js';
import MainBox from './MainBox.js';

export default class DynamicContentMenu {
    constructor(x, y, panel, config) {
        this.x = x;
        this.y = y;
        this.panel = panel;
        this.config = config;
    }

    render(context, posX, posY) {
        context.save();
        context.translate(posX, posY);

        // Render border box
        const {borderBox, mainBox} = this.config;
        const width = mainBox.width + borderBox.padding * 2;
        const height = mainBox.height + borderBox.padding * 2;

        context.fillStyle = borderBox.color;
        context.fillRect(-borderBox.padding, -borderBox.padding, width, height);

        context.strokeStyle = borderBox.borderColor;
        context.lineWidth = borderBox.borderWidth;
        context.strokeRect(-borderBox.padding, -borderBox.padding, width, height);

        // Render main box
        context.fillStyle = mainBox.color;
        context.fillRect(0, 0, mainBox.width, mainBox.height);

        context.strokeStyle = mainBox.borderColor;
        context.lineWidth = mainBox.borderWidth;
        context.strokeRect(0, 0, mainBox.width, mainBox.height);

        // Render panel (which contains rows and columns)
        this.panel.render(context, mainBox.padding, mainBox.padding);

        context.restore();
    }

    handleClick(mouseX, mouseY) {
        // Handle clicks on panel items
        return this.panel.handleClick(mouseX, mouseY);
    }
}