/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Layer
 * @license      Digitsensitive
 */

import Neuron from './neuron';

export default class Layer {
    private __neurons__: Neuron[];

    constructor() {
        this.__neurons__ = [];
    }

    /**
     * Populate the layer with neurons.
     * Each neuron is initialized with a defined number of inputs and random clamped values.
     * @param numberNeurons
     * @param numberInputs
     */
    public populate(numberNeurons: number, numberInputs: number): void {
        for (let i = 0; i < numberNeurons; i++) {
            // create new neuron
            const newNeuron = new Neuron();

            // set the input connections to this new neuron
            newNeuron.populate(numberInputs);

            // push the neuron to the layer
            this.__neurons__.push(newNeuron);
        }
    }

    /**
     * Get the neurons of this layer
     */
    get neurons(): Neuron[] {
        return this.__neurons__;
    }

    /**
     * Reset all the neurons in this layer.
     */
    public resetLayer(): void {
        this.__neurons__ = [];
    }
}
