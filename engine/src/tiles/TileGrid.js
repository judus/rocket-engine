export default class TileGrid {
	constructor(tiles) {
		this.tiles = tiles;
		this.grid = [];

		tiles.forEach(tile => {
			if(this.grid[tile.indexX] === undefined) {
				this.grid[tile.indexX] = [];
			}
			this.grid[tile.indexX][tile.indexY] = tile;
		});
	}

	forEach(callback) {
		this.grid.forEach((column, x) => {
			column.forEach((value, y) => {
				callback(value, x, y);
			});
		});
	}

	forEachDebug(callback) {
		this.grid.forEach((column, x) => {
			console.log('x: ' + x);
			column.forEach((value, y) => {
				console.log('y: ' + y);
				callback(value, x, y);
			});
		});
	}

	get(x, y) {
		if(this.grid[x] !== undefined && this.grid[x][y] !== undefined) {
			return this.grid[x][y];
		}
	}
}