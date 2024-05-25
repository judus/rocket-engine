class ImageHelper {

    /**
     * Loads an image from a URL.
     * @param {string} url - The URL of the image.
     * @returns {Promise<HTMLImageElement>} A promise that resolves to the loaded image.
     */
    static loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    /**
     * Resizes an image to the specified width and height.
     * @param {HTMLImageElement} img - The image to resize.
     * @param {number} width - The target width.
     * @param {number} height - The target height.
     * @returns {HTMLCanvasElement} A canvas element containing the resized image.
     */
    static resizeImage(img, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        return canvas;
    }

    /**
     * Converts an image to a base64 data URL.
     * @param {HTMLImageElement} img - The image to convert.
     * @returns {string} The base64 data URL.
     */
    static imageToBase64(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL();
    }

    /**
     * Converts a base64 data URL to an image.
     * @param {string} base64 - The base64 data URL.
     * @returns {Promise<HTMLImageElement>} A promise that resolves to the created image.
     */
    static base64ToImage(base64) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = base64;
        });
    }

    /**
     * Creates an image element with the specified width, height, and source.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     * @param {string} src - The source URL of the image.
     * @returns {HTMLImageElement} The created image element.
     */
    static createImage(width, height, src) {
        const img = document.createElement('img');
        img.width = width;
        img.height = height;
        img.src = src;
        return img;
    }

    /**
     * Draws a rectangular portion of an image onto a canvas.
     * @param {HTMLImageElement} img - The source image.
     * @param {number} sx - The x coordinate of the top-left corner of the source rectangle.
     * @param {number} sy - The y coordinate of the top-left corner of the source rectangle.
     * @param {number} sWidth - The width of the source rectangle.
     * @param {number} sHeight - The height of the source rectangle.
     * @param {number} dx - The x coordinate of the top-left corner of the destination rectangle.
     * @param {number} dy - The y coordinate of the top-left corner of the destination rectangle.
     * @param {number} dWidth - The width of the destination rectangle.
     * @param {number} dHeight - The height of the destination rectangle.
     * @returns {HTMLCanvasElement} A canvas element with the drawn portion of the image.
     */
    static drawImagePortion(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        const canvas = document.createElement('canvas');
        canvas.width = dWidth;
        canvas.height = dHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        return canvas;
    }

    /**
     * Creates an image element from base64 data.
     * @param {string} base64 - The base64-encoded image data.
     * @returns {Promise<HTMLImageElement>} A promise that resolves to the created image element.
     */
    static createImageFromBase64(base64) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = `data:image/png;base64,${base64}`;
        });
    }
}
