import BaseLayer from "../../../../engine/src/scenes/BaseLayer.js";
import DynamicContextMenu from "./DynamicContextMenu.js";
import DynamicBoxConfig from "./DynamicBoxConfig.js";

export default class DynamicContextMenuLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
        this.contextMenu = null;
    }

    showContextMenu(worldX, worldY, items) {
        const customBoxConfig = new DynamicBoxConfig();

        customBoxConfig.borderBox.color = 'rgba(255,0,30,0.9)';
        customBoxConfig.borderBox.borderColor = 'blue';
        customBoxConfig.borderBox.borderWidth = 4;
        customBoxConfig.borderBox.padding = 5;

        customBoxConfig.mainBox.color = 'rgba(51,255,97,0.9)';
        customBoxConfig.mainBox.borderColor = 'red';
        customBoxConfig.mainBox.borderWidth = 3;
        customBoxConfig.mainBox.padding = 10;

        customBoxConfig.itemBox.color = 'rgba(62,84,255,0.8)';
        customBoxConfig.itemBox.borderColor = 'green';
        customBoxConfig.itemBox.borderWidth = 2;
        customBoxConfig.itemBox.padding = 5;
        customBoxConfig.itemBox.spacing = 5;
        customBoxConfig.itemBox.textColor = '#fff';
        customBoxConfig.itemBox.fontSize = 16;
        customBoxConfig.itemBox.font = 'Arial';

        this.contextMenu = new DynamicContextMenu(worldX, worldY, items, customBoxConfig);
    }

    hideContextMenu() {
        this.contextMenu = null;
    }

    render(scene) {
        this.clear();
        if(this.contextMenu) {
            const posX = (this.contextMenu.x - scene.camera.pos.x) * scene.camera.zoomLevel;
            const posY = (this.contextMenu.y - scene.camera.pos.y) * scene.camera.zoomLevel;

            console.log(`Rendering context menu at (${posX}, ${posY})`);
            this.contextMenu.render(this.context, posX, posY);
        }
    }

    handleClick(mouseX, mouseY) {
        if(this.contextMenu) {
            return this.contextMenu.handleClick(mouseX, mouseY);
        }
        return null;
    }
}
