/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Generations
 * @license      Digitsensitive
 */

import Generation from './generation';
import Genome from './network/genome';
import Network from './network/network';
import Neuroevolution from './index';

export default class Generations {
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
     * @return {[type]}         [First Generation]
     */
    public firstGeneration(input: number, hiddens: number[], output: number): INetworkData[] {
        const networkData: INetworkData[] = [];

        for (let i = 0; i < this.ne.options.population; i++) {
            /* generate the Network and save it */
            const network: Network = new Network();

            network.generateNetworkLayers(input, hiddens, output);

            networkData.push(network.getCopyOfTheNetwork());
        }

        this.generations.push(new Generation(this.ne));
        return networkData;
    }

    /**
     * Create the next Generation.
     */
    public nextGeneration(): INetworkData[] {
        if (this.generations.length === 0) {
            /* need to create first generation */
            throw new TypeError('Must call method Generations.firstGeneration() first.');
        }

        const gen: INetworkData[] = this.generations[this.generations.length - 1].generateNextGeneration();
        this.generations.push(new Generation(this.ne));
        return gen;
    }

    /**
     * Add a genome to the Generations
     * @param  {[type]} genome [Genome]
     * @return {[type]}        [False if no Generations to add to]
     */
    public addGenome(genome: Genome): boolean {
        /* cant add to a Generation if there are no Generations */
        if (this.generations.length === 0) {
            return false;
        }

        const generation = this.generations[this.generations.length - 1];

        generation.addGenome(genome);

        return generation.getGenomes().length > 0;
    }
}
