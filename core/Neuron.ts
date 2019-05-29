/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Neuron
 * @license      Digitsensitive
 */

export class Neuron {
  public value: number;
  public weights: number[];

  public setValue(v: number): void {
    this.value = v;
  }

  constructor() {
    this.value = 0;
    this.weights = [];
  }

  /**
   * Initialize number of neuron weights to random clamped values
   * @param {number} nb Number of neuron weights (number of inputs).
   */
  public populate(nb: number): void {
    this.weights = [];

    for (let i = 0; i < nb; i++) {
      this.weights.push(this.randomClamped());
    }
  }

  /**
   * Returns a random value between -1 and 1
   * @return {number} [Random Value]
   */
  private randomClamped(): number {
    // [0,1) 0.999 * 2
    return Math.random() * 2 - 1;
  }
}
