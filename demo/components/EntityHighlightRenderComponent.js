import RenderComponent from "../../engine/src/components/RenderComponent.js";
import StaticColorHelper from "../../engine/src/utils/StaticColorHelper.js"; // Adjust the path if needed

export default class EntityHighlightRenderComponent extends RenderComponent {
    constructor(config = {}) {
        super((deltaTime, context, entity, camera) => {
            if(!this.highlightEnabled) {
                return;
            }

            const baseColor = StaticColorHelper.setHex(entity.color || "#00FF77"); // Default to green

            this.filledCircleColor = StaticColorHelper.setOpacity(baseColor, 0.5);
            this.dashedCircleColor = StaticColorHelper.setOpacity(baseColor, 1);
            this.dottedCircleColor = StaticColorHelper.setOpacity(baseColor, 0.5);

            this.filledCircleRadius = config.filledCircleRadius || 100;
            this.dashedCircleRadius = config.dashedCircleRadius || 300;
            this.dottedCircleRadius = config.dottedCircleRadius || 500;

            this.dashedLineDash = config.dashedLineDash || [5, 15];
            this.dashedLineWidth = config.dashedLineWidth || 2;
            this.dottedLineDash = config.dottedLineDash || [2, 10];
            this.dottedLineWidth = config.dottedLineWidth || 1;

            this.healthBarOffsetY = config.healthBarOffsetY || 150;
            this.healthBarWidth = config.healthBarWidth || 100;
            this.healthBarHeight = config.healthBarHeight || 10;
            this.healthBarBackgroundColor = config.healthBarBackgroundColor || "rgba(0, 0, 0, 0.5)";
            this.healthBarFillColor = config.healthBarFillColor || "rgba(0, 255, 0, 1)";
            this.healthBarBorderColor = config.healthBarBorderColor || "rgb(0, 133, 0)";
            this.healthBarBorderWidth = config.healthBarBorderWidth || 2;

            this.dashedCircleBaseSpeed = config.dashedCircleBaseSpeed || 1;
            this.dottedCircleBaseSpeed = config.dottedCircleBaseSpeed || 0.5;

            this.dashedCircleAngle = (this.dashedCircleAngle || 0) + (deltaTime * this.dashedCircleBaseSpeed / this.dashedCircleRadius);
            this.dottedCircleAngle = (this.dottedCircleAngle || 0) + (deltaTime * this.dottedCircleBaseSpeed / this.dottedCircleRadius);

            this.drawHighlight(context, entity, camera);
        });

        this.highlightEnabled = config.highlightEnabled || false;
    }

    drawHighlight(context, entity, camera) {
        const posX = (entity.pos.x - camera.pos.x) * camera.zoomLevel;
        const posY = (entity.pos.y - camera.pos.y) * camera.zoomLevel;

        // Draw filled circle
        context.beginPath();
        context.arc(posX, posY, this.filledCircleRadius * camera.zoomLevel, 0, 2 * Math.PI);
        context.fillStyle = this.filledCircleColor;
        context.fill();
        context.closePath();

        // Draw dashed line circle
        context.save();
        context.translate(posX, posY);
        context.rotate(this.dashedCircleAngle);
        context.translate(-posX, -posY);
        context.beginPath();
        context.setLineDash(this.dashedLineDash);
        context.arc(posX, posY, this.dashedCircleRadius * camera.zoomLevel, 0, 2 * Math.PI);
        context.strokeStyle = this.dashedCircleColor;
        context.lineWidth = this.dashedLineWidth;
        context.stroke();
        context.setLineDash([]);
        context.closePath();
        context.restore();

        // Draw dotted line circle
        context.save();
        context.translate(posX, posY);
        context.rotate(this.dottedCircleAngle);
        context.translate(-posX, -posY);
        context.beginPath();
        context.setLineDash(this.dottedLineDash);
        context.arc(posX, posY, this.dottedCircleRadius * camera.zoomLevel, 0, 2 * Math.PI);
        context.strokeStyle = this.dottedCircleColor;
        context.lineWidth = this.dottedLineWidth;
        context.stroke();
        context.setLineDash([]);
        context.closePath();
        context.restore();

        // Draw health bar
        const healthComponent = entity.getComponent('health');
        if(healthComponent) {
            const healthRatio = healthComponent.currentHealth / healthComponent.maxHealth;
            const healthBarX = posX - (this.healthBarWidth * camera.zoomLevel) / 2;
            const healthBarY = posY - (this.healthBarOffsetY * camera.zoomLevel) - (this.healthBarHeight * camera.zoomLevel) / 2;

            // Background of the health bar
            context.fillStyle = this.healthBarBackgroundColor;
            context.fillRect(healthBarX, healthBarY, this.healthBarWidth * camera.zoomLevel, this.healthBarHeight * camera.zoomLevel);

            // Current health
            context.fillStyle = this.healthBarFillColor;
            context.fillRect(healthBarX, healthBarY, this.healthBarWidth * healthRatio * camera.zoomLevel, this.healthBarHeight * camera.zoomLevel);

            // Border
            context.strokeStyle = this.healthBarBorderColor;
            context.lineWidth = this.healthBarBorderWidth;
            context.strokeRect(healthBarX - 1, healthBarY - 1, this.healthBarWidth * camera.zoomLevel + 2, this.healthBarHeight * camera.zoomLevel + 2);
        }
    }

    enableHighlight() {
        this.highlightEnabled = true;
    }

    disableHighlight() {
        this.highlightEnabled = false;
    }
}
