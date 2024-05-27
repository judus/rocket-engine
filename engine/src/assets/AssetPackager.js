const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const {Image} = require('canvas');

class AssetPackager {
    constructor(configPath, outputName) {
        this.configPath = configPath;
        this.outputDirectory = path.resolve(process.cwd(), 'output');
        this.manifestFileName = 'assets.json';
        this.binaryFileName = outputName;
    }

    readFileAsBuffer(filePath) {
        return fs.readFileSync(filePath);
    }

    async fetchFileAsBuffer(url) {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
        }
        return await response.buffer();
    }

    async packageAssets() {
        const manifest = {
            assets: []
        };
        let currentOffset = 0;
        const binaryData = [];

        if(!fs.existsSync(this.outputDirectory)) {
            fs.mkdirSync(this.outputDirectory);
        }

        const config = JSON.parse(fs.readFileSync(this.configPath));

        for(const dir of config.localDirectories) {
            const assetFiles = fs.readdirSync(dir);
            for(const file of assetFiles) {
                const filePath = path.join(dir, file);
                const fileBuffer = this.readFileAsBuffer(filePath);
                const assetKey = path.parse(file).name;
                const assetType = path.extname(file).slice(1);

                const asset = {
                    key: assetKey,
                    type: assetType,
                    offset: currentOffset,
                    length: fileBuffer.length
                };

                if(assetType === 'png' || assetType === 'jpg' || assetType === 'jpeg') {
                    const image = new Image();
                    image.src = `data:image/${assetType};base64,${fileBuffer.toString('base64')}`;
                    asset.width = image.width;
                    asset.height = image.height;
                }

                manifest.assets.push(asset);
                binaryData.push(fileBuffer);
                currentOffset += fileBuffer.length;
            }
        }

        for(const remoteFile of config.remoteFiles) {
            const {key, type, url} = remoteFile;
            const fileBuffer = await this.fetchFileAsBuffer(url);

            const asset = {
                key: key,
                type: type,
                offset: currentOffset,
                length: fileBuffer.length
            };

            if(type === 'image') {
                const image = new Image();
                image.src = `data:image/${path.extname(url).slice(1)};base64,${fileBuffer.toString('base64')}`;
                asset.width = image.width;
                asset.height = image.height;
            }

            manifest.assets.push(asset);
            binaryData.push(fileBuffer);
            currentOffset += fileBuffer.length;
        }

        const binaryBuffer = Buffer.concat(binaryData);
        fs.writeFileSync(path.join(this.outputDirectory, this.binaryFileName), binaryBuffer);
        fs.writeFileSync(path.join(this.outputDirectory, this.manifestFileName), JSON.stringify(manifest, null, 2));
    }
}

module.exports = AssetPackager;
