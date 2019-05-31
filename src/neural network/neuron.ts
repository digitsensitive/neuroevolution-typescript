/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Neuron
 * @license      Digitsensitive
 */

export class Neuron {
  public value: number;
  public weights: number[];

  constructor() {
    this.value = 0;
    this.weights = [];
  }

  /**
   * Set a new value
   * @param value
   */
  public setValue(value: number): void {
    this.value = value;
  }

  /**
   * Populate the neuron with random weights for each connection
   * @param numberOfInputs [Number of inputs].
   */
  public populate(numberOfInputs: number): void {
    for (let i = 0; i < numberOfInputs; i++) {
      this.weights.push(this.randomClamped());
    }
  }

  /**
   * Reset all the weights
   */
  public resetWeights(): void {
    this.weights = [];
  }

  /**
   * Returns a random value between [-1,1)
   */
  private randomClamped(): number {
    return Math.random() * 2 - 1;
  }
}
