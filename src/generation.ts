/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Generation
 * @license      Digitsensitive
 */

import Genome from './network/genome';
import Neuroevolution from './index';
import { INetworkData } from './types/network-data';

/**
 * Any other way to import lodash functions?
 * It is still include entire lodash into production build
 * */
import cloneDeep from 'lodash/cloneDeep.js';

/* Generation class, composed of a set of Genomes */
export default class Generation {
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
        const pos = 0;
        for (let i = pos; i < this.genomes.length; i++) {
            /* sort in descending order */
            if (this.ne.options.scoreSort < 0) {
                if (genome.score > this.genomes[i].score) {
                    break;
                }
            } else {
                /* sort in ascending order */
                if (genome.score < this.genomes[i].score) {
                    break;
                }
            }
        }

        /* insert genome into correct position */
        this.genomes.splice(pos, 0, genome);
    }

    /**
     * Generate the next generation
     */
    public generateNextGeneration(): INetworkData[] {
        // Check if we have a genome to start with
        if (this.genomes.length === 0) {
            throw new Error('No genome to start with');
        }

        const networkDatas: INetworkData[] = [];
        const { elitism, population, randomBehaviour, nbChild } = this.ne.options;
        const populationEvolutionary: number = Math.round(elitism * population);
        const noiseLevel: number = Math.round(randomBehaviour * population);

        for (let i = 0; i < populationEvolutionary; i++) {
            if (networkDatas.length < population) {
                /* push a deep copy of ith Genome's Nethwork */
                networkDatas.push(cloneDeep(this.genomes[i].network));
            }
        }

        for (let i = 0; i < noiseLevel; i++) {
            const network: INetworkData = cloneDeep(this.genomes[1].network);

            for (let weightIndex = 0; weightIndex < network.weights.length; weightIndex++) {
                network.weights[weightIndex] = this.randomClamped();
            }

            if (networkDatas.length < population) {
                networkDatas.push(network);
            }
        }

        let max = 0;

        /* eslint-disable no-constant-condition */
        /* eslint-disable @typescript-eslint/no-unnecessary-condition */
        while (true) {
            for (let i = 0; i < max; i++) {
                /* create the children and push them to the nexts array */
                const childs = this.breed(this.genomes[i], this.genomes[max], nbChild > 0 ? nbChild : 1);

                for (const child of childs) {
                    networkDatas.push(child.network);
                    if (networkDatas.length >= population) {
                        /**
                         * Return once number of children is equal to the
                         * population by generation value
                         * */
                        return networkDatas;
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
    private breed(g1: Genome, g2: Genome, nbChilds: number): Genome[] {
        const datas: Genome[] = [];
        const crossoverFactor = 0.5;
        const { mutationRate } = this.ne.options;

        for (let nb = 0; nb < nbChilds; nb++) {
            /* Deep clone of genome 1 */
            const data: Genome = cloneDeep(g1);

            for (let i = 0; i < g2.network.weights.length; i++) {
                /* Genetic crossover
                 * 0.5 is the crossover factor.
                 * FIXME Really should be a predefined constant */
                if (Math.random() <= crossoverFactor) {
                    data.network.weights[i] = g2.network.weights[i];
                }
            }

            /* perform mutation on some weights */
            for (let i = 0; i < data.network.weights.length; i++) {
                if (Math.random() <= mutationRate) {
                    data.network.weights[i] += Math.random() * mutationRate * 2 - mutationRate;
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
