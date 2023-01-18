/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Neuroevolution config interface
 * @license      Digitsensitive
 */

export interface INeuroevolutionConfig {
    network?: any[];
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

export type INeuroevolutionConfigRequired = Required<INeuroevolutionConfig>
