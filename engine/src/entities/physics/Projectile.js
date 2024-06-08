import Entity2D from "./Entity2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import PhysicsComponent from "./PhysicsComponent.js";
import CollisionDataComponent from "./CollisionDataComponent.js";
import CollisionComponent from "../../components/collisions/CollisionComponent.js";
import RenderComponent from "../../components/RenderComponent.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";
import DefaultCollisionResponse from "../../components/collisions/DefaultCollisionResponse.js";

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

        // Add necessary components
        this.addComponent('physics', new PhysicsComponent(), 1 / 60, 1);
        this.addComponent('collisionData', new CollisionDataComponent(), 1 / 60, 2);
        this.addComponent('collision', new CollisionComponent(new DefaultCollisionResponse(), false), 1 / 60, 3);
        this.addComponent('render', new RenderComponent((deltaTime, context, camera) => {
            this.renderPolygon(context, camera);
            //12this.renderRedDot(context, camera);
        }), 1 / 60, 4);
    }

    onCollision(otherEntity, collisionResult) {
        if(otherEntity && otherEntity.takeDamage) {
            otherEntity.takeDamage(this.damage);
        }
        this.destroy();
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.age += deltaTime;
        if(this.age > this.lifetime) {
            this.destroy();
        }
    }

    renderPolygon(context, camera) {
        context.beginPath();
        const vertices = this.polygon;
        const {x, y} = this.pos;
        const rotation = this.rotation || 0;

        for(let i = 0; i < vertices.length; i++) {
            const vertex = vertices[i];
            const rotatedX = vertex.x * Math.cos(rotation) - vertex.y * Math.sin(rotation);
            const rotatedY = vertex.x * Math.sin(rotation) + vertex.y * Math.cos(rotation);
            const camX = x - camera.pos.x;
            const camY = y - camera.pos.y;
            if(i === 0) {
                context.moveTo(camX + rotatedX, camY + rotatedY);
            } else {
                context.lineTo(camX + rotatedX, camY + rotatedY);
            }
        }
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }

    renderRedDot(context, camera) {
        //console.log(`Rendering red dot at position: ${this.pos.x}, ${this.pos.y}`);
        const screenX = (this.pos.x - camera.pos.x) * camera.zoomLevel;
        const screenY = (this.pos.y - camera.pos.y) * camera.zoomLevel;

        context.beginPath();
        context.arc(screenX, screenY, 10, 0, 2 * Math.PI); // Big red dot with radius 10
        context.fillStyle = 'red';
        context.fill();
    }
}
