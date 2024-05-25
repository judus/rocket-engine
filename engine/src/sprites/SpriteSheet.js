export default class SpriteSheet {
    constructor(imageUrl, frameWidth, frameHeight) {
        this.image = new Image();
        this.image.src = imageUrl;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frames = [];
    }

    addFrame(x, y) {
        this.frames.push({x, y});
    }

    getFrame(index) {
        return this.frames[index];
    }

    isLoaded() {
        return this.image.complete && this.image.naturalHeight !== 0;
    }
}
