/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Generation
 * @license      Digitsensitive
 */

import { Genome } from './genome';
import { Neuroevolution } from './neuroevolution';

/* Generation class, composed of a set of Genomes */
export class Generation {
  private genomes: Genome[];
  private ne: Neuroevolution;

  constructor(ne: Neuroevolution) {
    /* init parameters */
    this.genomes = [];
    this.ne = ne;
  }

  public getGenomes(): Genome[] {
    return this.genomes;
  }

  /**
   * Add a genome to the generation.
   * @param {[type]} _genome [Genome to add]
   */
  public addGenome(genome: Genome): void {
    /* locate position to insert Genome into, the gnomes should remain sorted */
    const b = 0;
    for (let i = b; i < this.genomes.length; i++) {
      /* sort in descending order */
      if (this.ne.getConfiguration().scoreSort < 0) {
        if (genome.getScore() > this.genomes[i].getScore()) {
          break;
        }
      } else {
        /* sort in ascending order */
        if (genome.getScore() < this.genomes[i].getScore()) {
          break;
        }
      }
    }

    /* insert genome into correct position */
    this.genomes.splice(b, 0, genome);
  }

  /**
   * Generate the next generation
   */
  public generateNextGeneration() {
    const nexts = [];

    for (
      let i = 0;
      i <
      Math.round(
        this.ne.getConfiguration().elitism *
          this.ne.getConfiguration().population,
      );
      i++
    ) {
      if (nexts.length < this.ne.getConfiguration().population) {
        /* push a deep copy of ith Genome's Nethwork */
        nexts.push(JSON.parse(JSON.stringify(this.genomes[i].getNetwork())));
      }
    }

    for (
      let i = 0;
      i <
      Math.round(
        this.ne.getConfiguration().randomBehaviour *
          this.ne.getConfiguration().population,
      );
      i++
    ) {
      const n = JSON.parse(JSON.stringify(this.genomes[0].getNetwork()));

      for (const k in n.weights) {
        n.weights[k] = this.randomClamped();
      }

      if (nexts.length < this.ne.getConfiguration().population) {
        nexts.push(n);
      }
    }

    let max = 0;

    while (true) {
      for (let i = 0; i < max; i++) {
        /* create the children and push them to the nexts array */
        const childs = this.breed(
          this.genomes[i],
          this.genomes[max],
          this.ne.getConfiguration().nbChild > 0
            ? this.ne.getConfiguration().nbChild
            : 1,
        );

        for (const c in childs) {
          nexts.push(childs[c].network);

          if (nexts.length >= this.ne.getConfiguration().population) {
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
   * Breed to genomes to produce offspring(s)
   * @param  {[type]} g1       [Genome 1]
   * @param  {[type]} g2       [Genome 2]
   * @param  {[type]} nbChilds [Number of offspring (children)]
   * @return {Object}          [Object]
   */
  private breed(g1: Genome, g2: Genome, nbChilds: number): any {
    const datas = [];

    for (let nb = 0; nb < nbChilds; nb++) {
      /* Deep clone of genome 1 */
      const data = JSON.parse(JSON.stringify(g1));

      for (const i in g2.getNetwork().weights) {
        /* Genetic crossover
         * 0.5 is the crossover factor.
         * FIXME Really should be a predefined constant */
        if (Math.random() <= 0.5) {
          data.getNetwork().weights[i] = g2.getNetwork().weights[i];
        }
      }

      /* perform mutation on some weights */
      for (const i in data.network.weights) {
        if (Math.random() <= this.ne.getConfiguration().mutationRate) {
          data.network.weights[i] +=
            Math.random() * this.ne.getConfiguration().mutationRate * 2 -
            this.ne.getConfiguration().mutationRate;
        }
      }

      datas.push(data);
    }

    return datas;
  }

  /**
   * Returns a random value between -1 and 1
   * @return {number} [Random Value]
   */
  private randomClamped(): number {
    return Math.random() * 2 - 1;
  }
}
