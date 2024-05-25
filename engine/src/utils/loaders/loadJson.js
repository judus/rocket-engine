export function loadJson(url) {
	return fetch(url).then(r => r.json());
}