import RenderComponent from "../../engine/src/components/RenderComponent.js";
import StaticColorHelper from "../../engine/src/utils/StaticColorHelper.js"; // Adjust the path if needed

export default class EntityHighlightRenderComponent extends RenderComponent {
    constructor(config = {}) {
        super((deltaTime, context, camera) => {
            if(!this.highlightEnabled) {
                return;
            }

            this.initializeConfig(config);
            this.updateCircleAngles(deltaTime);

            this.drawHighlight(context, camera);
        });

        this.highlightEnabled = config.highlightEnabled || false;
    }

    initializeConfig(config) {
        const baseColor = StaticColorHelper.setHex(this.entity.color || "#00FF77"); // Default to green

        this.filledCircleColor = StaticColorHelper.setOpacity(baseColor, 0.5);
        this.dashedCircleColor = StaticColorHelper.setOpacity(baseColor, 1);
        this.dottedCircleColor = StaticColorHelper.setOpacity(baseColor, 0.8);

        const entityRadius = Math.max(this.entity.width, this.entity.height) / 2;

        this.filledCircleRadius = (config.filledCircleRadius || 100) + entityRadius;
        this.dashedCircleRadius = this.calculateProportionalRadius(this.filledCircleRadius, config.dashedCircleRatio || 3);
        this.dottedCircleRadius = this.calculateProportionalRadius(this.filledCircleRadius, config.dottedCircleRatio || 8);

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
    }

    calculateProportionalRadius(baseRadius, ratio) {
        // Applying a better diminishing returns formula
        const diminishingFactor = 0.75;
        return baseRadius + ratio * Math.pow(baseRadius, diminishingFactor);
    }

    updateCircleAngles(deltaTime) {
        this.dashedCircleAngle = (this.dashedCircleAngle || 0) + (deltaTime * this.dashedCircleBaseSpeed / this.dashedCircleRadius);
        this.dottedCircleAngle = (this.dottedCircleAngle || 0) + (deltaTime * this.dottedCircleBaseSpeed / this.dottedCircleRadius);
    }

    drawHighlight(context, camera) {
        const posX = (this.entity.pos.x - camera.pos.x) * camera.zoomLevel;
        const posY = (this.entity.pos.y - camera.pos.y) * camera.zoomLevel;

        this.drawFilledCircle(context, posX, posY, camera.zoomLevel);
        this.drawDashedCircle(context, posX, posY, camera.zoomLevel);
        this.drawDottedCircle(context, posX, posY, camera.zoomLevel);
        // this.drawHealthBar(context, camera); // Uncomment this line if you want to draw the health bar as part of the highlight
    }

    drawFilledCircle(context, posX, posY, zoomLevel) {
        context.beginPath();
        context.arc(posX, posY, this.filledCircleRadius * zoomLevel, 0, 2 * Math.PI);
        context.fillStyle = this.filledCircleColor;
        context.fill();
        context.closePath();
    }

    drawDashedCircle(context, posX, posY, zoomLevel) {
        context.save();
        context.translate(posX, posY);
        context.rotate(this.dashedCircleAngle);
        context.translate(-posX, -posY);
        context.beginPath();
        context.setLineDash(this.dashedLineDash);
        context.arc(posX, posY, this.dashedCircleRadius * zoomLevel, 0, 2 * Math.PI);
        context.strokeStyle = this.dashedCircleColor;
        context.lineWidth = this.dashedLineWidth;
        context.stroke();
        context.setLineDash([]);
        context.closePath();
        context.restore();
    }

    drawDottedCircle(context, posX, posY, zoomLevel) {
        context.save();
        context.translate(posX, posY);
        context.rotate(this.dottedCircleAngle);
        context.translate(-posX, -posY);
        context.beginPath();
        context.setLineDash(this.dottedLineDash);
        context.arc(posX, posY, this.dottedCircleRadius * zoomLevel, 0, 2 * Math.PI);
        context.strokeStyle = this.dottedCircleColor;
        context.lineWidth = this.dottedLineWidth;
        context.stroke();
        context.setLineDash([]);
        context.closePath();
        context.restore();
    }

    drawHealthBar(context, camera) {
        const posX = (this.entity.pos.x - camera.pos.x) * camera.zoomLevel;
        const posY = (this.entity.pos.y - camera.pos.y) * camera.zoomLevel;

        const healthComponent = this.entity.getComponent('health');
        if(!healthComponent) return;

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

    enableHighlight() {
        this.highlightEnabled = true;
    }

    disableHighlight() {
        this.highlightEnabled = false;
    }
}
