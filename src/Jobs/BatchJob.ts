import {parse} from 'csv-parse';
import {Job} from '../Batch/Job';
import {Step} from '../Batch/Step';
import {OutputStream} from '../Writable/OutputStream';
import {NameGenerator} from '../Readable/NameGenerator';
import {CreatePerson} from '../Transforms/CreatePerson';
import fs from 'fs';

export class BatchJob extends Job {
  /**
   * Esse método é a real configuração do Job a ser executado
   * foram instanciados aqui os 4 steps do Job, como também
   * adicionado aos steps na ordem de execução desejada
   */
  config(): void {
    const namesFile = 'names.csv';
    const firstStep = new Step(
      new NameGenerator(200),
      new Set([new CreatePerson()]),
      new OutputStream(namesFile)
    );
    const secondStep = new Step(
      fs.createReadStream(namesFile),
      new Set([parse({delimiter: ';', columns: true})]),
      new OutputStream('second_step.csv')
    );
    const thirdStep = new Step(
      fs.createReadStream(namesFile),
      new Set([parse({delimiter: ';', columns: true})]),
      new OutputStream('third_step.csv')
    );
    const forthStep = new Step(
      fs.createReadStream(namesFile),
      new Set([parse({delimiter: ';', columns: true})]),
      new OutputStream('forth_step.csv')
    );
    this.steps.add(firstStep);
    this.steps.add(secondStep);
    this.steps.add(thirdStep);
    this.steps.add(forthStep);
  }
}
