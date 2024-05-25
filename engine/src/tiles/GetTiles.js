export function getTiles(tileResolver, camera) {
	return tileResolver.getTiles(
		camera.pos.x,
		camera.pos.y,
		camera.width + camera.pos.x,
		camera.height + camera.pos.y
	);
}