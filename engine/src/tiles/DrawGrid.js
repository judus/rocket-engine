import {hexToRgbA} from "../utils/colors/colors.js";

export function drawGrid(context, camera, w, h, size, color) {

	function getOffset(a) {
		return (a - (size * (Math.round(a / size)))) * -1
	}

	const offsetX = getOffset(camera.pos.x);
	const offsetY = getOffset(camera.pos.y);

	context.strokeStyle = color;
	context.lineWidth = 1;

	for(let i = 0; i * size <= w; i++) {

		let moveToX = (i * size) + offsetX;

		context.beginPath();
		context.moveTo(moveToX, 0);
		context.lineTo(moveToX, h);
		context.stroke();
	}

	for(let i = 0; i * size <= h; i++) {

		let moveToY = (i * size) + offsetY;
		context.beginPath();
		context.moveTo(0, moveToY);
		context.lineTo(w, moveToY);
		context.stroke();
	}

}