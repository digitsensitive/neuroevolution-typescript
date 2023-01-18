/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Generations
 * @license      Digitsensitive
 */

import { Generation } from './generation';
import { Genome } from './genome';
import { Network } from './neural network/network';
import Neuroevolution from './index';

export class Generations {
    private generations: Generation[];
    private currentGeneration: Generation;
    private ne: Neuroevolution;

    constructor(ne: Neuroevolution) {
        /* init parameters */
        this.generations = [];
        this.currentGeneration = new Generation(ne);
        this.ne = ne;
    }

    public getGenerations(): Generation[] {
        return this.generations;
    }

    /**
     * Create the first generation
     * @param  {[type]} input   [Input layer]
     * @param  {[type]} hiddens [Hidden layer(s)]
     * @param  {[type]} output  [Output layer]
     * @return {[type]}          [First Generation]
     */
    public firstGeneration(input?: number, hiddens?: number, output?: number) {
        /* FIXME input, hiddens, output unused */
        const out = [];

        for (let i = 0; i < this.ne.getConfiguration().population; i++) {
            /* generate the Network and save it */
            const nn = new Network();

            nn.generateNetworkLayers(this.ne.getConfiguration().network[0], this.ne.getConfiguration().network[1], this.ne.getConfiguration().network[2]);

            out.push(nn.getCopyOfTheNetwork());
        }

        this.generations.push(new Generation(this.ne));
        return out;
    }

    /**
     * Create the next Generation.
     */
    public nextGeneration() {
        if (this.generations.length === 0) {
            /* need to create first generation */
            return [];
        }

        const gen = this.generations[this.generations.length - 1].generateNextGeneration();
        this.generations.push(new Generation(this.ne));
        return gen;
    }

    /**
     * Add a genome to the Generations
     * @param  {[type]} genome [Genome]
     * @return {[type]}        [False if no Generations to add to]
     */
    public addGenome(genome: Genome) {
        /* cant add to a Generation if there are no Generations */
        if (this.generations.length === 0) {
            return false;
        }

        // FIXME addGenome retuerns void.
        return this.generations[this.generations.length - 1].addGenome(genome);
    }
}
