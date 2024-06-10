export default class SpriteSheet {
    constructor(imageUrl, frameWidth, frameHeight, orientation = 0) {
        this.imageUrl = imageUrl;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frames = [];
        this.isLoadedFlag = false;
        this.imageBitmap = null;
        this.orientation = orientation;

        this.loadImage();
    }

    async loadImage() {
        try {
            const image = new Image();
            image.src = this.imageUrl;
            await new Promise((resolve, reject) => {
                image.onload = resolve;
                image.onerror = reject;
            });
            this.imageBitmap = await createImageBitmap(image);
            this.imageBitmap = this.rotateImage(this.imageBitmap, this.orientation);
            this.isLoadedFlag = true;
            this.addFrame(0, 0); // Add a single frame for now
        } catch(error) {
            console.error('Error loading image:', error);
        }
    }

    rotateImage(imageBitmap, orientation) {
        const width = imageBitmap.width;
        const height = imageBitmap.height;

        // Calculate the bounding box dimensions for the rotated image
        const sin = Math.abs(Math.sin(orientation));
        const cos = Math.abs(Math.cos(orientation));
        const newWidth = Math.ceil(width * cos + height * sin);
        const newHeight = Math.ceil(width * sin + height * cos);

        const offscreenCanvas = new OffscreenCanvas(newWidth, newHeight);
        const ctx = offscreenCanvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        // Translate and rotate the canvas
        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(orientation);
        ctx.translate(-width / 2, -height / 2);

        // Draw the image
        ctx.drawImage(imageBitmap, 0, 0);

        // Add red border for visualization
        // ctx.strokeStyle = 'red';
        // ctx.lineWidth = 5;
        // ctx.strokeRect(0, 0, width, height);

        return offscreenCanvas.transferToImageBitmap();
    }

    addFrame(x, y) {
        this.frames.push({x, y});
    }

    getFrame(index) {
        return this.frames[index];
    }

    isLoaded() {
        return this.isLoadedFlag;
    }
}
