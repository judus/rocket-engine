import {TileSelection} from "./TileSelection.js";

export default class TileResolver {
	constructor(tileSize = 16) {
		this.tileSize = tileSize;
		this.previousTilesSet = new Set();
	}

	tileCreator(tile) {
		return tile;
	}

	toIndex(pos) {
		return Math.floor(pos / this.tileSize);
	}

	toIndexRange(pos1, pos2) {
		const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
		const range = [];
		let pos = pos1;
		do {
			range.push(this.toIndex(pos));
			pos = pos + this.tileSize;
		} while(pos < pMax);
		return range;
	}

	getByIndex(indexX, indexY) {
		const x1 = indexX * this.tileSize;
		const y1 = indexY * this.tileSize;
		const x2 = x1 + this.tileSize;
		const y2 = y1 + this.tileSize;
		return this.tileCreator({indexX, indexY, x1, y1, x2, y2});
	}

	getIndex(posX, posY) {
		return {
			x: this.toIndex(posX),
			y: this.toIndex(posY)
		}
	}

	matchByPosition(posX, posY) {
		const tileIndex = this.getIndex(posX, posY);
		return this.getByIndex(
			tileIndex.x,
			tileIndex.y
		);
	}

	matchByRange(x1, x2, y1, y2) {
		const matches = [];
		this.toIndexRange(x1, x2).forEach(indexX => {
			this.toIndexRange(y1, y2).forEach(indexY => {
				const match = this.getByIndex(indexX, indexY);
				if(match) {
					matches.push(match);
				}
			});
		});
		return matches;
	}

	getFromArea(x1, y1, x2, y2) {
		const list = [];

		for(let j = y1; j <= y2; j++) {
			for (let i = x1; i <= x2; i++) {
				list.push(this.getByIndex(i, j));
			}
		}

		return list;
	}

	getNewTiles(fromX, fromY, toX, toY) {
		const tileSelection = new TileSelection()

		tileSelection.fromTile = this.matchByPosition(fromX, fromY);
		tileSelection.toTile = this.matchByPosition(toX, toY);

		const selection = tileSelection.selection();

		const newTiles = [];

		for(let j = selection.indexY1; j <= selection.indexY2; j++) {
			for(let i = selection.indexX1; i <= selection.indexX2; i++) {
				const tileIdentifier = `${i},${j}`;
				if(!this.previousTilesSet.has(tileIdentifier)) {
					newTiles.push(this.getByIndex(i, j));
					this.previousTilesSet.add(tileIdentifier);
				}
			}
		}

		return newTiles;
	}

	getAllTiles(fromX, fromY, toX, toY) {
		const tileSelection = new TileSelection()

		tileSelection.fromTile = this.matchByPosition(fromX, fromY);
		tileSelection.toTile = this.matchByPosition(toX, toY);

		const selection = tileSelection.selection();

		return this.getFromArea(
			selection.indexX1, selection.indexY1,
			selection.indexX2, selection.indexY2
		);
	}

	resolve(camera, callback) {
		if(callback !== undefined) {
			this.tileCreator = callback;
		}

		return this.getAllTiles(
			camera.pos.x - this.tileSize * 4,
			camera.pos.y - this.tileSize,
			camera.width + camera.pos.x + this.tileSize,
			camera.height + camera.pos.y + this.tileSize * 5,
			callback
		);
	}

	resolveNew(camera, callback) {
		if (callback !== undefined) {
			this.tileCreator = callback;
		}

		return this.getNewTiles(
			camera.pos.x - this.tileSize * 4,
			camera.pos.y - this.tileSize,
			camera.width + camera.pos.x + this.tileSize,
			camera.height + camera.pos.y + this.tileSize * 5,
			callback
		);
	}

	clearPreviousTiles() {
		this.previousTilesSet.clear();
	}

}