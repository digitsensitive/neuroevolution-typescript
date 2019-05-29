/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Generations
 * @license      Digitsensitive
 */

import { Generation } from "./Generation";
import { Neuroevolution } from "./Neuroevolution";
import { Network } from "./neural network/Network";

export class Generations {
  private generations: Generation[];
  private currentGeneration: Generation;
  private ne: Neuroevolution;

  public getGenerations(): Generation[] {
    return this.generations;
  }

  constructor(_ne: Neuroevolution) {
    /* init parameters */
    this.generations = [];
    this.currentGeneration = new Generation(_ne);
    this.ne = _ne;
  }

  /**
   * Create the first generation
   * @param  {[type]} _input   [Input layer]
   * @param  {[type]} _hiddens [Hidden layer(s)]
   * @param  {[type]} _output  [Output layer]
   * @return {[type]}          [First Generation]
   */
  public firstGeneration(_input?, _hiddens?, _output?) {
    /* FIXME input, hiddens, output unused */
    let out = [];

    for (let i = 0; i < this.ne.getParams().population; i++) {
      /* generate the Network and save it */
      let nn = new Network();

      nn.generateNetworkLayers(
        this.ne.getParams().network[0],
        this.ne.getParams().network[1],
        this.ne.getParams().network[2]
      );

      out.push(nn.getCopyOfTheNetwork());
    }

    this.generations.push(new Generation(this.ne));
    return out;
  }

  /**
   * Create the next Generation.
   */
  public nextGeneration() {
    if (this.generations.length == 0) {
      /* need to create first generation */
      return [];
    }

    let gen = this.generations[
      this.generations.length - 1
    ].generateNextGeneration();
    this.generations.push(new Generation(this.ne));
    return gen;
  }

  /**
   * Add a genome to the Generations
   * @param  {[type]} genome [Genome]
   * @return {[type]}        [False if no Generations to add to]
   */
  public addGenome(genome) {
    /* cant add to a Generation if there are no Generations */
    if (this.generations.length == 0) {
      return false;
    }

    // FIXME addGenome retuerns void.
    return this.generations[this.generations.length - 1].addGenome(genome);
  }
}
