import { flatten } from 'lodash';
import Genome from '../src/network/genome';

let genome: Genome;
const score: number = 1;
const network = {
    neurons: [3],
    weights: [0.17042837904, 0.9783245732]
};

test('Does initiate', () => {
    expect(genome).toBeUndefined();
    genome = new Genome(score, network);
    expect(genome).not.toBeUndefined();
});

test('Does store values', () => {
    expect(genome.score).toBe(score);
    expect(flatten(Object.values(genome.network)).sort()).toEqual(flatten(Object.values(network)).sort());
});
