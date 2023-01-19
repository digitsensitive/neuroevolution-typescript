/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Network data interface
 * @license      Digitsensitive
 */

interface INetworkData {
    // Array with the number of neurons in each layer
    // [A,B, ...]
    // A is the number of neurons in the first layer
    // B is the number of neurons in the second layer
    // ...
    neurons: number[];

    // Plain array with the weights of each neuron input
    weights: number[];
}
