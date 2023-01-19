import Neuron from '../src/network/neuron';

let neuron: Neuron;

test('Neuron Test', () => {
    expect(neuron).toBeUndefined();
    neuron = new Neuron();
    expect(neuron).toBeInstanceOf(Neuron);
});

test('Check if does store a value', () => {
    neuron.setValue(0.2);
    expect(neuron.value).toBe(0.2);
});

test('Can populate weights', () => {
    const samples: number = 50;

    neuron.populate(samples);

    for (const sample of neuron.weights) {
        // Check if equal or in between
        expect(sample).toBeGreaterThanOrEqual(-1);
        expect(sample).toBeLessThanOrEqual(1);
    }
});

test('Does reset', () => {
    neuron.resetWeights();

    expect(neuron.weights.length).toBe(0);
});
