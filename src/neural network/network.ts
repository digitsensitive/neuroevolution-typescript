/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Network
 * @license      Digitsensitive
 */

import { INetworkData } from "../interfaces/network-data.interface";
import { Layer } from "./layer";

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
  public generateNetworkLayers(
    input: number,
    hidden: number[],
    output: number
  ): void {
    let index = 0;
    let previousNeurons = 0;
    let inputLayer = new Layer(index);

    // The input layer will not have any connections to previous neurons (it is the input layer!)
    // so the previous neurons will be set to 0
    inputLayer.populate(input, previousNeurons);

    // Add the first layer to our network
    this.layers.push(inputLayer);

    // We now go to the next layer and move one to the right
    // This means, that we will get as many connections as input neurons exist
    previousNeurons = input;
    index++;

    // Now we loop through all the hidden layers (it is an array!)
    for (let i in hidden) {
      let newHiddenLayer = new Layer(index);
      newHiddenLayer.populate(hidden[i], previousNeurons);
      this.layers.push(newHiddenLayer);

      previousNeurons = hidden[i];
      index++;
    }

    // Create the output layer
    let outputLayer = new Layer(index);
    outputLayer.populate(output, previousNeurons);
    this.layers.push(outputLayer);
  }

  /**
   * Create and get a copy of the network (neurons and weights)
   * Returns array with the number of neurons in each layer and a flat array of all weights.
   */
  public getCopyOfTheNetwork(): INetworkData {
    const data = {} as INetworkData;

    for (let i in this.layers) {
      data.neurons.push(this.layers[i].getNeurons().length);

      // loop through the neurons
      for (let j in this.layers[i].getNeurons()) {
        // for each neuron have a look at the corresponding weights
        for (let k in this.layers[i].getNeurons()[j].weights) {
          // push all input weights of each neuron from each layer into a flat array
          data.weights.push(this.layers[i].getNeurons()[j].weights[k]);
        }
      }
    }

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
    for (let i in data.neurons) {
      // Create new layer
      var newLayer = new Layer(index);

      // We know how many neurons are in this layer, since we have the number saved
      // Get it and populate the network with random data
      newLayer.populate(data.neurons[i], previousNeurons);

      // Since we load network data, we now apply the data to the neurons
      for (let j in newLayer.getNeurons()) {
        for (let k in newLayer.getNeurons()[j].weights) {
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
   * @param  {[type]} _inputs [Set of inputs]
   * @return {Object}         [Network output]
   */
  private compute(_inputs: any[]): Object {
    // Set the value of each neuron in the input layer
    for (let i in _inputs) {
      if (this.layers[0] && this.layers[0].getNeurons()[i]) {
        this.layers[0].getNeurons()[i].value = _inputs[i];
      }
    }

    /* Previous layer is input layer */
    let prevLayer = this.layers[0];

    for (let i = 1; i < this.layers.length; i++) {
      for (let j in this.layers[i].getNeurons()) {
        /* For each Neuron in each layer */
        let sum = 0;

        for (let k in prevLayer.getNeurons()) {
          /* Every Neuron in the previous layer is an input to each Neuron in the next layer */
          sum +=
            prevLayer.getNeurons()[k].value *
            this.layers[i].getNeurons()[j].weights[k];
        }

        /* compute the activation of the Neuron */
        this.layers[i].getNeurons()[j].setValue(this.activation(sum));
      }

      prevLayer = this.layers[i];
    }

    /* all outputs of the Network */

    let out = [];
    let lastLayer = this.layers[this.layers.length - 1];

    for (let i in lastLayer.getNeurons()) {
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
    let ap = -a / 1;
    return 1 / (1 + Math.exp(ap));
  }

  /**
   * Reset all the layers of this network
   */
  private resetNetwork(): void {
    this.layers = [];
  }
}
