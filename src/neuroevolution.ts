/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution
 * @license      Digitsensitive
 */

import Generations from './generations';
import Genome from './network/genome';
import Network from './network/network';
import { INeuroevolutionConfigRequired, INeuroevolutionConfig } from './types/neuroevolution-config';
import { INetworkData } from './types/network-data';

/**
 * Main index file
 * */
class Neuroevolution {
    private configuration: INeuroevolutionConfigRequired;
    private generations: Generations;

    constructor(config?: INeuroevolutionConfig) {
        this.configuration = Object.assign(
            {
                network: [1, [2], 1], // Perceptron network structure (1 hidden // layer).
                population: 50, // Population by generation.
                elitism: 0.2, // Best networks kepts unchanged for the next generation (rate).
                randomBehaviour: 0.2, // New random networks for the next generation (rate).
                mutationRate: 0.1, // Mutation rate on the weights of synapses.
                mutationRange: 0.5, // Interval of the mutation changes on the synapse weight
                historic: 0, // Latest generations saved.
                lowHistoric: false, // Only save score (not the network).
                scoreSort: -1, // Sort order (-1 = desc, 1 = asc).
                nbChild: 1 // Number of children by breeding.
            },
            config
        );

        this.generations = new Generations(this);
    }

    get options(): INeuroevolutionConfigRequired {
        return this.configuration;
    }

    /**
     * Get the configuration of this class
     */
    public getConfiguration(): INeuroevolutionConfigRequired {
        return this.configuration;
    }

    /**
     * Override the default configuration of this class
     */
    public setConfiguration(config: INeuroevolutionConfig): void {
        this.configuration = Object.assign(this.configuration, config);
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
        let networks: INetworkData[] = [];

        if (this.generations.getGenerations().length === 0) {
            /* if no Generations, create first */
            // prettier-ignore
            networks = this.generations.firstGeneration(
                this.options.network[0] as number,
                this.options.network[1] as number[],
                this.options.network[2] as number
            );
        } else {
            /* otherwise, create next one */
            networks = this.generations.nextGeneration();
        }

        /* create Networks from the current Generation */
        const nns: Network[] = [];

        for (const network of networks) {
            const newNetwork: Network = new Network();
            newNetwork.loadNetworkWithData(network);
            nns.push(newNetwork);
        }

        if (this.configuration.lowHistoric) {
            /* remove old Networks */
            if (this.generations.getGenerations().length >= 2) {
                const genomes = this.generations.getGenerations()[this.generations.getGenerations().length - 2].getGenomes();

                genomes.splice(0, genomes.length - 1);
            }
        }

        if (this.configuration.historic !== -1) {
            /* Remove older generations */
            if (this.generations.getGenerations().length > this.configuration.historic + 1) {
                this.generations.getGenerations().splice(0, this.generations.getGenerations().length - (this.configuration.historic + 1));
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
        this.generations.addGenome(new Genome(score, network.getCopyOfTheNetwork()));
    }
}

export default Neuroevolution;