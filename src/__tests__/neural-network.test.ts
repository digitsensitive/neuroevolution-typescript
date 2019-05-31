/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Tests: Neural network
 * @license      Digitsensitive
 */

import { Neuron } from '../neural network/neuron';

test('Neuron value', () => {
  const a = new Neuron();
  a.setValue(2);
  expect(a.value).toBe(2);
});
