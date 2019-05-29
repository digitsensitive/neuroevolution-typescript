/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Generation
 * @license      Digitsensitive
 */

import { Genome } from "./Genome";
import { Neuroevolution } from "./Neuroevolution";

/* Generation class, composed of a set of Genomes */
export class Generation {
  private genomes: Genome[];
  private ne: Neuroevolution;

  public getGenomes(): Genome[] {
    return this.genomes;
  }

  constructor(_ne: Neuroevolution) {
    /* init parameters */
    this.genomes = [];
    this.ne = _ne;
  }

  /**
   * Add a genome to the generation.
   * @param {[type]} _genome [Genome to add]
   */
  public addGenome(_genome): void {
    /* locate position to insert Genome into, the gnomes should remain sorted */

    for (var i = 0; i < this.genomes.length; i++) {
      /* sort in descending order */
      if (this.ne.getParams().scoreSort < 0) {
        if (_genome.score > this.genomes[i].getScore()) {
          break;
        }
      } else {
        /* sort in ascending order */
        if (_genome.score < this.genomes[i].getScore()) {
          break;
        }
      }
    }

    /* insert genome into correct position */
    this.genomes.splice(i, 0, _genome);
  }

  /**
   * Breed to genomes to produce offspring(s)
   * @param  {[type]} g1       [Genome 1]
   * @param  {[type]} g2       [Genome 2]
   * @param  {[type]} nbChilds [Number of offspring (children)]
   * @return {Object}          [Object]
   */
  private breed(g1, g2, nbChilds): Object {
    let datas = [];

    for (let nb = 0; nb < nbChilds; nb++) {
      /* Deep clone of genome 1 */
      let data = JSON.parse(JSON.stringify(g1));

      for (let i in g2.network.weights) {
        /* Genetic crossover
         * 0.5 is the crossover factor.
         * FIXME Really should be a predefined constant */
        if (Math.random() <= 0.5) {
          data.network.weights[i] = g2.network.weights[i];
        }
      }

      /* perform mutation on some weights */
      for (let i in data.network.weights) {
        if (Math.random() <= this.ne.getParams().mutationRate) {
          data.network.weights[i] +=
            Math.random() * this.ne.getParams().mutationRate * 2 -
            this.ne.getParams().mutationRate;
        }
      }

      datas.push(data);
    }

    return datas;
  }

  /**
   * Generate the next generation
   */
  public generateNextGeneration() {
    let nexts = [];

    for (
      let i = 0;
      i <
      Math.round(this.ne.getParams().elitism * this.ne.getParams().population);
      i++
    ) {
      if (nexts.length < this.ne.getParams().population) {
        /* push a deep copy of ith Genome's Nethwork */
        nexts.push(JSON.parse(JSON.stringify(this.genomes[i].getNetwork())));
      }
    }

    for (
      let i = 0;
      i <
      Math.round(
        this.ne.getParams().randomBehaviour * this.ne.getParams().population
      );
      i++
    ) {
      let n = JSON.parse(JSON.stringify(this.genomes[0].getNetwork()));

      for (let k in n.weights) {
        n.weights[k] = this.randomClamped();
      }

      if (nexts.length < this.ne.getParams().population) {
        nexts.push(n);
      }
    }

    let max = 0;

    while (true) {
      for (let i = 0; i < max; i++) {
        /* create the children and push them to the nexts array */
        let childs = this.breed(
          this.genomes[i],
          this.genomes[max],
          this.ne.getParams().nbChild > 0 ? this.ne.getParams().nbChild : 1
        );

        for (let c in childs) {
          nexts.push(childs[c].network);

          if (nexts.length >= this.ne.getParams().population) {
            /* Return once number of children is equal to the
             * population by generatino value */
            return nexts;
          }
        }
      }

      max++;
      if (max >= this.genomes.length - 1) {
        max = 0;
      }
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
