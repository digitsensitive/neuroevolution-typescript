/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Genome
 * @license      Digitsensitive
 */

import { INetworkData } from '../types/network-data';

export default class Genome {
    private __score__: number;
    private __network__: INetworkData;

    constructor(score: number, network: INetworkData) {
        this.__score__ = score || 0;

        this.__network__ = Object.assign(
            {
                neurons: [],
                weights: []
            },
            network
        );
    }

    get network(): INetworkData {
        return this.__network__;
    }

    get score(): number {
        return this.__score__;
    }
}
