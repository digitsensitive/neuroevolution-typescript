/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/

import { Layer } from './Layer';

/* Neural Network class, composed of Neuron Layers */
export class Network {

  private layers: Layer[];

  constructor() {

    /* init parameters */
    this.layers = [];

  }

  /**
   * Generate the Network layers
   * @param  {[type]} _input   [Number of Neurons in Input layer]
   * @param  {[type]} _hiddens [Number of Neurons per Hidden layer]
   * @param  {[type]} _output  [Number of Neurons in Output layer]
   * @return {[type]}          [void]
   */
  public perceptronGeneration(_input, _hiddens, _output): void {

    let index = 0;
		let previousNeurons = 0;
		let l = new Layer(index);

    /* Number of inputs will be set to 0 since it is an input layer */
		l.populate(_input, previousNeurons);

    /* number of input is size of previous layer */
		previousNeurons = _input;

		this.layers.push(l);

		index++;

    for (let i in _hiddens) {

			/* Repeat same process as first layer for each hidden layer */
			let l = new Layer(index);
			l.populate(_hiddens[i], previousNeurons);
			previousNeurons = _hiddens[i];
			this.layers.push(l);
			index++;

		}

    let layer = new Layer(index);

    /* Number of input is equal to the size of the last hidden layer */
		layer.populate(_output, previousNeurons);
		this.layers.push(layer);

	}

  /**
   * Create a copy of the Network (neurons and weights)
   * Returns number of neurons per layer and a flat array of all weights.
   * @return {Object} [Network data]
   */
  public getSave(): Object {

    let datas = {
      neurons: [], // Number of Neurons per layer.
      weights: []  // Weights of each Neuron's inputs.
    };

    for (let i in this.layers) {

      datas.neurons.push(this.layers[i].getNeurons().length);

      for (let j in this.layers[i].getNeurons()) {
        for (let k in this.layers[i].getNeurons()[j].getWeights()) {

          /* push all input weights of each Neuron of each Layer into a flat array */
          datas.weights.push(this.layers[i].getNeurons()[j].getWeights()[k]);

        }
      }
    }

    return datas;

  }

  /**
   * Apply network data (neurons and weights)
   * @param {[type]} _save [Copy of network data (neurons and weights)]
   */
  private setSave(_save): void {

    let previousNeurons = 0;
    let index = 0;
    let indexWeights = 0;

    this.layers = [];

    for (let i in _save.neurons) {

      // Create and populate layers

      var layer = new Layer(index);

      layer.populate(_save.neurons[i], previousNeurons);

      for (let j in layer.getNeurons()) {
        for(let k in layer.getNeurons()[j].getWeights()) {

          /* Apply neurons weights to each Neuron */
          layer.getNeurons()[j].getWeights()[k] = _save.weights[indexWeights];

          /* increment index of flat array */
          indexWeights++;

        }

      }

      previousNeurons = _save.neurons[i];
      index++;
      this.layers.push(layer);

    }

  }

  /**
   * Compute the output of an input
   * @param  {[type]} _inputs [Set of inputs]
   * @return {Object}         [Network output]
   */
  private compute(_inputs): Object {

    /* Set the value of each Neuron in the input layer */
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
					sum += prevLayer.getNeurons()[k].getValue() * this.layers[i].getNeurons()[j].getWeights()[k];

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

			out.push(lastLayer.getNeurons()[i].getValue());

		}

    return out;

  }

  /**
   * Logistic activation function
   * @param  {number} a  [Input Value]
   * @return {number}    [Return Value]
   */
  private activation(a: number): number {
    let ap = (-a)/1;
    return (1/(1 + Math.exp(ap)));
  }


}
