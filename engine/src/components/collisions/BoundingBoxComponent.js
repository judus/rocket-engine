import BaseComponent from "../../abstracts/BaseComponent.js";

export default class BoundingBoxComponent extends BaseComponent {
    constructor(...boxes) {
        super();
        this.boxes = boxes.map((box, index) => ({id: index, ...box}));
    }

    setBounds(...boxes) {
        this.boxes = boxes.map((box, index) => ({id: index, ...box}));
    }

    getBounds(entityPos, entityRotation) {
        return this.boxes.map(box => {
            const {x, y, width, height} = box;

            // Calculate the corners of the bounding box
            const corners = [
                {x: x - width / 2, y: y - height / 2},
                {x: x + width / 2, y: y - height / 2},
                {x: x + width / 2, y: y + height / 2},
                {x: x - width / 2, y: y + height / 2}
            ];

            // Adjust rotation by 90 degrees (π/2 radians)
            const adjustedRotation = entityRotation - Math.PI / 2;

            const cos = Math.cos(adjustedRotation);
            const sin = Math.sin(adjustedRotation);

            const rotatedCorners = corners.map(corner => {
                return {
                    x: entityPos.x + (corner.x * cos - corner.y * sin),
                    y: entityPos.y + (corner.x * sin + corner.y * cos)
                };
            });

            // Calculate the bounding box of the rotated corners
            const xs = rotatedCorners.map(corner => corner.x);
            const ys = rotatedCorners.map(corner => corner.y);

            return {
                id: box.id,
                left: Math.min(...xs),
                right: Math.max(...xs),
                top: Math.min(...ys),
                bottom: Math.max(...ys)
            };
        });
    }
}
