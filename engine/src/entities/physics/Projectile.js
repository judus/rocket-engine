import Entity2D from "./Entity2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import PhysicsComponent from "./PhysicsComponent.js";
import CollisionDataComponent from "./CollisionDataComponent.js";
import CollisionComponent from "../../components/collisions/CollisionComponent.js";
import RenderComponent from "../../components/RenderComponent.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";

export default class Projectile extends Entity2D {
    constructor(engine, config, id = null) {
        config = {
            ...config,
            pos: config.pos || new Vector3D(0, 0, 0),
            velocity: config.velocity || new Vector3D(0, 0, 0),
            mass: 1,
            momentOfInertia: 1,
            accelerationModifier: 1,
            inertiaModifier: 1,
            dragCoefficient: 0,
            dragCoefficientModifier: 1,
            rotationalDragCoefficient: 0,
            staticFrictionCoefficient: 0,
        };

        super(engine, config, id);
        this.damage = config.damage;
        this.velocity = config.velocity;
        this.lifetime = config.lifetime;
        this.age = 0;

        // Set collision and polygon properties
        this.collisionDetection = config.collisionDetection || null;
        this.boundingBox = config.collisionData?.boundingBox || null;
        this.collisionBoxes = config.collisionData?.subBoundingBoxes || [];
        this.polygon = config.polygon?.vertices || [];
        this.framePolygons = config.collisionData?.framePolygons || {};
        this.color = config.polygon?.fillColor || 'red';
        this.initialOrientation = config.polygon?.orientation || 0;

        // Add necessary components
        this.addComponent('physics', new PhysicsComponent(), 1 / 60, 1);
        this.addComponent('collisionData', new CollisionDataComponent(), 1 / 60, 2);
        this.addComponent('collision', new CollisionComponent(null, false), 1 / 60, 3); // No default collision response
        this.addComponent('render', new RenderComponent((deltaTime, context, camera) => {
            this.renderPolygon(context, camera);
        }), 1 / 60, 4);
    }

    onCollision(otherEntity, collisionResult) {
        if(otherEntity && otherEntity.takeDamage) {
            otherEntity.takeDamage(this.damage); // Apply damage to the other entity
        }

        if(this.particleSystem) {
            this.particleSystem.createExplosion(this.pos.x, this.pos.y, 1, () => ({
                color: '#FF9900'
            }));
        }

        this.destroy(); // Destroy the projectile after collision
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.age += deltaTime;
        if(this.age > this.lifetime) {
            this.destroy();
        }
    }

    renderPolygon(context, camera) {
        if(!this.polygon || this.polygon.length === 0) {
            console.error('No polygon defined for rendering');
            return;
        }

        context.beginPath();
        const vertices = this.polygon;
        const {x, y} = this.pos;
        const rotation = this.initialOrientation + this.rotation;

        const cameraOffsetX = camera.pos.x;
        const cameraOffsetY = camera.pos.y;

        for(let i = 0; i < vertices.length; i++) {
            const vertex = vertices[i];
            const rotatedX = vertex.x * Math.cos(rotation) - vertex.y * Math.sin(rotation);
            const rotatedY = vertex.x * Math.sin(rotation) + vertex.y * Math.cos(rotation);
            const screenX = (x + rotatedX - cameraOffsetX) * camera.zoomLevel;
            const screenY = (y + rotatedY - cameraOffsetY) * camera.zoomLevel;
            if(i === 0) {
                context.moveTo(screenX, screenY);
            } else {
                context.lineTo(screenX, screenY);
            }
        }
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }
}
