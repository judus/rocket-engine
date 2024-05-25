export default class HeightMap {
	constructor(noiseGenerator) {
		this.noiseGenerator = noiseGenerator;
		this.noiseGenerator.noiseDetail(3, 0.4);
		this.coordOffsetX = -2048;
		this.coordOffsetY = -2048;

		this.xoff = 1.5; // distance between levels
		this.yoff = 1.5; // distance between levels
		this.hoff = -0; // offset levels

		this._levels = 9;

		this._steps = 5; // steps within levels
		this._reverseSteps = false;
		this._offsetSteps = 0;
	}

	details(iterations, glue) {
		this.noiseGenerator.noiseDetail(iterations, glue);
		return this;
	}

	offsetCoords(x = 0, y = 0) {
		this.coordOffsetX = x;
		this.coordOffsetY = y;
		return this;
	}

	offsetLevels(n = 0) {
		this.hoff = n;
		return this;
	}

	steps(n, reverse = false, offset = 0) {
		this._steps = n;
		this.reverseSteps(reverse);
		this.offsetSteps(offset);

		return this;
	}

	distance(x = 0, y) {
		if(y === undefined) y = x;

		this.xoff = x;
		this.yoff = y;

		return this;
	}

	levels(n) {
		this._levels = n;
		return this;
	}

	noise(x, y) {
		return this.noiseGenerator.noise(
			(x + this.coordOffsetX) * this.xoff,
			(y + this.coordOffsetY) * this.yoff
		);
	}

	get(x, y, noiseValue, factor = 1) {

		let noise = this.noise(x, y);

		if (noiseValue !== undefined) {
			noise = (noise + noiseValue * factor) / factor;
		}

		const dNoise = noise * this._levels;
		const level = Math.floor(dNoise);

		return {
			level: this.clamp(level + this.hoff, 0, this._levels + this.hoff),
			step: this.getLevelStep(dNoise),
			steps: this._steps,
			dNoise: dNoise,
			noise: noise
		};
	}


	reverseSteps(bool = false) {
		if(bool !== undefined) {
			this._reverseSteps = bool;
		}
	}

	offsetSteps(n = 0) {
		if(n !== undefined) {
			this._offsetSteps = n;
		}
	}

	getLevelStep(dNoise) {
		let levelStep = Math.floor(((dNoise - Math.floor(dNoise)) * 10) * (this._steps / 10));
		if(this._reverseSteps === true) {
			levelStep = (levelStep * -1) + this._steps - 1;
		}
		levelStep += this._offsetSteps;
		return levelStep;
	}

	clamp(num, min, max) {
		return Math.min(Math.max(num, min), max);
	}
}