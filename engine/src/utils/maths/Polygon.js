/**
 * Class representing a polygon with various utility methods.
 */
export default class Polygon {
    /**
     * Create a polygon.
     * @param {Array} vertices - The vertices of the polygon as an array of objects with x and y properties.
     */
    constructor(vertices = []) {
        this.vertices = vertices;
    }

    /**
     * Set the vertices of the polygon.
     * @param {Array} vertices - The vertices of the polygon as an array of objects with x and y properties.
     * @returns {Polygon} The current polygon instance.
     */
    setVertices(vertices) {
        this.vertices = vertices;
        return this;
    }

    /**
     * Add a vertex to the polygon.
     * @param {number} x - The x-coordinate of the vertex.
     * @param {number} y - The y-coordinate of the vertex.
     * @returns {Polygon} The current polygon instance.
     */
    addVertex(x, y) {
        this.vertices.push({x, y});
        return this;
    }

    /**
     * Check if a point is inside the polygon.
     * @param {number} px - The x-coordinate of the point.
     * @param {number} py - The y-coordinate of the point.
     * @returns {boolean} True if the point is inside the polygon, false otherwise.
     */
    containsPoint(px, py) {
        let inside = false;
        for(let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
            const xi = this.vertices[i].x, yi = this.vertices[i].y;
            const xj = this.vertices[j].x, yj = this.vertices[j].y;

            const intersect = ((yi > py) !== (yj > py)) &&
                (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
            if(intersect) inside = !inside;
        }
        return inside;
    }

    /**
     * Calculate the area of the polygon.
     * @returns {number} The area of the polygon.
     */
    area() {
        let area = 0;
        for(let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
            area += (this.vertices[j].x + this.vertices[i].x) * (this.vertices[j].y - this.vertices[i].y);
        }
        return Math.abs(area / 2);
    }

    /**
     * Calculate the perimeter of the polygon.
     * @returns {number} The perimeter of the polygon.
     */
    perimeter() {
        let perimeter = 0;
        for(let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
            const dx = this.vertices[i].x - this.vertices[j].x;
            const dy = this.vertices[i].y - this.vertices[j].y;
            perimeter += Math.sqrt(dx * dx + dy * dy);
        }
        return perimeter;
    }

    /**
     * Rotate the polygon around the center of its bounding box by a given angle.
     * @param {number} angle - The angle to rotate the polygon, in radians.
     * @returns {Polygon} The current polygon instance.
     */
    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Calculate the bounding box center of the polygon
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        this.vertices.forEach(vertex => {
            if(vertex.x < minX) minX = vertex.x;
            if(vertex.y < minY) minY = vertex.y;
            if(vertex.x > maxX) maxX = vertex.x;
            if(vertex.y > maxY) maxY = vertex.y;
        });
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Translate vertices to the origin, rotate, and translate back
        this.vertices = this.vertices.map(({x, y}) => {
            const translatedX = x - centerX;
            const translatedY = y - centerY;
            return {
                x: translatedX * cos - translatedY * sin + centerX,
                y: translatedX * sin + translatedY * cos + centerX
            };
        });

        return this;
    }

    /**
     * Offset the polygon to the center of its bounding box.
     * @returns {Polygon} The current polygon instance.
     */
    offsetToCenter() {
        // Calculate the bounding box center of the polygon
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        this.vertices.forEach(vertex => {
            if(vertex.x < minX) minX = vertex.x;
            if(vertex.y < minY) minY = vertex.y;
            if(vertex.x > maxX) maxX = vertex.x;
            if(vertex.y > maxY) maxY = vertex.y;
        });
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Translate vertices so that the center is at the origin
        this.vertices = this.vertices.map(({x, y}) => ({
            x: x - centerX,
            y: y - centerY
        }));

        return this;
    }

    /**
     * Create a deep clone of the polygon.
     * @returns {Polygon} A new Polygon instance with the same vertices.
     */
    clone() {
        return new Polygon(this.vertices.map(v => ({x: v.x, y: v.y})));
    }

    /**
     * Get a string representation of the polygon.
     * @returns {string} A string representation of the polygon.
     */
    toString() {
        return `Polygon(vertices: ${JSON.stringify(this.vertices)})`;
    }

    /**
     * Check if another polygon is equal to this one.
     * @param {Polygon} polygon - The polygon to compare with.
     * @returns {boolean} True if the polygons are equal, false otherwise.
     */
    equals(polygon) {
        if(this.vertices.length !== polygon.vertices.length) {
            return false;
        }
        for(let i = 0; i < this.vertices.length; i++) {
            if(this.vertices[i].x !== polygon.vertices[i].x || this.vertices[i].y !== polygon.vertices[i].y) {
                return false;
            }
        }
        return true;
    }
}
