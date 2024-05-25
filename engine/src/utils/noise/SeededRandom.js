export default class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }

    random() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    between(min, max) {
        return Math.floor(this.random() * (max - min + 1)) + min;
    }

    /**
     * Custom probability distribution, also know as...
     *
     * Weighted Random Sampling: This is a method where each outcome has a different probability of being selected based on given weights.
     * Biased Random Number Generation: This term is used to describe generating noise numbers with non-uniform probabilities.
     * Custom Probability Distribution Sampling: This term refers to generating samples from a probability distribution that is defined by custom weights or biases.
     *
     * 1. Normalize the bias array: First, we need to normalize the biases to create a probability distribution.
     * 2. Create cumulative probabilities: This will help us to select a range based on the normalized biases.
     * 3. Select a range and generate a noise number within that range: We'll use the noise value to determine which range to select and then generate a number within that range.
     *
     * @param min
     * @param max
     * @param bias
     * @returns {*}
     */

    biased(min, max, bias) {
        const totalBias = bias.reduce((acc, val) => acc + val, 0);
        const normalizedBias = bias.map(val => val / totalBias);
        const cumulativeProbabilities = [];
        normalizedBias.reduce((acc, val, index) => {
            acc += val;
            cumulativeProbabilities[index] = acc;
            return acc;
        }, 0);

        const randomValue = this.random();
        let selectedIndex = cumulativeProbabilities.findIndex(prob => randomValue < prob);

        if(selectedIndex === -1) {
            selectedIndex = bias.length - 1;
        }

        const rangeMin = min + selectedIndex * Math.floor((max - min + 1) / bias.length);
        const rangeMax = rangeMin + Math.floor((max - min + 1) / bias.length) - 1;

        return this.between(rangeMin, rangeMax);
    }

    from(list, bias = null) {
        if(!bias) {
            const index = this.between(0, list.length - 1);
            return list[index];
        }

        const totalBias = bias.reduce((acc, val) => acc + val, 0);
        const normalizedBias = bias.map(val => val / totalBias);
        const cumulativeProbabilities = [];
        normalizedBias.reduce((acc, val, index) => {
            acc += val;
            cumulativeProbabilities[index] = acc;
            return acc;
        }, 0);

        const randomValue = this.random();
        let selectedIndex = cumulativeProbabilities.findIndex(prob => randomValue < prob);

        if(selectedIndex === -1) {
            selectedIndex = bias.length - 1;
        }

        return list[selectedIndex];
    }
}
