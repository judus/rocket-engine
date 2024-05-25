export const movementStateDefinitions = [
    {
        name: 'walk',
        maxSpeed: 1000,
        accelerationProfile: {
            initialAcceleration: 1000,
            peakAcceleration: 300,
            finalAcceleration: 800,
            midpoint: 0.3
        },
        decelerationProfile: {
            initialDeceleration: 1,
            peakDeceleration: 10,
            finalDeceleration: 200,
            midpoint: 0.8
        }
    },
    {
        name: 'run',
        maxSpeed: 400,
        accelerationProfile: {
            initialAcceleration: 2,
            peakAcceleration: 4,
            finalAcceleration: 1,
            midpoint: 0.5
        },
        decelerationProfile: {
            initialDeceleration: 2,
            peakDeceleration: 4,
            finalDeceleration: 1,
            midpoint: 0.5
        }
    },
    {
        name: 'sneak',
        maxSpeed: 100,
        accelerationProfile: {
            initialAcceleration: 0.5,
            peakAcceleration: 1,
            finalAcceleration: 0.2,
            midpoint: 0.5
        },
        decelerationProfile: {
            initialDeceleration: 0.5,
            peakDeceleration: 1,
            finalDeceleration: 0.2,
            midpoint: 0.5
        }
    }
];