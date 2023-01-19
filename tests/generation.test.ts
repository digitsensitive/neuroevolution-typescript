import { clamp, flatten } from 'lodash';
import Generation from '../src/generation';
import Neuroevolution from '../src/index'
import Genome from '../src/network/genome';


const options = {
    network: [1, [1], 1],
    population: 50,
    elitism: 0.2,
    randomBehaviour: 0.2,
    mutationRate: 0.1,
    mutationRange: 0.5,
    historic: 0,
    lowHistoric: false,
    scoreSort: -1,
    nbChild: 1
}

const Neuvol: Neuroevolution = new Neuroevolution(options)
let generation: Generation;

test("Does initiate", () => {
    expect(generation).toBeUndefined();
    generation = new Generation(Neuvol);
    expect(generation).not.toBeUndefined();
})

test("Generate and populate with genomes", () => {
    for(let i = 0; i < options.population; i++) {
        const genome = new Genome(0, {
            neurons: flatten(options.network),
            weights: Array(options.population).fill(0).map((w) => {
                return clamp((Math.random() * 2) - 1, -1, 1)
            })
        });

        generation.addGenome(genome);
    }
    
    expect(generation.getGenomes().length).toBe(options.population);

})

test("Does generate generation", () => {
    
    // Initiate generation for next generation
    const generatedData = generation.generateNextGeneration();
    
    for(const networkData of generatedData) {
        expect(flatten(networkData.neurons)).toEqual(flatten(options.network))
        for(const sample of networkData.weights) {
            // We're having mutation
            // In some cases, the weights become under or over limits -1 and 1
            expect(sample).toBeGreaterThanOrEqual(-2);
            expect(sample).toBeLessThanOrEqual(2);
        }
    }
})
