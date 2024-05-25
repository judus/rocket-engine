export default class TileGridMap {
	constructor(tiles) {
		this.tiles = tiles;
		this.grid = new Map();

		tiles.forEach(tile => {
			this.set(tile.indexX, tile.indexY, tile);
		});
	}

	forEach(callback) {
		this.grid.forEach((row, y) => {
			row.forEach((value, x) => {
				callback(value, x, y);
			});
		});
	}

	set(x, y, value) {
		const row = this.grid.get(y);

		if(!row) {
			this.grid.set(y, new Map());
		}
		this.grid.get(y).set(x, value);
	}

	get(x, y) {
		const row = this.grid.get(y);
		if(row) {
			return row.get(x);
		}
		return undefined;
	}
}