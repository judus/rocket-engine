export default class Polygon {
    constructor(vertices = []) {
        this.vertices = vertices;
    }

    /**
     * Sets the vertices of the polygon.
     * @param {Array} vertices - The vertices of the polygon as an array of {x, y} objects.
     */
    setVertices(vertices) {
        this.vertices = vertices;
    }

    /**
     * Adds a vertex to the polygon.
     * @param {number} x - The x coordinate of the vertex.
     * @param {number} y - The y coordinate of the vertex.
     */
    addVertex(x, y) {
        this.vertices.push({x, y});
    }

    /**
     * Checks if a point is contained within the polygon using the ray-casting algorithm.
     * @param {number} px - The x coordinate of the point.
     * @param {number} py - The y coordinate of the point.
     * @returns {boolean} True if the point is within the polygon, false otherwise.
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
     * Calculates the area of the polygon using the shoelace formula.
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
     * Calculates the perimeter of the polygon.
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
     * Creates a copy of this polygon.
     * @returns {Polygon} The copy of the polygon.
     */
    clone() {
        return new Polygon(this.vertices.map(v => ({x: v.x, y: v.y})));
    }

    /**
     * Returns a string representation of this polygon.
     * @returns {string} The string representation.
     */
    toString() {
        return `Polygon(vertices: ${JSON.stringify(this.vertices)})`;
    }

    /**
     * Checks if this polygon is equal to another polygon.
     * @param {Polygon} polygon - The other polygon.
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
