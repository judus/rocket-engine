export default class SpriteSheet {
    constructor(imageUrl, frameWidth, frameHeight, orientation = 0, initialScale = 0.5) {
        this.imageUrl = imageUrl;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frames = [];
        this.isLoadedFlag = false;
        this.imageBitmap = null;
        this.orientation = orientation;
        this.initialScale = initialScale; // Set the initial scale

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
            this.addAllFrames(); // Add all frames after image is loaded
        } catch(error) {
            console.error('Error loading image:', error);
        }
    }

    rotateImage(imageBitmap, orientation) {
        const width = imageBitmap.width;
        const height = imageBitmap.height;

        const sin = Math.abs(Math.sin(orientation));
        const cos = Math.abs(Math.cos(orientation));
        const newWidth = Math.ceil(width * cos + height * sin);
        const newHeight = Math.ceil(width * sin + height * cos);

        const offscreenCanvas = new OffscreenCanvas(newWidth, newHeight);
        const ctx = offscreenCanvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(orientation);
        ctx.translate(-width / 2, -height / 2);

        ctx.drawImage(imageBitmap, 0, 0);

        return offscreenCanvas.transferToImageBitmap();
    }

    getScaledFrameWidth(zoomLevel) {
        return this.frameWidth * this.initialScale * zoomLevel;
    }

    getScaledFrameHeight(zoomLevel) {
        return this.frameHeight * this.initialScale * zoomLevel;
    }

    addAllFrames() {
        if(!this.imageBitmap) {
            console.error('Image bitmap not loaded');
            return;
        }

        const rows = Math.floor(this.imageBitmap.height / this.frameHeight);
        const cols = Math.floor(this.imageBitmap.width / this.frameWidth);
        this.frames = []; // Clear any existing frames

        for(let y = 0; y < rows; y++) {
            for(let x = 0; x < cols; x++) {
                this.addFrame(x * this.frameWidth, y * this.frameHeight);
            }
        }

        // If no frames were added, add a default single frame
        if(this.frames.length === 0) {
            this.addFrame(0, 0);
        }
    }

    addFrame(x, y) {
        this.frames.push({x, y});
    }

    getFrame(index) {
        if(this.frames.length === 0) {
            console.error('Frames array is empty.');
            return null;
        }

        if(index >= 0 && index < this.frames.length) {
            return this.frames[index];
        } else {
            console.warn(`Frame index ${index} out of bounds.`);
            return null;
        }
    }

    isLoaded() {
        return this.isLoadedFlag;
    }
}
