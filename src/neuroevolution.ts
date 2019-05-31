/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution
 * @license      Digitsensitive
 */

import { Generations } from './Generations';
import { Genome } from './genome';
import { INetworkData } from './interfaces/network-data.interface';
import { INeuroevolutionConfig } from './interfaces/neuroevolution-config.interface';
import { Network } from './neural network/network';

export class Neuroevolution {
  private configuration: INeuroevolutionConfig = {} as INeuroevolutionConfig;
  private generations: Generations;

  constructor(config: INeuroevolutionConfig) {
    // set basic neuroevolution class options
    this.configuration.network = config.network || [1, [1], 1]; // Perceptron network structure (1 hidden // layer).
    this.configuration.population = config.population || 50; // Population by generation.
    this.configuration.elitism = config.elitism || 0.2; // Best networks kepts unchanged for the next generation (rate).
    this.configuration.randomBehaviour = config.randomBehaviour || 0.2; // New random networks for the next generation (rate).
    this.configuration.mutationRate = config.mutationRate || 0.1; // Mutation rate on the weights of synapses.
    this.configuration.mutationRange = config.mutationRange || 0.5; // Interval of the mutation changes on the synapse weight.
    this.configuration.historic = config.historic || 0; // Latest generations saved.
    this.configuration.lowHistoric = config.lowHistoric || false; // Only save score (not the network).
    this.configuration.scoreSort = config.scoreSort || -1; // Sort order (-1 = desc, 1 = asc).
    this.configuration.nbChild = config.nbChild || 1; // Number of children by breeding.

    this.generations = new Generations(this);
  }

  /**
   * Get the configuration of this class
   */
  public getConfiguration(): INeuroevolutionConfig {
    return this.configuration;
  }

  /**
   * Override the default configuration of this class
   */
  public setConfiguration(config: INeuroevolutionConfig): void {
    this.configuration = config;
  }

  /**
   * Reset and create a new generations object
   */
  public resetGeneration(): void {
    this.generations = new Generations(this);
  }

  /**
   * Create the next generation
   */
  public nextGeneration() {
    let networks: any = [];

    if (this.generations.getGenerations().length === 0) {
      /* if no Generations, create first */
      networks = this.generations.firstGeneration();
    } else {
      /* otherwise, create next one */
      networks = this.generations.nextGeneration();
    }

    /* create Networks from the current Generation */
    const nns: any = [];
    for (const i of Object.keys(networks)) {
      const nn = new Network();
      nn.loadNetworkWithData(networks[i]);
      nns.push(nn);
    }

    if (this.configuration.lowHistoric) {
      /* remove old Networks */
      if (this.generations.getGenerations().length >= 2) {
        const genomes = this.generations
          .getGenerations()
          [this.generations.getGenerations().length - 2].getGenomes();

        for (const i in genomes) {
          delete genomes[i];
        }
      }
    }

    if (this.configuration.historic !== -1) {
      /* Remove older generations */
      if (
        this.generations.getGenerations().length >
        this.configuration.historic + 1
      ) {
        this.generations
          .getGenerations()
          .splice(
            0,
            this.generations.getGenerations().length -
              (this.configuration.historic + 1),
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
  public networkScore(network: Network, score: number): void {
    this.generations.addGenome(
      new Genome(score, network.getCopyOfTheNetwork()),
    );
  }
}
