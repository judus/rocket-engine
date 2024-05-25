// entities/Projectile.js
import BaseEntity from './BaseEntity.js';
import RenderComponent from "../components/RenderComponent.js";
import TransformComponent from "../components/TransformComponent.js";
import Spatial3D from "../utils/spatial/Spatial3D.js";
import CollisionComponent from "../components/collisions/CollisionComponent.js";
import BoundingBoxComponent from "../components/collisions/BoundingBoxComponent.js";

export default class Projectile extends BaseEntity {
    constructor(id, particleSystem) {
        super(id, 'Projectile');
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.color = 'white';
        this.size = 10;
        this.lifetime = 10;
        this.reach = 0;
        this.damage = 0;
        this.active = false;
        this.owner = null;
        this.particleSystem = particleSystem;



        this.components = {};
        this.pos = new Spatial3D(0, 0, 0);
        this.addComponent('transform', new TransformComponent(0, 0, 0, 1));
        this.addComponent('collision', new CollisionComponent('box'));
        this.addComponent('boundingBox', new BoundingBoxComponent({
            id: 'body', x: 0, y: 0, width: this.size, height: this.size
        }));
        this.addComponent('render', new RenderComponent((deltaTime, context, entity, camera) => {
            context.fillStyle = entity.color;
            context.beginPath();
            context.arc(
                (entity.pos.x - camera.pos.x) * camera.zoomLevel,
                (entity.pos.y - camera.pos.y) * camera.zoomLevel,
                entity.size * camera.zoomLevel,
                0,
                Math.PI * 2
            );
            context.fill();
        }, false));
    }

    addComponent(componentType, component) {
        this.components[componentType] = component;
        component.entity = this;
        if(component.onAdd) {
            component.onAdd();
        }
    }

    getComponent(componentType) {
        return this.components[componentType] || null;
    }

    initialize(x, y, z, vx, vy, vz, color, size, lifetime, reach, damage, owner) {
        this.pos.set(x, y, z);
        this.vx = vx;
        this.vy = vy;
        this.vz = vz;
        this.color = color;
        this.size = size;
        this.lifetime = lifetime;
        this.reach = reach;
        this.damage = damage;
        this.active = true;
        this.owner = owner;

        const boundingBox = this.getComponent('boundingBox');
        if(boundingBox) {
            boundingBox.setBounds({
                id: 'body', x: 0, y: 0, width: this.size, height: this.size
            });
        }
    }

    update(deltaTime) {
        if(!this.active) return;

        this.lifetime -= deltaTime;
        if(this.lifetime <= 0) {
            this.active = false;
        } else {
            this.pos.x += this.vx * deltaTime;
            this.pos.y += this.vy * deltaTime;
            this.pos.z += this.vz * deltaTime;

            const boundingBox = this.getComponent('boundingBox');
            if(boundingBox) {
                boundingBox.setBounds({
                    id: 'body', x: 0, y: 0, width: this.size, height: this.size
                });
            }
        }
    }

    onCollision(otherEntity) {
        if(otherEntity.id === this.owner.id) return;

        console.log(`${this.id} (owned by ${this.owner ? this.owner.id : 'unknown'}) collided with ${otherEntity.id}`);

        this.active = false;

        // Custom collision response
        const healthComponent = otherEntity.getComponent('health');
        if(healthComponent) {
            healthComponent.takeDamage(this.damage);
        }

        if(this.owner) {
            console.log('collision');
        }

        // Trigger an explosion effect
        this.particleSystem.createExplosion(this.pos.x, this.pos.y, 20, 'orange');
    }
}
