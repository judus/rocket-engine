export class PanelItem {
    constructor(text, callback) {
        this.text = text;
        this.callback = callback;
    }

    render(context, x, y) {
        // Basic rendering logic
    }

    handleClick(mouseX, mouseY) {
        if(this.callback) this.callback();
    }
}

export class HeaderItem extends PanelItem {
    render(context, x, y) {
        context.font = 'bold 16px Arial';
        context.fillStyle = '#fff';
        context.fillText(this.text, x, y);
    }
}

export class TextItem extends PanelItem {
    render(context, x, y) {
        context.font = '14px Arial';
        context.fillStyle = '#fff';
        context.fillText(this.text, x, y);
    }
}

export class ActionItem extends PanelItem {
    render(context, x, y) {
        context.font = '14px Arial';
        context.fillStyle = '#fff';
        context.fillText(this.text, x, y);
    }
}

export class ImageActionItem extends PanelItem {
    constructor(image, callback) {
        super('', callback);
        this.image = image;
    }

    render(context, x, y) {
        context.drawImage(this.image, x, y);
    }
}

export class TitleItem extends PanelItem {
    render(context, x, y) {
        context.font = 'bold 14px Arial';
        context.fillStyle = '#fff';
        context.fillText(this.text, x, y);
    }
}
