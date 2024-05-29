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

        if(detectionLevel >= DetectionTypes.OUTER_BOX) {
            collisionData.boundingBox = {width: frameWidth, height: frameHeight};
        }

        if(detectionLevel >= DetectionTypes.SUB_BOXES) {
            collisionData.subBoundingBoxes = this.generateBoundingBoxes([{x: 0, y: 0}, {
                x: frameWidth,
                y: frameHeight
            }], frameWidth, frameHeight);
        }

        if(detectionLevel >= DetectionTypes.POLYGON) {
            collisionData.polygon = await PolygonTracer.getVerticesFromImageBitmap(imageBitmap, 2);
        }

        if(detectionLevel >= DetectionTypes.FRAME_POLYGON) {
            for(let i = 0; i < spriteSheet.frames.length; i++) {
                const frame = spriteSheet.getFrame(i);
                const frameImageBitmap = await createImageBitmap(imageBitmap, frame.x, frame.y, frameWidth, frameHeight);
                const framePolygon = await PolygonTracer.getVerticesFromImageBitmap(frameImageBitmap, 2);
                collisionData.framePolygons.push(framePolygon);
            }
        }

        return collisionData;
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

    static generateOuterBox(width, height) {
        return {
            type: 'box',
            width,
            height,
            boxes: [{id: 0, x: 0, y: 0, width, height}]
        };
    }

    static generateSubBoxes(imageBitmap, width, height) {
        const vertices = PolygonTracer.getVerticesFromImageBitmap(imageBitmap);
        const boxes = this.generateBoundingBoxes(vertices, width, height);

        return {
            type: 'multipleBoxes',
            boxes
        };
    }

    static generatePolygon(imageBitmap) {
        const vertices = PolygonTracer.getVerticesFromImageBitmap(imageBitmap);
        return {
            type: 'polygon',
            vertices
        };
    }

    static generateFramePolygons(imageBitmap, frames = 1, width, height) {
        const frameWidth = width / frames;
        const polygons = [];

        for(let i = 0; i < frames; i++) {
            console.log('ImageBitmap', imageBitmap);

            const frameBitmap = this.getFrameBitmap(imageBitmap, i, frameWidth, height);
            console.log('frameBitmap', imageBitmap);

            const vertices = PolygonTracer.getVerticesFromImageBitmap(frameBitmap);
            polygons.push(vertices);
        }

        return {
            type: 'framePolygons',
            polygons
        };
    }

    static getFrameBitmap(imageBitmap, frameIndex, frameWidth, height) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = frameWidth;
        canvas.height = height;
        context.drawImage(imageBitmap, -frameIndex * frameWidth, 0);
        return createImageBitmap(canvas);
    }

    static generateBoundingBoxes(vertices, width, height) {
        // Implement the logic to create multiple bounding boxes from vertices
        // This is a placeholder logic; you'll need to refine it based on your requirements
        const boxes = [];
        const boxWidth = width / 2;
        const boxHeight = height / 2;

        for(let i = 0; i < vertices.length; i += 2) {
            boxes.push({
                id: i / 2,
                x: vertices[i].x - boxWidth / 2,
                y: vertices[i].y - boxHeight / 2,
                width: boxWidth,
                height: boxHeight
            });
        }

        return boxes;
    }
}
