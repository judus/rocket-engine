import DetectionTypes from './DetectionTypes.js';
import PolygonTracer from "./PolygonTracer.js";

export default class CollisionShapeGenerator {
    static async generateCollisionData(spriteSheet, detectionLevel) {
        const {imageBitmap, frameWidth, frameHeight} = spriteSheet;
        const collisionData = {
            boundingBox: {width: frameWidth, height: frameHeight},
            subBoundingBoxes: [],
            polygon: [],
            framePolygons: []
        };

        // Always generate bounding box data
        collisionData.boundingBox = {width: frameWidth, height: frameHeight};

        if(detectionLevel >= DetectionTypes.SUB_BOXES) {
            collisionData.subBoundingBoxes = await this.generateCollisionBoxes(imageBitmap, frameWidth, frameHeight);
        }

        if(detectionLevel >= DetectionTypes.POLYGON) {
            const polygon = await PolygonTracer.getVerticesFromImageBitmap(imageBitmap, 2);
            collisionData.polygon = this.centerFramePolygon(polygon, frameWidth, frameHeight);
        }

        if(detectionLevel >= DetectionTypes.FRAME_POLYGON) {
            for(let i = 0; i < spriteSheet.frames.length; i++) {
                const frame = spriteSheet.getFrame(i);
                const frameImageBitmap = await createImageBitmap(imageBitmap, frame.x, frame.y, frameWidth, frameHeight);
                const framePolygon = await PolygonTracer.getVerticesFromImageBitmap(frameImageBitmap, 2);
                collisionData.framePolygons.push(this.centerFramePolygon(framePolygon, frameWidth, frameHeight));
            }
        }

        return collisionData;
    }

    static generateDefaultCollisionData(detectionLevel) {
        const frameWidth = 50; // Default width
        const frameHeight = 50; // Default height
        const collisionData = {
            boundingBox: {width: frameWidth, height: frameHeight},
            subBoundingBoxes: [],
            polygon: [],
            framePolygons: []
        };

        if(detectionLevel >= DetectionTypes.OUTER_BOX) {
            collisionData.boundingBox = {width: frameWidth, height: frameHeight};
        }

        if(detectionLevel >= DetectionTypes.SUB_BOXES) {
            collisionData.subBoundingBoxes = this.generateDefaultSubBoundingBoxes(frameWidth, frameHeight);
        }

        if(detectionLevel >= DetectionTypes.POLYGON) {
            collisionData.polygon = this.generateDefaultPolygon(frameWidth, frameHeight);
        }

        if(detectionLevel >= DetectionTypes.FRAME_POLYGON) {
            collisionData.framePolygons = [this.generateDefaultPolygon(frameWidth, frameHeight)];
        }

        return collisionData;
    }

    static generateDefaultPolygon(width, height) {
        // Simple default polygon (a rectangle)
        return [
            {x: 0, y: 0},
            {x: width, y: 0},
            {x: width, y: height},
            {x: 0, y: height}
        ];
    }

    static generateDefaultSubBoundingBoxes(frameWidth, frameHeight) {
        // Simple default sub-bounding boxes (dividing the frame into 4 sub-boxes)
        const boxWidth = frameWidth / 2;
        const boxHeight = frameHeight / 2;
        return [
            {x: 0, y: 0, width: boxWidth, height: boxHeight},
            {x: boxWidth, y: 0, width: boxWidth, height: boxHeight},
            {x: 0, y: boxHeight, width: boxWidth, height: boxHeight},
            {x: boxWidth, y: boxHeight, width: boxWidth, height: boxHeight}
        ];
    }

    static centerFramePolygon(vertices, frameWidth, frameHeight) {
        const offsetX = frameWidth / 2;
        const offsetY = frameHeight / 2;

        return vertices.map(vertex => ({
            x: vertex.x - offsetX,
            y: vertex.y - offsetY
        }));
    }

    static async loadImageBitmap(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.crossOrigin = "Anonymous"; // This is necessary for cross-origin images
            image.onload = async () => {
                const bitmap = await createImageBitmap(image);
                resolve(bitmap);
            };
            image.onerror = reject;
        });
    }

    static async generateCollisionBoxes(imageBitmap, width, height) {
        const boxes = [];
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.drawImage(imageBitmap, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const data = imageData.data;

        const boxSize = 8; // Adjusted size of each collision box for better performance
        const tolerance = 0.5; // Tolerance for merging boxes

        // First pass: create initial boxes
        const initialBoxes = [];
        for(let y = 0; y < height; y += boxSize) {
            for(let x = 0; x < width; x += boxSize) {
                let alphaSum = 0;
                for(let dy = 0; dy < boxSize; dy++) {
                    for(let dx = 0; dx < boxSize; dx++) {
                        const index = ((y + dy) * width + (x + dx)) * 4 + 3;
                        alphaSum += data[index];
                    }
                }
                if(alphaSum > 3000) {
                    initialBoxes.push({
                        x: x,
                        y: y,
                        width: boxSize,
                        height: boxSize
                    });
                }
            }
        }

        // Second pass: combine adjacent boxes vertically
        const mergedBoxesVertically = [];
        initialBoxes.forEach(box => {
            const existingBox = mergedBoxesVertically.find(b =>
                b.x === box.x && b.y + b.height === box.y
            );
            if(existingBox) {
                existingBox.height += box.height;
            } else {
                mergedBoxesVertically.push({...box});
            }
        });

        // Third pass: combine adjacent boxes horizontally
        const mergedBoxesHorizontally = [];
        mergedBoxesVertically.forEach(box => {
            const existingBox = mergedBoxesHorizontally.find(b =>
                b.y === box.y && b.x + b.width === box.x
            );
            if(existingBox) {
                existingBox.width += box.width;
            } else {
                mergedBoxesHorizontally.push({...box});
            }
        });

        // Adjust positions to account for the center
        mergedBoxesHorizontally.forEach(box => {
            box.x -= width / 2 - box.width / 2;
            box.y -= height / 2 - box.height / 2;
        });

        return mergedBoxesHorizontally;
    }
}
