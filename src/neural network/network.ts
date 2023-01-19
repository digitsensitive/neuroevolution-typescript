/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Network
 * @license      Digitsensitive
 */

import Layer from './layer';
import Neuron from './neuron';

export default class Network {
    private layers: Layer[];

    constructor() {
        this.layers = [];
    }

    /**
     * Generate all the layers of the network
     * @param input [number of neurons in the input layer]
     * @param hidden [number of neurons per hidden layer]
     * @param output [number of neurons in the output layer]
     */
    public generateNetworkLayers(input: number, hidden: number[], output: number): void {
        let index = 0;
        let previousNeurons = 0;

        // The input layer will not have any connections to previous neurons (it is the input layer!)
        // so the previous neurons will be set to 0
        const inputLayer: Layer = new Layer(index);
        inputLayer.populate(input, previousNeurons);

        // Add the first layer to our network
        this.layers.push(inputLayer);

        // We now go to the next layer and move one to the right
        // This means, that we will get as many connections as input neurons exist
        previousNeurons = input;
        index++;

        // Now we loop through all the hidden layers (it is an array!)
        for (index; index <= hidden.length; index++) {
            const newHiddenLayer: Layer = new Layer(index);

            newHiddenLayer.populate(hidden[index - 1], previousNeurons);

            this.layers.push(newHiddenLayer);

            previousNeurons = hidden[index - 1];
        }

        // Create the output layer
        const outputLayer: Layer = new Layer(index);
        outputLayer.populate(output, previousNeurons);

        this.layers.push(outputLayer);
    }

    /**
     * Create and get a copy of the network (neurons and weights)
     * Returns array with the number of neurons in each layer and a flat array of all weights.
     */
    public getCopyOfTheNetwork(): INetworkData {
        const data: INetworkData = {
            neurons: [],
            weights: []
        };

        const layerLen: number = this.layers.length;

        for (let layerIndex = 0; layerIndex < layerLen; layerIndex++) {
            const layer: Layer = this.layers[layerIndex];
            const neurons: Neuron[] = layer.neurons;
            const neuronLen: number = neurons.length;

            data.neurons.push(neuronLen);

            for (let neuronIndex = 0; neuronIndex < neuronLen; neuronIndex++) {
                data.weights.splice(data.weights.length, 0, ...neurons[neuronIndex].weights);
            }
        }

        return data;
    }

    /**
     * Load network data into this network
     * @param data
     */
    public loadNetworkWithData(data: INetworkData): void {
        const neuronLen: number = data.neurons.length;
        let previousNeurons = 0;
        let weightIndex = 0;

        this.resetNetwork();

        // Loop through all the neuron and create new Layers
        for (let index = 0; index < neuronLen; index++) {
            const newLayer: Layer = new Layer(index);
            newLayer.populate(data.neurons[index], previousNeurons);

            // We know how many neurons are in this layer, since we have the number saved
            // Get it and populate the network with random data
            const newLayerNeurons: Neuron[] = newLayer.neurons;

            const newLayerNeuronsLength: number = newLayerNeurons.length;

            // Since we load network data, we now apply the data to the neurons
            for (let newLayerNeuronsIndex = 0; newLayerNeuronsIndex < newLayerNeuronsLength; newLayerNeuronsIndex++) {
                const weightLength: number = newLayerNeurons[newLayerNeuronsIndex].weights.length;
                for (let newLayerWeightIndex = 0; newLayerWeightIndex < weightLength; newLayerWeightIndex++) {
                    newLayerNeurons[newLayerNeuronsIndex].weights[newLayerWeightIndex] = data.weights[weightIndex];

                    weightIndex++;
                }
            }

            this.layers.push(newLayer);

            // We now go to the next layer and move one to the right
            // This means, that we will get as many connections as the last layer has neurons
            previousNeurons = data.neurons[index];
        }
    }

    /**
     * Compute the output of an input
     * @param  {[type]} inputs [Set of inputs]
     * @return {Object}         [Network output]
     */
    private compute(inputs: number[]): number[] {
        const inputLen: number = inputs.length;
        const inputLayerIndex = 0;
        const layerLen: number = this.layers.length;
        const computedValue: number[] = [];

        for (let inputIndex = 0; inputIndex < inputLen; inputIndex++) {
            const inputLayer: Layer = this.layers[inputLayerIndex];

            if (this.layers[inputLayerIndex] && inputLayer.neurons[inputIndex]) {
                inputLayer.neurons[inputIndex].value = inputs[inputIndex];
            }
        }

        /* Previous layer is input layer */
        // this.layers[0]

        for (let i = 1; i < layerLen; i++) {
            const prevLayer: Layer = this.layers[i - 1];
            const currentLayer: Layer = this.layers[i];

            const prevLayerNeuronLen: number = prevLayer.neurons.length;
            const layerNeuronLen: number = currentLayer.neurons.length;

            for (let neuronIndex = 0; neuronIndex < layerNeuronLen; neuronIndex++) {
                /* For each Neuron in each layer */
                let sum = 0;

                for (let prevLayerNeuronIndex = 0; prevLayerNeuronIndex < prevLayerNeuronLen; prevLayerNeuronIndex++) {
                    /* Every Neuron in the previous layer is an input to each Neuron in the next layer */
                    sum += prevLayer.neurons[prevLayerNeuronIndex].value * currentLayer.neurons[neuronIndex].weights[prevLayerNeuronIndex];
                }

                /* compute the activation of the Neuron */
                currentLayer.neurons[neuronIndex].setValue(this.activation(sum));
            }
        }

        /* all outputs of the Network */
        const lastLayer: Layer = this.layers[layerLen - 1];
        const lastLayerNeuronLen: number = lastLayer.neurons.length;

        for (let i = 0; i < lastLayerNeuronLen; i++) {
            computedValue.push(lastLayer.neurons[i].value);
        }

        return computedValue;
    }

    /**
     * Logistic activation function
     * @param  {number} a  [Input Value]
     * @return {number}    [Return Value]
     */
    private activation(a: number): number {
        const ap = -a / 1;
        return 1 / (1 + Math.exp(ap));
    }

    /**
     * Reset all the layers of this network
     */
    private resetNetwork(): void {
        this.layers = [];
    }
}
