import Entity2D from "../../engine/src/entities/Entity2D.js";
import Vector3D from "../../engine/src/utils/maths/Vector3D.js";
import Drawing from "../../engine/src/services/Drawing.js";
import PhysicsComponent from "../../engine/src/components/PhysicsComponent.js";
import CollisionDataComponent from "../../engine/src/components/CollisionDataComponent.js";
import CollisionComponent from "../../engine/src/components/CollisionComponent.js";
import DefaultCollisionResponse from "../../engine/src/physics/collisions/DefaultCollisionResponse.js";
import HealthComponent from "../../engine/src/components/HealthComponent.js";
import FaceVelocityBehavior from "../../engine/src/behaviors/FaceVelocityBehavior.js";
import SpriteComponent from "../../engine/src/components/SpriteComponent.js";
import EntityHighlightRenderComponent from "../components/EntityHighlightRenderComponent.js";
import ShowExplosionBehavior from "../behaviors/ShowExplosionBehavior.js";

export default class Asteroid extends Entity2D {
    constructor(engine, config, x = 0, y = 0, id = null, scale = 1) {

        config = {
            ...config,
            pos: new Vector3D(x, y, 0),
            velocity: new Vector3D(0, 0, 0),
            mass: 1000,
            momentOfInertia: 1,
            accelerationModifier: 1,
            inertiaModifier: 1,
            dragCoefficient: 500,
            dragCoefficientModifier: 1,
            rotationalDragCoefficient: 0.999,
            staticFrictionCoefficient: 10,
        };


        super(engine, config, id);

        this.scale = scale;




        this.drawing = new Drawing(config.polygon.fillColor);

        //this.addComponent('movement', new MovementComponent());

        //this.addComponent('transform', new TransformComponent(x, y, 0, this.scale));

        // Collision detection
        if (this.scale > 8) {
            // Collision detection
            // const collisionType = this.definition.collisionType || 'box';
            // const particleSystem = dataStoreManager.getStore('global').get('particleSystem');
            // this.addComponent('collision', new CollisionComponent(
            //     collisionType, false, new DefaultCollisionResponse(particleSystem))
            // );
            //dd
            // if(collisionType === 'box') {
            //     // Add multiple bounding boxes
            //     this.addComponent('boundingBox', new BoundingBoxComponent(
            //         ...this.definition.collisionBoxes
            //     ));d
            // }
            //
            // this.addComponent('clickable', new ClickableComponent((event, entity) => {
            //     console.log(`${entity.id} clicked`, entity);
            //     // Define custom behavior here
            // }));
        }
        this.addComponent('physics', new PhysicsComponent(), 1 / 60, 7);
        this.addComponent('collisionData', new CollisionDataComponent(this.isStatic), 1 / 60, 1);
        this.addComponent('collision', new CollisionComponent(new DefaultCollisionResponse(this.particleSystem), false), 1 / 30, 1);

        //this.addComponent('render', new EntityVerticesComponent(false));

        this.addComponent('sprite', new SpriteComponent(this.spriteSheet, 0), 1 / 60, 12); // this renders the sprite of the entity

        this.addComponent('health', new HealthComponent(10000));
        this.addComponent('highlight', new EntityHighlightRenderComponent(), 1 / 60, 12);


        // Initialize behavior
        this.behavior = new FaceVelocityBehavior();
    }


    setBehavior(behavior) {
        this.behavior = behavior;
    }

    // update(deltaTime) {
    //     super.update(deltaTime);
    //     if(this.behavior) {
    //         this.behavior.perform(this, deltaTime);
    //     }
    // }

    takeDamage(amount) {
        this.hasComponent('health', (component) => {
            component.takeDamage(amount);
        });
    }

    onCollision(otherEntity, collisionResult) {
        if(otherEntity && otherEntity.damage) {
            this.takeDamage(otherEntity.damage); // Apply incoming damage from the other entity
        }
    }

    destroy() {
        if(this.particleSystem) {
            (new ShowExplosionBehavior(this.particleSystem)).perform(this);
        }
        super.destroy();
    }
}
