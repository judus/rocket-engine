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
        const edges = [];

        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const alpha = data[index + 3] / 255;

                if(alpha > alphaThreshold) {
                    if(x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                        edges.push({x, y});
                    } else {
                        const neighbors = [
                            data[((y - 1) * width + x) * 4 + 3] / 255,
                            data[((y + 1) * width + x) * 4 + 3] / 255,
                            data[(y * width + x - 1) * 4 + 3] / 255,
                            data[(y * width + x + 1) * 4 + 3] / 255
                        ];

                        if(neighbors.some(a => a <= alphaThreshold)) {
                            edges.push({x, y});
                        }
                    }
                }
            }
        }

        return edges;
    }

    static simplifyPolygon(points, tolerance) {
        if(points.length < 3) return points;

        let dmax = 0;
        let index = 0;
        const end = points.length - 1;

        for(let i = 1; i < end; i++) {
            const d = this.perpendicularDistance(points[i], points[0], points[end]);
            if(d > dmax) {
                index = i;
                dmax = d;
            }
        }

        if(dmax > tolerance) {
            const recResults1 = this.simplifyPolygon(points.slice(0, index + 1), tolerance);
            const recResults2 = this.simplifyPolygon(points.slice(index), tolerance);

            return recResults1.slice(0, recResults1.length - 1).concat(recResults2);
        } else {
            return [points[0], points[end]];
        }
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
