// BinaryManager.js

import fs from 'fs';
import path from 'path';

export default class BinaryManager {
    constructor() {
        this.binaries = new Map();
    }

    addBinary(key, manifestPath, binaryPath) {
        this.binaries.set(key, {manifestPath, binaryPath});
    }

    getBinaryPaths(key) {
        return this.binaries.get(key);
    }

    static createBinaryPackage(outputPath, assets) {
        const manifest = {
            assets: [],
        };
        const buffers = [];

        let currentOffset = 0;

        assets.forEach(asset => {
            const data = fs.readFileSync(asset.filePath);
            const length = data.length;

            manifest.assets.push({
                key: asset.key,
                type: asset.type,
                offset: currentOffset,
                length: length,
                width: asset.width,
                height: asset.height,
            });

            buffers.push(data);
            currentOffset += length;
        });

        const manifestJson = JSON.stringify(manifest);
        const manifestBuffer = Buffer.from(manifestJson, 'utf-8');

        buffers.unshift(manifestBuffer);

        fs.writeFileSync(outputPath, Buffer.concat(buffers));
    }
}

BinaryManager;
