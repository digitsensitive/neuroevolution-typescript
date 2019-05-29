/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2017 - 2019 Digitsensitive
 * @description  Neuroevolution: Genome
 * @license      Digitsensitive
 */

import { Network } from "./neural network/Network";

export class Genome {
  private score: number;
  private network: Network;

  public getScore(): number {
    return this.score;
  }
  public getNetwork(): Network {
    return this.network;
  }

  constructor(_score, _network) {
    /* init parameters */
    this.score = _score || 0;
    this.network = _network || undefined;
  }
}
