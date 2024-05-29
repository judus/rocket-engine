export default class Polygon {
    constructor(vertices = []) {
        this.vertices = vertices;
    }

    setVertices(vertices) {
        this.vertices = vertices;
    }

    addVertex(x, y) {
        this.vertices.push({x, y});
    }

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

    area() {
        let area = 0;
        for(let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
            area += (this.vertices[j].x + this.vertices[i].x) * (this.vertices[j].y - this.vertices[i].y);
        }
        return Math.abs(area / 2);
    }

    perimeter() {
        let perimeter = 0;
        for(let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
            const dx = this.vertices[i].x - this.vertices[j].x;
            const dy = this.vertices[i].y - this.vertices[j].y;
            perimeter += Math.sqrt(dx * dx + dy * dy);
        }
        return perimeter;
    }

    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        this.vertices = this.vertices.map(({x, y}) => ({
            x: x * cos - y * sin,
            y: x * sin + y * cos
        }));
    }

    clone() {
        return new Polygon(this.vertices.map(v => ({x: v.x, y: v.y})));
    }

    toString() {
        return `Polygon(vertices: ${JSON.stringify(this.vertices)})`;
    }

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
