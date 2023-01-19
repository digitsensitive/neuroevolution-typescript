import exp from 'constants';
import Neuroevolution from '../src';
import Generations from '../src/generations';
import { flatten } from 'lodash';
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

let generations:Generations;

test("Does initiate", () => {
    expect(generations).toBeUndefined()
    generations = new Generations(Neuvol);
    expect(generations).not.toBeUndefined()
})

test("Throw an error", () => {
    // Start the next generation without the first one?
    expect(generations.nextGeneration).toThrow(TypeError)
})

test("Generate the first generation", () => {
    const [ input, hiddens, output ] = options.network;

    const firstGenData = generations.firstGeneration(input as number,hiddens as number[], output as number)

    for(const networkData of firstGenData) {
        expect(flatten(networkData.neurons)).toEqual(flatten(options.network))
        
        for(const sample of networkData.weights) {
            expect(sample).toBeGreaterThanOrEqual(-1);
            expect(sample).toBeLessThanOrEqual(1);
        }
    }

})


test("Generate the second generation", () => {
    const [ input, hiddens, output ] = options.network;

    const secondGenData = generations.firstGeneration(input as number,hiddens as number[], output as number)

    for(const networkData of secondGenData) {
        expect(flatten(networkData.neurons)).toEqual(flatten(options.network))
        
        for(const sample of networkData.weights) {
            expect(sample).toBeGreaterThanOrEqual(-1);
            expect(sample).toBeLessThanOrEqual(1);
        }
    }

})

test("Can insert genome", () => {
    expect(generations.addGenome(new Genome(0, {
            weights: [],
            neurons: []
    }))).toBeTruthy();
})
