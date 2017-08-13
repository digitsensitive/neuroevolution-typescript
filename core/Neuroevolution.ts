/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/

import { Generations } from './Generations';
import { Network } from './Network';
import { Genome } from './Genome';

interface NeuroevolutionConstructor {
  network?: any[];
	population?: number;
	elitism?: number;
  randomBehaviour?: number;
	mutationRate?: number;
	mutationRange?: number;
	historic?: number;
	lowHistoric?: boolean;
	scoreSort?: number;
	nbChild?: number;
}

export class Neuroevolution {

  private aParams: NeuroevolutionConstructor;
  private generations: Generations;

  public getAParams(): NeuroevolutionConstructor { return this.aParams; }

  constructor(_aParams: NeuroevolutionConstructor) {

    /* various factors and parameters (along with default values) */
    this.aParams.network = _aParams.network || [1, [1], 1];         // Perceptron network structure (1 hidden // layer).
    this.aParams.population = _aParams.population || 50;            // Population by generation.
    this.aParams.elitism = _aParams.elitism || 0.2;                 // Best networks kepts unchanged for the next generation (rate).
    this.aParams.randomBehaviour = _aParams.randomBehaviour || 0.2; // New random networks for the next generation (rate).
    this.aParams.mutationRate = _aParams.mutationRate || 0.1;       // Mutation rate on the weights of synapses.
    this.aParams.mutationRange = _aParams.mutationRange || 0.5;     // Interval of the mutation changes on the synapse weight.
    this.aParams.historic = _aParams.historic || 0;                 // Latest generations saved.
    this.aParams.lowHistoric = _aParams.lowHistoric || false;       // Only save score (not the network).
    this.aParams.scoreSort = _aParams.scoreSort || -1;              // Sort order (-1 = desc, 1 = asc).
    this.aParams.nbChild = _aParams.nbChild || 1;                   // Number of children by breeding.

    this.generations = new Generations(this);

  }

  /**
   * Override default options.
   * @param {NeuroevolutionConstructor} _aParams [Return new object]
   */
  public set(_aParams: NeuroevolutionConstructor): void { this.aParams = _aParams; }

	/**
	 * Reset and create a new Generations object.
	 */
	private restart(): void {
		this.generations = new Generations(this);
	}

	/**
	 * Create the next generation.
	 */
	public nextGeneration() {

		var networks = [];

		if (this.generations.getGenerations().length == 0) {

      /* if no Generations, create first */
			networks = this.generations.firstGeneration();

		}

    else {
      /* otherwise, create next one */
			networks = this.generations.nextGeneration();

		}

    /* create Networks from the current Generation */
		let nns = [];
		for (let i in networks) {

			let nn = new Network();
			nn.setSave(networks[i]);
			nns.push(nn);

		}

		if (this.aParams.lowHistoric) {

      /* remove old Networks */
			if (this.generations.getGenerations().length >= 2) {

				let genomes = this.generations.getGenerations()[this.generations.getGenerations().length - 2].getGenomes();

        for (let i in genomes) {
					delete genomes[i];
				}
			}
		}

		if (this.aParams.historic != -1) {
      /* Remove older generations */
			if (this.generations.getGenerations().length > this.aParams.historic + 1){
        			this.generations.getGenerations().splice(0,
            			this.generations.getGenerations().length - (this.aParams.historic + 1));
			}
		}

		return nns;
	}

  /**
   * Adds a new Genome with specified Neural Network and score.
   * @param {[type]} network [Neural Network]
   * @param {[type]} score   [Score value]
   */
	public networkScore(network, score): void {
		this.generations.addGenome(new Genome(score, network.getSave()));
	}

}
