import {loadImage} from "../loading/loadImage.js";

const images = new Map();

export function drawImage(context, imageName, x, y, w, h, store) {

	if(store === undefined) {
		store = images;
	}

	function pos(img, v) {
		if(typeof v !== "function") {
			return v;
		}
		return v(img);
	}

	function width(img, v) {
		if (v === undefined) {
			v = img.width;
		}
		if(typeof v !== "function") {
			return v;
		}
	}

	function height(img, v) {
		if(v === undefined) {
			v = img.height;
		}
		if(typeof v !== "function") {
			return v;
		}
		return v(img);
	}

	let img = store.get(imageName);

	if(img) {
		context.drawImage(img, pos(img, x), pos(img, y), width(img, w), height(img, h));
	} else {

		loadImage(imageName).then(img => {
			drawImage(context, imageName, x, y, w, h, store);
			store.set(imageName, img);
		});

	}
}