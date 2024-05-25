export class TileSelection {
	constructor(fromTitle, toTile) {
		this.fromTile = null;
		this.toTile = null;
	}

	empty() {
		return {};
	}

	selection() {
		if ( this.fromTile == null || this.toTile == null) return;


		const isDirXToLeft = this.fromTile.x1 > this.toTile.x1;
		const isDirYToUp = this.fromTile.y1 > this.toTile.y1;

		let x1, x2, y1, y2;

		x1 = this.fromTile.indexX;
		y1 = this.fromTile.indexY;

		x2 = this.toTile.indexX;
		y2 = this.toTile.indexY;

		if(isDirXToLeft === true) {
			x1 = this.toTile.indexX;
			x2 = this.fromTile.indexX;
		}

		if(isDirYToUp === true) {
			y1 = this.toTile.indexY;
			y2 = this.fromTile.indexY;
		}

		return {
			indexX1: x1,
			indexY1: y1,
			indexX2: x2,
			indexY2: y2,
		}
	}
}
