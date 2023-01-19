import Layer from '../src/network/layer';

let layer: Layer;
const numberNeurons: number = 50;
const numberInputs: number = 3;

test('Can initiate', () => {
    expect(layer).toBeUndefined();
    layer = new Layer();
    expect(layer).not.toBeUndefined();
});

test('Can populate', () => {
    layer.populate(numberNeurons, numberInputs);

    const neuronLen: number = layer.neurons.length;

    expect(neuronLen).toBe(numberNeurons);
});

test('Does populate right', () => {
    for (const neuron of layer.neurons) {
        for (const weight of neuron.weights) {
            expect(weight).toBeGreaterThanOrEqual(-1);
            expect(weight).toBeLessThanOrEqual(1);
        }
    }
});

test('Does reset', () => {
    layer.resetLayer();

    expect(layer.neurons.length).toBe(0);
});
