// Animation configuration
export const animations = {
    // Timing
    duration: {
        fast: 200,
        normal: 300,
        slow: 500,
        verySlow: 1000,
    },

    // Easing curves
    easing: {
        easeInOut: [0.4, 0, 0.2, 1],
        easeOut: [0.0, 0, 0.2, 1],
        easeIn: [0.4, 0, 1, 1],
        bounce: [0.68, -0.55, 0.265, 1.55],
    },

    // Animation presets
    presets: {
        fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1 },
            duration: 300,
        },
        slideUp: {
            from: { translateY: 50, opacity: 0 },
            to: { translateY: 0, opacity: 1 },
            duration: 400,
        },
        scaleIn: {
            from: { scale: 0.8, opacity: 0 },
            to: { scale: 1, opacity: 1 },
            duration: 300,
        },
        pulse: {
            from: { scale: 1 },
            to: { scale: 1.1 },
            duration: 1000,
            loop: true,
            direction: 'alternate',
        },
    },
};

export default animations;
