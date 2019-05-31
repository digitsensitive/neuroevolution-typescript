/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Layer
 * @license      Digitsensitive
 */

import { Neuron } from './neuron';

export class Layer {
  private id: number;
  private neurons: Neuron[];

  constructor(index: number) {
    this.id = index;
    this.neurons = [];
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
      this.neurons.push(newNeuron);
    }
  }

  /**
   * Get the neurons of this layer
   */
  public getNeurons(): Neuron[] {
    return this.neurons;
  }

  /**
   * Reset all the neurons in this layer.
   */
  public resetLayer(): void {
    this.neurons = [];
  }
}
