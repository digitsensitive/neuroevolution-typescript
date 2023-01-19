import { flatten } from 'lodash';
import Network from '../src/network/network';
import Neuron from '../src/network/neuron';


let network:Network;
const layers = {
    input: 2,
    hidden: [3, 4],
    output: 4
}

test("Does initiate", () => {
    expect(network).toBeUndefined();
    network = new Network();
    expect(network).not.toBeUndefined();
})

test("Can generate network layers", () => {
    const { input, hidden, output } = layers
    
    expect(network.layers.length).toBe(0)

    network.generateNetworkLayers(input, hidden, output);

    //                           input layer + hidden layers + output layers
    expect(network.layers.length).toBe(1 + (hidden.length) + 1)
    
})

test("Does generate correctly", () => {
    for(const layer of network.layers) {
        for(const neuron of layer.neurons) {
            for(const sample of neuron.weights) {
                // Check if equal or in between
                expect(sample).toBeGreaterThanOrEqual(-1);
                expect(sample).toBeLessThanOrEqual(1);
            }
        }
    }
})

test("Copy create a copy of a network", () => {
    const copied = network.getCopyOfTheNetwork();

    expect(flatten(copied.neurons).sort()).toEqual(flatten(Object.values(layers)).sort());

    for(const sample of copied.weights) {
        // Check if equal or in between
        expect(sample).toBeGreaterThanOrEqual(-1);
        expect(sample).toBeLessThanOrEqual(1);
    }
})

test("Does reset", () => {
    expect(network.layers.length).not.toBe(0);
    network.resetNetwork();
    expect(network.layers.length).toBe(0);
})
