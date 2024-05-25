export default class AssetManager {
    constructor() {
        this.assets = new Map();
        this.loadedAssets = 0;
        this.totalAssets = 0;
        this.onProgress = null;
        this.onComplete = null;
    }

    loadImage(key, src) {
        this.totalAssets++;
        const image = new Image();
        image.src = src;
        image.onload = () => this.assetLoaded();
        this.assets.set(key, image);
    }

    loadSound(key, src) {
        this.totalAssets++;
        const audio = new Audio(src);
        audio.oncanplaythrough = () => this.assetLoaded();
        this.assets.set(key, audio);
    }

    loadJSON(key, src) {
        this.totalAssets++;
        fetch(src)
            .then(response => response.json())
            .then(data => {
                this.assets.set(key, data);
                this.assetLoaded();
            });
    }

    assetLoaded() {
        this.loadedAssets++;
        if(this.onProgress) {
            this.onProgress(this.loadedAssets / this.totalAssets);
        }
        if(this.loadedAssets === this.totalAssets && this.onComplete) {
            this.onComplete();
        }
    }

    getAsset(key) {
        return this.assets.get(key);
    }

    setProgressHandler(callback) {
        this.onProgress = callback;
    }

    setCompleteHandler(callback) {
        this.onComplete = callback;
    }
}
