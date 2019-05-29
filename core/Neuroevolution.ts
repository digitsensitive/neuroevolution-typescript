/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution
 * @license      Digitsensitive
 */

import { Generations } from "./Generations";
import { Genome } from "./Genome";
import { INeuroevolutionConfig } from "./interfaces/neuroevolution-config.interface";
import { Network } from "./neural network/Network";

export class Neuroevolution {
  private parameters: INeuroevolutionConfig;
  private generations: Generations;

  public getParams(): INeuroevolutionConfig {
    return this.parameters;
  }

  constructor(config: INeuroevolutionConfig) {
    // set basic neuroevolution class options
    this.parameters.network = config.network || [1, [1], 1]; // Perceptron network structure (1 hidden // layer).
    this.parameters.population = config.population || 50; // Population by generation.
    this.parameters.elitism = config.elitism || 0.2; // Best networks kepts unchanged for the next generation (rate).
    this.parameters.randomBehaviour = config.randomBehaviour || 0.2; // New random networks for the next generation (rate).
    this.parameters.mutationRate = config.mutationRate || 0.1; // Mutation rate on the weights of synapses.
    this.parameters.mutationRange = config.mutationRange || 0.5; // Interval of the mutation changes on the synapse weight.
    this.parameters.historic = config.historic || 0; // Latest generations saved.
    this.parameters.lowHistoric = config.lowHistoric || false; // Only save score (not the network).
    this.parameters.scoreSort = config.scoreSort || -1; // Sort order (-1 = desc, 1 = asc).
    this.parameters.nbChild = config.nbChild || 1; // Number of children by breeding.

    this.generations = new Generations(this);
  }

  /**
   * Override default options.
   * @param {INeuroevolution} _aParams [Return new object]
   */
  public set(params: INeuroevolutionConfig): void {
    this.parameters = params;
  }

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
    } else {
      /* otherwise, create next one */
      networks = this.generations.nextGeneration();
    }

    /* create Networks from the current Generation */
    let nns = [];
    for (let i in networks) {
      let nn = new Network();
      nn.loadNetworkWithData(networks[i]);
      nns.push(nn);
    }

    if (this.parameters.lowHistoric) {
      /* remove old Networks */
      if (this.generations.getGenerations().length >= 2) {
        let genomes = this.generations
          .getGenerations()
          [this.generations.getGenerations().length - 2].getGenomes();

        for (let i in genomes) {
          delete genomes[i];
        }
      }
    }

    if (this.parameters.historic != -1) {
      /* Remove older generations */
      if (
        this.generations.getGenerations().length >
        this.parameters.historic + 1
      ) {
        this.generations
          .getGenerations()
          .splice(
            0,
            this.generations.getGenerations().length -
              (this.parameters.historic + 1)
          );
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
