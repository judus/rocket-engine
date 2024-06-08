import Entity2D from "./Entity2D.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import Drawing from "../../services/Drawing.js";
import TransformComponent from "../../components/TransformComponent.js";
import PhysicsComponent from "./PhysicsComponent.js";
import CollisionDataComponent from "./CollisionDataComponent.js";
import CollisionComponent from "../../components/collisions/CollisionComponent.js";
import DefaultCollisionResponse from "../../components/collisions/DefaultCollisionResponse.js";
import HealthComponent from "../../components/HealthComponent.js";
import EntityVerticesComponent from "../../../../demo/components/EntityVerticesComponent.js";
import FaceVelocityBehavior from "../../behaviors/FaceVelocityBehavior.js";
import SpriteComponent from "../../sprites/SpriteComponent.js";

export default class Station extends Entity2D {
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
        this.ships = [];

        this.drawing = new Drawing(config.polygon.fillColor);

        //this.addComponent('movement', new MovementComponent());

        this.addComponent('transform', new TransformComponent(x, y, 0, this.scale));

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
        this.addComponent('collision', new CollisionComponent(new DefaultCollisionResponse(), true), 1 / 60, 1);

        this.addComponent('render', new EntityVerticesComponent(false));

        this.spriteSheet = this.engine.spriteSheetManager().getSpriteSheet(this.spriteSheet.name);
        this.addComponent('sprite', new SpriteComponent(this.spriteSheet, 0), 1 / 60, 12); // this renders the sprite of the entity

        this.addComponent('health', new HealthComponent(100));


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

    onCollision(otherEntity, collisionResult) {
        super.onCollision(otherEntity, collisionResult);
    }

    addShip(ship) {
        this.ships.push(ship);
    }
}
