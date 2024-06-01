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
                typeCompatibility: mount.typeCompatibility,
                position: new Vector3D(mount.position.x, mount.position.y, mount.position.z),
                currentEntity: null,
                metaData: mount.metaData || {}
            });
        });
    }

    attachEntity(entity, mountId) {
        let attached = false;
        Object.values(this.mounts).forEach(mountArray => {
            mountArray.forEach(mount => {
                if(mount.id === mountId && mount.typeCompatibility.includes(entity.type)) {
                    mount.currentEntity = entity;
                    this.entity.addChild(entity);
                    attached = true;
                }
            });
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
        if(!detached) {
            throw new Error('Mount ID not found or no entity is currently attached.');
        }
    }

    updatePositions() {
        const entityPosition = this.entity.getGlobalPosition();
        const entityOrientation = this.entity.getGlobalRotation();

        Object.values(this.mounts).forEach(mountArray => {
            mountArray.forEach(mount => {
                if(mount.currentEntity) {
                    // const rotatedPosition = mount.pos.rotate(entityOrientation);
                    // mount.currentEntity.pos = entityPosition.add(rotatedPosition);
                    // mount.currentEntity.orientation = entityOrientation;
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
