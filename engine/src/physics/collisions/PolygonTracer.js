export default class PolygonTracer {
    static async getVerticesFromImageUrl(imageUrl, precision = 2) {
        const imageBitmap = await this.loadImageBitmap(imageUrl);
        return this.getVerticesFromImageBitmap(imageBitmap, precision);
    }

    static async getVerticesFromImageBitmap(imageBitmap, precision = 2) {
        const imageData = this.getImageData(imageBitmap);
        const edges = this.detectEdges(imageData);
        return this.simplifyPolygon(edges, precision);
    }

    static loadImageBitmap(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.crossOrigin = "Anonymous"; // This is necessary for cross-origin images
            image.onload = async () => {
                try {
                    const bitmap = await createImageBitmap(image);
                    console.log("ImageBitmap created:", bitmap);
                    resolve(bitmap);
                } catch(error) {
                    console.error("Error creating ImageBitmap:", error);
                    reject(error);
                }
            };
            image.onerror = (error) => {
                console.error("Image load error:", error);
                reject(error);
            };
        });
    }

    static getImageData(imageBitmap) {
        if(!(imageBitmap instanceof ImageBitmap)) {
            console.error("Invalid ImageBitmap provided.");
            return null;
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        context.drawImage(imageBitmap, 0, 0);
        return context.getImageData(0, 0, imageBitmap.width, imageBitmap.height);
    }

    static detectEdges(imageData, alphaThreshold = 0.1) {
        const {width, height, data} = imageData;
        const getAlpha = (x, y) => data[(y * width + x) * 4 + 3] / 255;

        const directions = [
            {x: 1, y: 0},  // Right
            {x: 0, y: 1},  // Down
            {x: -1, y: 0}, // Left
            {x: 0, y: -1}  // Up
        ];

        const march = (startX, startY) => {
            const contour = [];
            let x = startX, y = startY;
            let direction = 0; // Start by moving to the right
            const visited = new Set();
            const startKey = `${x},${y}`;
            let maxSteps = width * height; // Safety limit to prevent infinite loops

            do {
                const key = `${x},${y}`;
                if(visited.has(key)) break;
                visited.add(key);
                contour.push({x, y});

                let found = false;
                for(let i = 0; i < 4; i++) {
                    const newDirection = (direction + i) % 4;
                    const newX = x + directions[newDirection].x;
                    const newY = y + directions[newDirection].y;

                    if(newX >= 0 && newY >= 0 && newX < width && newY < height && getAlpha(newX, newY) >= alphaThreshold) {
                        x = newX;
                        y = newY;
                        direction = newDirection;
                        found = true;
                        break;
                    }
                }
                if(!found) break; // If no move was made, break the loop

                maxSteps--;
                if(maxSteps <= 0) {
                    console.error("Contour length exceeded safety limit");
                    break;
                }
            } while(`${x},${y}` !== startKey);

            return contour;
        };

        const edges = [];
        const visitedGlobal = new Set(); // Ensure visited set is defined here
        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                const key = `${x},${y}`;
                if(getAlpha(x, y) >= alphaThreshold && !visitedGlobal.has(key)) {
                    const contour = march(x, y);
                    contour.forEach(point => visitedGlobal.add(`${point.x},${point.y}`));
                    if(contour.length > 0) edges.push(...contour);
                }
            }
        }

        return edges;
    }

    static simplifyPolygon(points, tolerance = 5) { // Adjusted tolerance for significant simplification
        if(points.length < 3) return points;

        const simplified = [points[0]];

        const simplify = (start, end) => {
            let dmax = 0;
            let index = 0;
            for(let i = start + 1; i < end; i++) {
                const d = this.perpendicularDistance(points[i], points[start], points[end]);
                if(d > dmax) {
                    index = i;
                    dmax = d;
                }
            }

            if(dmax > tolerance) {
                const recResults1 = simplify(start, index);
                const recResults2 = simplify(index, end);
                return [...recResults1.slice(0, recResults1.length - 1), ...recResults2];
            } else {
                return [points[start], points[end]];
            }
        };

        const result = simplify(0, points.length - 1);
        simplified.push(...result.slice(1));

        return simplified;
    }

    static perpendicularDistance(point, lineStart, lineEnd) {
        let dx = lineEnd.x - lineStart.x;
        let dy = lineEnd.y - lineStart.y;

        const mag = Math.sqrt(dx * dx + dy * dy);
        if(mag > 0) {
            dx /= mag;
            dy /= mag;
        }

        const pvx = point.x - lineStart.x;
        const pvy = point.y - lineStart.y;

        const pvdot = dx * pvx + dy * pvy;

        const ax = pvx - pvdot * dx;
        const ay = pvy - pvdot * dy;

        return Math.sqrt(ax * ax + ay * ay);
    }
}
