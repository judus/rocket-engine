import BaseComponent from "../../abstracts/BaseComponent.js";
import Vector3D from "../../utils/maths/Vector3D.js";
import StringHelpers from "../../utils/StringHelpers.js";

export default class EntityMountsComponent extends BaseComponent {
    constructor(mountsProfile) {
        super();
        this.mounts = {};
        this.setProfile(mountsProfile);
    }

    setProfile(profile, accumulate = false) {
        if(!accumulate) {
            this.mounts = {};
        }

        profile.mounts.forEach(mount => {
            if(!this.mounts[mount.type]) {
                this.mounts[mount.type] = [];
            }
            this.mounts[mount.type].push({
                id: mount.id || StringHelpers.generateUUID(),
                compatibility: mount.compatibility,
                position: new Vector3D(mount.position.x, mount.position.y, mount.position.z),
                currentEntity: null,
                renderOrder: mount.renderOrder || 50
            });
        });
    }

    attachEntity(entity, mountId) {
        let attached = false;
        Object.values(this.mounts).forEach(mountArray => {
            mountArray.forEach(mount => {
                if(mount.id === mountId && mount.compatibility.includes(entity.type)) {
                    entity.pos = mount.position.clone();
                    entity.renderOrder = mount.renderOrder || 100;

                    this.entity.addChild(entity);
                    mount.currentEntity = entity;
                    attached = true;

                    entity.hasComponent('sprite', (component) => {
                        component.renderOrder = mount.renderOrder;
                    });
                }
            });
        });

        // Update the render queue of the parent entity
        this.entity.hasComponent('spriteQueue', (spriteQueue) => {
            spriteQueue.updateRenderQueue();
        });

        if(!attached) {
            console.log(this);
            throw new Error('Mount ID not found or entity type not compatible with this mount.');
        }
    }

    detachEntity(mountId) {
        let detached = false;
        Object.values(this.mounts).forEach(mountArray => {
            mountArray.forEach(mount => {
                if(mount.id === mountId && mount.currentEntity) {
                    this.entity.removeChild(mount.currentEntity);
                    mount.currentEntity = null;
                    detached = true;
                }
            });
        });

        // Update the render queue of the parent entity
        this.entity.hasComponent('spriteQueue', (spriteQueue) => {
            spriteQueue.updateRenderQueue();
        });

        if(!detached) {
            throw new Error('Mount ID not found or no entity is currently attached.');
        }
    }

    updatePositions() {
        const entityPosition = this.entity.getGlobalPosition();
        const entityRotation = this.entity.getGlobalRotation();

        Object.values(this.mounts).forEach(mountArray => {
            mountArray.forEach(mount => {
                if(mount.currentEntity) {

                    // Rotate the mount position based on the entity's rotation
                    const rotatedPosition = mount.position.rotate(entityRotation);

                    // Set the new position of the mounted entity
                    mount.currentEntity.pos.set(
                        entityPosition.x + rotatedPosition.x,
                        entityPosition.y + rotatedPosition.y,
                        mount.currentEntity.pos.z // Retain the original z position
                    );

                    // Adjust the rotation of the mounted entity
                    mount.currentEntity.rotation = entityRotation;

                    // Logging for debugging
                    // console.log(`Entity Position: ${entityPosition}, Rotation: ${entityRotation}`);
                    // console.log(`Mount ID: ${mount.id}, New Position: ${mount.currentEntity.pos}, Rotation: ${mount.currentEntity.rotation}`);
                }
            });
        });
    }

    update(deltaTime) {
        this.updatePositions();
    }

    getMounts(type) {
        return this.mounts[type] || [];
    }

    getMountById(mountId) {
        let foundMount = null;
        Object.values(this.mounts).forEach(mountArray => {
            mountArray.forEach(mount => {
                if(mount.id === mountId) {
                    foundMount = mount;
                }
            });
        });
        return foundMount;
    }
}
