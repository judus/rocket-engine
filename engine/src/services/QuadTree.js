import Rectangle from "../utils/maths/Rectangle.js";

export default class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary; // A Rectangle object
        this.capacity = capacity; // Max entities per node
        this.entities = [];
        this.divided = false;
    }

    subdivide() {
        const {x, y, width, height} = this.boundary;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        this.northeast = new QuadTree(new Rectangle(x + halfWidth, y, halfWidth, halfHeight), this.capacity);
        this.northwest = new QuadTree(new Rectangle(x, y, halfWidth, halfHeight), this.capacity);
        this.southeast = new QuadTree(new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight), this.capacity);
        this.southwest = new QuadTree(new Rectangle(x, y + halfHeight, halfWidth, halfHeight), this.capacity);

        this.divided = true;
    }

    insert(entity) {
        if(!this.boundary.containsPoint(entity.pos.x, entity.pos.y)) {
            return false;
        }

        if(this.entities.length < this.capacity) {
            this.entities.push(entity);
            return true;
        } else {
            if(!this.divided) {
                this.subdivide();
            }

            if(this.northeast.insert(entity)) return true;
            if(this.northwest.insert(entity)) return true;
            if(this.southeast.insert(entity)) return true;
            if(this.southwest.insert(entity)) return true;
        }
    }

    query(range, found = []) {
        if(!this.boundary.intersects(range)) {
            return found;
        }

        for(const entity of this.entities) {
            if(range.containsPoint(entity.pos.x, entity.pos.y)) {
                found.push(entity);
            }
        }

        if(this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }

    draw(context, camera) {
        // Draw the boundary of this quad
        context.save();
        context.strokeStyle = '#9a5702';
        context.lineWidth = 1;
        context.strokeRect(
            (this.boundary.x - camera.pos.x) * camera.zoomLevel,
            (this.boundary.y - camera.pos.y) * camera.zoomLevel,
            this.boundary.width * camera.zoomLevel,
            this.boundary.height * camera.zoomLevel
        );
        context.restore();

        // If this quadtree is subdivided, draw the subdivisions
        if(this.divided) {
            this.northeast.draw(context, camera);
            this.northwest.draw(context, camera);
            this.southeast.draw(context, camera);
            this.southwest.draw(context, camera);
        }
    }
}
