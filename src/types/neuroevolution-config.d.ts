/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Neuroevolution config interface
 * @license      Digitsensitive
 */

interface INeuroevolutionConfig {
    network?: [number, number[], number];
    population?: number;
    elitism?: number;
    randomBehaviour?: number;
    mutationRate?: number;
    mutationRange?: number;
    historic?: number;
    lowHistoric?: boolean;
    scoreSort?: number;
    nbChild?: number;
}

type INeuroevolutionConfigRequired = Required<INeuroevolutionConfig>;
