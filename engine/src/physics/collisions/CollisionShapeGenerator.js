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
            collisionData.subBoundingBoxes = this.generateBoundingBoxes([{x: 0, y: 0}, {
                x: frameWidth,
                y: frameHeight
            }], frameWidth, frameHeight);
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
            collisionData.subBoundingBoxes = this.generateBoundingBoxes([{x: 0, y: 0}, {
                x: frameWidth,
                y: frameHeight
            }], frameWidth, frameHeight);
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

    static generateBoundingBoxes(vertices, width, height) {
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
