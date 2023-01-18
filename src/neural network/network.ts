/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Network
 * @license      Digitsensitive
 */

import { INetworkData } from '../interfaces/network-data.interface';
import { Layer } from './layer';

export class Network {
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
        const inputLayer: Layer = new Layer(0);

        // The input layer will not have any connections to previous neurons (it is the input layer!)
        // so the previous neurons will be set to 0
        inputLayer.populate(input, 0);

        // Add the first layer to our network
        this.layers.push(inputLayer);

        // Now we loop through all the hidden layers (it is an array!)
        for(let index = 0; index < hidden.length; index++) {
            const newHiddenLayer:Layer = new Layer(index);
            
            if(index === 0) {
                // We now go to the next layer and move one to the right
                // This means, that we will get as many connections as input neurons exist
                newHiddenLayer.populate(hidden[index], input);
            } else {
                newHiddenLayer.populate(hidden[index], hidden[index - 1]);
            }
            
            this.layers.push(newHiddenLayer);
        }
        
        const lastLayer: number = (hidden.length === 0) ? input : hidden.pop()!
        
        // Create the output layer
        const outputLayer:Layer = new Layer(hidden.length);
        outputLayer.populate(output, lastLayer);
        
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
      
        this.layers.forEach((layer) => {
            data.neurons.push(layer.getNeurons().length)
            layer.getNeurons().forEach((neuron) => {
                data.weights.splice(data.weights.length, 0, ...neuron.weights)
            })
        })
        
        return data;
    }

    /**
     * Load network data into this network
     * @param data
     */
    public loadNetworkWithData(data: INetworkData): void {
        let index = 0;
        let previousNeurons = 0;
        let indexWeights = 0;

        this.resetNetwork();

        // Loop through all the layers
        for (const i in data.neurons) {
            // Create new layer
            const newLayer = new Layer(index);

            // We know how many neurons are in this layer, since we have the number saved
            // Get it and populate the network with random data
            newLayer.populate(data.neurons[i], previousNeurons);

            // Since we load network data, we now apply the data to the neurons
            for (const j in newLayer.getNeurons()) {
                for (const k in newLayer.getNeurons()[j].weights) {
                    newLayer.getNeurons()[j].weights[k] = data.weights[indexWeights];

                    // increment index of flat array
                    indexWeights++;
                }
            }

            // Push the layer into our network
            this.layers.push(newLayer);

            // We now go to the next layer and move one to the right
            // This means, that we will get as many connections as the last layer has neurons
            previousNeurons = data.neurons[i];
            index++;
        }
    }

    /**
     * Compute the output of an input
     * @param  {[type]} inputs [Set of inputs]
     * @return {Object}         [Network output]
     */
    private compute(inputs: any[]): Object {
        // Set the value of each neuron in the input layer
        for (const i in inputs) {
            if (this.layers[0] && this.layers[0].getNeurons()[i]) {
                this.layers[0].getNeurons()[i].value = inputs[i];
            }
        }

        /* Previous layer is input layer */
        let prevLayer = this.layers[0];

        for (let i = 1; i < this.layers.length; i++) {
            for (const j in this.layers[i].getNeurons()) {
                /* For each Neuron in each layer */
                let sum = 0;

                for (const k in prevLayer.getNeurons()) {
                    /* Every Neuron in the previous layer is an input to each Neuron in the next layer */
                    sum += prevLayer.getNeurons()[k].value * this.layers[i].getNeurons()[j].weights[k];
                }

                /* compute the activation of the Neuron */
                this.layers[i].getNeurons()[j].setValue(this.activation(sum));
            }

            prevLayer = this.layers[i];
        }

        /* all outputs of the Network */

        const out = [];
        const lastLayer = this.layers[this.layers.length - 1];

        for (const i in lastLayer.getNeurons()) {
            out.push(lastLayer.getNeurons()[i].value);
        }

        return out;
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
