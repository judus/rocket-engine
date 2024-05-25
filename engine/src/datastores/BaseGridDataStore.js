export default class BaseGridDataStore {
    constructor(cellSize = 100) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    hash(x, y) {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        return `${cellX},${cellY}`;
    }

    addToGrid(item) {
        const hash = this.hash(item.pos.x, item.pos.y);
        if(!this.grid.has(hash)) {
            this.grid.set(hash, new Set());
        }
        this.grid.get(hash).add(item);
    }

    removeFromGrid(item) {
        const hash = this.hash(item.pos.x, item.pos.y);
        if(this.grid.has(hash)) {
            this.grid.get(hash).delete(item);
            if(this.grid.get(hash).size === 0) {
                this.grid.delete(hash);
            }
        }
    }

    getItemsInArea(area) {
        const items = new Set();
        const startX = Math.floor(area.x1 / this.cellSize);
        const endX = Math.ceil(area.x2 / this.cellSize);
        const startY = Math.floor(area.y1 / this.cellSize);
        const endY = Math.ceil(area.y2 / this.cellSize);

        for(let y = startY; y <= endY; y++) {
            for(let x = startX; x <= endX; x++) {
                const hash = `${x},${y}`;
                if(this.grid.has(hash)) {
                    for(const item of this.grid.get(hash)) {
                        if(item.active && area.contains(item.pos.x, item.pos.y)) {
                            items.add(item);
                        }
                    }
                }
            }
        }

        return Array.from(items);
    }
}
