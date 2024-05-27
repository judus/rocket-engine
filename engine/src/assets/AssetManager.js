/**
 * AssetManager class for loading and managing game assets.
 */
export default class AssetManager {
    constructor() {
        this.assets = new Map();
        this.pendingPromises = new Map();
        this.loadedAssets = 0;
        this.totalAssets = 0;
        this.onProgress = null;
        this.onComplete = null;
        this.binaryManager = null;
    }

    /**
     * Sets the BinaryManager instance.
     * @param {BinaryManager} binaryManager - The BinaryManager instance.
     */
    setBinaryManager(binaryManager) {
        this.binaryManager = binaryManager;
    }

    /**
     * Loads an asset manifest and binary data file.
     * @param {string} manifestUrl - URL of the manifest file.
     * @param {string} binaryUrl - URL of the binary data file.
     * @returns {Promise<void>}
     */
    async loadManifestAndBinaryData(manifestUrl, binaryUrl) {
        try {
            const manifestResponse = await fetch(manifestUrl);
            const manifest = await manifestResponse.json();
            const binaryResponse = await fetch(binaryUrl);
            const arrayBuffer = await binaryResponse.arrayBuffer();

            this.totalAssets += manifest.assets.length;

            for(const asset of manifest.assets) {
                const assetData = arrayBuffer.slice(asset.offset, asset.offset + asset.length);
                let loadedAsset;

                if(asset.type === 'image') {
                    loadedAsset = await this.decodeArrayBufferImage(assetData, asset.width, asset.height);
                } else if(asset.type === 'audio') {
                    loadedAsset = await this.decodeArrayBufferAudio(assetData);
                }

                this.assets.set(asset.key, loadedAsset);
                this.assetLoaded();
            }

            if(this.onComplete && this.loadedAssets === this.totalAssets) {
                this.onComplete();
            }
        } catch(error) {
            console.error('Error loading assets:', error);
        }
    }

    /**
     * Loads a binary asset using the BinaryManager.
     * @param {string} key - The key of the binary asset to load.
     * @returns {Promise<void>}
     */
    async loadBinary(key) {
        if(!this.binaryManager) {
            throw new Error('BinaryManager is not set');
        }
        const paths = this.binaryManager.getBinaryPaths(key);
        if(!paths) {
            throw new Error(`No binary paths found for key: ${key}`);
        }
        return this.loadManifestAndBinaryData(paths.manifestPath, paths.binaryPath);
    }

    decodeArrayBufferImage(buffer, width, height) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([buffer], {type: 'image/png'});
            const url = URL.createObjectURL(blob);
            const image = new Image();
            image.src = url;
            image.onload = () => {
                URL.revokeObjectURL(url);
                resolve(image);
            };
            image.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to decode ArrayBuffer image'));
            };
        });
    }

    decodeArrayBufferAudio(buffer) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([buffer], {type: 'audio/mp3'});
            const url = URL.createObjectURL(blob);
            const audio = new Audio();
            audio.src = url;
            audio.oncanplaythrough = () => {
                URL.revokeObjectURL(url);
                resolve(audio);
            };
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to decode ArrayBuffer audio'));
            };
        });
    }

    async loadImage(key, src) {
        if(this.assets.has(key)) {
            return Promise.resolve(this.assets.get(key));
        }
        if(this.pendingPromises.has(key)) {
            return this.pendingPromises.get(key);
        }

        this.totalAssets++;
        const promise = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                this.assetLoaded();
                this.pendingPromises.delete(key);
                this.assets.set(key, image);
                resolve(image);
            };
            image.onerror = () => {
                this.assetError(src);
                this.pendingPromises.delete(key);
                reject(new Error(`Failed to load image: ${src}`));
            };
        });

        this.pendingPromises.set(key, promise);
        return promise;
    }

    async loadSound(key, src) {
        if(this.assets.has(key)) {
            return Promise.resolve(this.assets.get(key));
        }
        if(this.pendingPromises.has(key)) {
            return this.pendingPromises.get(key);
        }

        this.totalAssets++;
        const promise = new Promise((resolve, reject) => {
            const audio = new Audio(src);
            audio.oncanplaythrough = () => {
                this.assetLoaded();
                this.pendingPromises.delete(key);
                this.assets.set(key, audio);
                resolve(audio);
            };
            audio.onerror = () => {
                this.assetError(src);
                this.pendingPromises.delete(key);
                reject(new Error(`Failed to load sound: ${src}`));
            };
        });

        this.pendingPromises.set(key, promise);
        return promise;
    }

    async loadJSON(key, src) {
        if(this.assets.has(key)) {
            return Promise.resolve(this.assets.get(key));
        }
        if(this.pendingPromises.has(key)) {
            return this.pendingPromises.get(key);
        }

        this.totalAssets++;
        const promise = fetch(src)
            .then(response => {
                if(!response.ok) {
                    throw new Error(`Failed to load JSON: ${src}`);
                }
                return response.json();
            })
            .then(data => {
                this.assets.set(key, data);
                this.assetLoaded();
                this.pendingPromises.delete(key);
                return data;
            })
            .catch(error => {
                this.assetError(src);
                this.pendingPromises.delete(key);
                throw error;
            });

        this.pendingPromises.set(key, promise);
        return promise;
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

    assetError(src) {
        console.error(`Failed to load asset: ${src}`);
        this.assetLoaded();
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
