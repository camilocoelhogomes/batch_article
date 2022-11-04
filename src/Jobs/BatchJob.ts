import {Job} from '../Architecture/Job';
import {Step} from '../Architecture/Step';
import {OutputStream} from '../Stream/Writable/OutputStream';
import {NameGenerator} from '../Stream/Readable/NameGenerator';
import {CreatePerson} from '../Stream/Transforms/CreatePerson';

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
    this.steps.add(firstStep);
  }
}
