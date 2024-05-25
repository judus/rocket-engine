import TileResolver from '../tiling/TileResolver.js';
import {Sides} from '../entities/BaseEntity.js';


export default class TileCollider {
	constructor(tileResolver) {
		this.tileResolver = tileResolver;
		this.tileSize = tileResolver.tileSize;
	}

	checkX(entity, collisionHandlers = []) {

		if(collisionHandlers.length === 0) return;

		let x;

		if (entity.vel.x > 0) {
			x = entity.pos.x + this.tileSize;
		} else if (entity.vel.x < 0) {
			x = entity.pos.x;
		} else {
			return;
		}

		const matches = this.tileResolver.matchByRange(
			x, x, entity.pos.y, entity.pos.y + this.tileSize
		);

		matches.forEach(match => {

			collisionHandlers.forEach(collisionHandler => {
				if(!collisionHandler.condition(match, entity)) return;

				if(entity.vel.x > 0) {
					collisionHandler.handle(
						Sides.RIGHT, match, entity,
						collisionHandler.message(Sides.RIGHT, match, entity)
					)
				} else if(entity.vel.x < 0) {
					collisionHandler.handle(
						Sides.LEFT, match, entity,
						collisionHandler.message(Sides.LEFT, match, entity)
					)
				}
			})
		});
	}

	checkY(entity, collisionHandlers = []) {

		if(collisionHandlers.length === 0) return;

		let y;

		if(entity.vel.y > 0) {
			y = entity.pos.y + this.tileSize;

		} else if(entity.vel.y < 0) {
			y = entity.pos.y;
		} else {
			return;
		}

		const matches = this.tileResolver.matchByRange(
			entity.pos.x, entity.pos.x + this.tileSize, y, y);

		matches.forEach(match => {
			collisionHandlers.forEach(collisionHandler => {
				if(!collisionHandler.condition(match, entity)) return;

				if(entity.vel.y > 0) {
					collisionHandler.handle(
						Sides.BOTTOM, match, entity,
						collisionHandler.message(Sides.BOTTOM, match, entity)
					);
				} else if(entity.vel.y < 0) {
					collisionHandler.handle(Sides.TOP, match, entity,
						collisionHandler.message(Sides.TOP, match, entity)
					);
				}
			});
		});
	}

	test(entity) {
		this.checkX(entity);
		this.checkY(entity);
	}
}