import BaseLayer from "./rendering/BaseLayer.js";

export default class ForegroundLayer extends BaseLayer {
    getEntities(scene) {
        return scene.dataStoreManager.getStore('entities').getEntitiesInArea(scene.camera.getArea());
    }
}
