import SpatialECS2D from "../../engine/src/entities/SpatialECS2D.js";
import Drawing from "../../engine/src/services/Drawing.js";
import MovementComponent from "../../engine/src/components/movements/MovementComponent.js";
import TransformComponent from "../../engine/src/components/TransformComponent.js";
import CollisionComponent from "../../engine/src/components/collisions/CollisionComponent.js";
import DefaultCollisionResponse from "../../engine/src/components/collisions/DefaultCollisionResponse.js";
import BoundingBoxComponent from "../../engine/src/components/collisions/BoundingBoxComponent.js";
import HealthComponent from "../../engine/src/components/HealthComponent.js";
import RenderComponent from "../../engine/src/components/RenderComponent.js";
import ClickableComponent from "../../engine/src/components/ClickableComponent.js";
import FaceVelocityBehavior from "../../engine/src/behaviors/FaceVelocityBehavior.js";
import EntityVerticesComponent from "../components/EntityVerticesComponent.js";
import Entity2D from "../../engine/src/entities/physics/Entity2D.js";
import Vector3D from "../../engine/src/utils/maths/Vector3D.js";
import PhysicsComponent from "../../engine/src/entities/physics/PhysicsComponent.js";

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

        console.log(`Constructing Asteroid ${id} at ${config.pos} with scale ${scale}`, config.pos);

        super(engine, config, id);



        this.scale = scale;




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
            //     ));
            // }
            //
            // this.addComponent('clickable', new ClickableComponent((event, entity) => {
            //     console.log(`${entity.id} clicked`, entity);
            //     // Define custom behavior here
            // }));
        }
        this.addComponent('physics', new PhysicsComponent(), 1 / 60, 7);
        //this.addComponent('collision', new CollisionComponent(new DefaultCollisionResponse()), false);

        this.addComponent('health', new HealthComponent(100));


        this.addComponent('render', new EntityVerticesComponent(false));

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
}
