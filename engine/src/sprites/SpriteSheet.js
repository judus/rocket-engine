export default class SpriteSheet {
    constructor(imageUrl, frameWidth, frameHeight) {
        this.imageUrl = imageUrl;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frames = [];
        this.loaded = false;
        this.imageBitmap = null;

        this.loadImage();
    }

    async loadImage() {
        const image = new Image();
        image.src = this.imageUrl;
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });
        this.imageBitmap = await createImageBitmap(image);
        this.loaded = true;
        this.addFrame(0, 0); // Add a single frame for now
    }

    addFrame(x, y) {
        this.frames.push({x, y});
    }

    getFrame(index) {
        return this.frames[index];
    }

    isLoaded() {
        return this.loaded;
    }
}
