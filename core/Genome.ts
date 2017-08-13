/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/

import { Network } from './Network';

export class Genome {

  private score: number;
  private network: Network;

  public getScore(): number { return this.score; }
  public getNetwork(): Network { return this.network; }

  constructor(_score, _network) {

    /* init parameters */
    this.score = _score || 0;
    this.network = _network || undefined;

  }

}
