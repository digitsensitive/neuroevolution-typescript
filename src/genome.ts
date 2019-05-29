/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Genome
 * @license      Digitsensitive
 */

import { INetworkData } from "./interfaces/network-data.interface";

export class Genome {
  private score: number;
  private network: INetworkData;

  public getScore(): number {
    return this.score;
  }
  public getNetwork(): INetworkData {
    return this.network;
  }

  constructor(_score: number, _network: INetworkData) {
    /* init parameters */
    this.score = _score || 0;
    this.network = _network || undefined;
  }
}
