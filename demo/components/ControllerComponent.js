import BaseComponent from '../../engine/src/components/BaseComponent.js';
import Vector3D from '../../engine/src/utils/maths/Vector3D.js';

export default class ControllerComponent extends BaseComponent {
    constructor() {
        super();
        this.profile = 'advanced';
        this.autoOrient = false;
        this.target = null;
        this.mousePosition = {x: 0, y: 0};
        this.currentInput = {ad: 0, ws: 0};
        this.isUpdatingProfile = false; // Prevent re-entrant state updates
    }

    onAdd(entity) {
        super.onAdd(entity);
        entity.eventBus.on('mouseWorldPositionChanged', (worldPos) => {
            this.mousePosition = {x: worldPos.x, y: worldPos.y};
        });

        // Apply initial damper state based on profile
        this.applyProfile();
    }

    setInput(ad, ws) {
        this.currentInput = {ad, ws};
    }

    setArcadeInput(ad, ws) {
        const thrustDirection = new Vector3D(ad, ws, 0); // Map input directly to x and y axis
        const thrustMagnitude = thrustDirection.magnitude();

        if(thrustMagnitude > 0) {
            if(thrustMagnitude > 1) {
                thrustDirection.normalize();
            }

            const powerPercentage = thrustMagnitude; // Power percentage based on input magnitude (0 to 1)
            this.applyThrust(thrustDirection, powerPercentage);
        }
    }

    setAdvancedInput(ad, ws) {
        // Apply torque for rotation
        if(ad !== 0) {
            const torqueDirection = ad > 0 ? 1 : -1; // Clockwise or counterclockwise
            const powerPercentage = Math.abs(ad);
            this.applyTorque(torqueDirection, powerPercentage);
        }

        // Apply thrust based on the current orientation
        if(ws !== 0) {
            const directionMultiplier = ws > 0 ? -1 : 1; // Reversed: forward thrust with S, backward thrust with W
            const thrustDirection = new Vector3D(
                Math.cos(this.entity.rotation) * directionMultiplier,
                Math.sin(this.entity.rotation) * directionMultiplier,
                0
            );
            const powerPercentage = Math.abs(ws); // Power percentage based on input magnitude (0 to 1)
            this.applyThrust(thrustDirection, powerPercentage);
        }
    }

    applyThrust(thrustDirection, powerPercentage) {
        this.entity.hasComponent('engine', (engine) => {
            engine.applyThrust(this.entity, thrustDirection, powerPercentage);
        }, () => {
            console.log("No engine attached to apply thrust");
        });
    }

    applyTorque(torqueDirection, powerPercentage) {
        this.entity.hasComponent('engine', (engine) => {
            engine.applyTorque(this.entity, torqueDirection, powerPercentage);
        }, () => {
            console.log("No engine attached to apply thrust");
        });
    }

    update(deltaTime) {
        const {ad, ws} = this.currentInput;
        if(this.profile === 'arcade') {
            this.setArcadeInput(ad, ws);
            this.handleAutoOrientation();
        } else if(this.profile === 'advanced') {
            this.setAdvancedInput(ad, ws);
            // Keep rotation in sync with orientation
            this.entity.rotation = this.entity.orientation;
        }
    }

    handleAutoOrientation() {
        if(this.autoOrient && this.profile === 'arcade') {
            let targetDirection;
            if(this.target) {
                targetDirection = this.target.pos.subtract(this.entity.pos).normalize();
            } else {
                targetDirection = new Vector3D(this.mousePosition.x, this.mousePosition.y).subtract(this.entity.pos).normalize();
            }

            let targetRotation = Math.atan2(targetDirection.y, targetDirection.x);

            // Ensure smooth angle transition
            const currentRotation = this.entity.rotation;
            const deltaRotation = targetRotation - currentRotation;

            // Adjust for the shortest path
            if(deltaRotation > Math.PI) {
                targetRotation -= 2 * Math.PI;
            } else if(deltaRotation < -Math.PI) {
                targetRotation += 2 * Math.PI;
            }

            this.entity.rotation += (targetRotation - currentRotation) * 0.5; // Adjust the interpolation factor as needed
        }
    }


    setProfile(profile) {
        if(this.isUpdatingProfile) return;
        this.isUpdatingProfile = true;
        this.profile = profile;
        this.applyProfile();
        this.isUpdatingProfile = false;
    }

    applyProfile() {
        this.entity.hasComponent('damper', (component) => {
            if(this.profile === 'arcade') {
                if(component.isActive && component.userRequestedState) {
                    this.autoOrient = true;  // Enable auto-orientation in arcade mode
                } else {
                    this.profile = 'advanced'; // Revert to advanced if damper cannot be enabled
                }
            } else {
                this.autoOrient = false; // Disable auto-orientation in advanced mode
            }
        });
    }

    switchProfile() {
        this.entity.hasComponent('damper', (component) => {
            if(this.profile === 'arcade') {
                this.setProfile('advanced');
            } else {
                if(component.userRequestedState) {
                    this.setProfile('arcade');
                }
            }
        });
    }

    switchOrientationMode() {
        this.autoOrient = !this.autoOrient;

        if(!this.autoOrient) {
            // When auto-orientation is turned off, keep the current rotation
            this.entity.orientation = this.entity.rotation;
        } else {
            // When auto-orientation is turned on, sync rotation and orientation
            this.entity.rotation = this.entity.orientation;
        }
    }

    updateProfileBasedOnDamper(damperState) {
        if(this.isUpdatingProfile) return;
        this.isUpdatingProfile = true;

        if(damperState) {
            this.setProfile('arcade');
            this.autoOrient = true; // Ensure auto-orientation is enabled
        } else {
            this.setProfile('advanced');
            this.autoOrient = false; // Ensure auto-orientation is disabled
            this.entity.orientation = this.entity.rotation; // Sync orientation with the current rotation
        }

        this.isUpdatingProfile = false;

        // Log damper state and profile
        console.log('Damper State:', damperState, 'Profile:', this.profile);
    }
}
