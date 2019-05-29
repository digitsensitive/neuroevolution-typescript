/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Layer
 * @license      Digitsensitive
 */

import { Neuron } from "./Neuron";

export class Layer {
  private id: number;
  private neurons: Neuron[];

  public getNeurons(): Neuron[] {
    return this.neurons;
  }

  constructor(_index: number) {
    /* init parameters */
    this.id = _index || 0;
    this.neurons = [];
  }

  /**
   * Populate the Layer with a set of randomly weighted Neurons
   * Each Neuron be initialied with nbInputs inputs with a random clamped value
   * @param {[type]} nbNeurons [Number of neurons]
   * @param {[type]} nbInputs  [Number of inputs]
   */
  public populate(nbNeurons, nbInputs): void {
    this.neurons = [];

    for (let i = 0; i < nbNeurons; i++) {
      /* create new Neuron */
      let n = new Neuron();

      /* init the Neuron */
      n.populate(nbInputs);

      /* push the Neuron to the layer */
      this.neurons.push(n);
    }
  }
}
