/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/

export class Neuron {

  private value: number;
  private weights: number[];

  public getValue(): number { return this.value; }
  public getWeights(): number[] { return this.weights; }
  public setValue(v: number): void { this.value = v; }

  constructor() {

    /* init parameters */
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
    return Math.random() * 2 - 1;
  }

}
