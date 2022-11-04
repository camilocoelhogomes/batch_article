import {Job} from '../Architecture/Job';
import {Step} from '../Architecture/Step';
import {OutputStream} from '../Stream/Writable/OutputStream';
import {NameGenerator} from '../Stream/Readable/NameGenerator';
import {CreatePerson} from '../Stream/Transforms/CreatePerson';
import fs from 'fs';
import {parse} from 'csv-parse';
import {GetGenderTransform} from '../Stream/Transforms/GetGenderTransform';
import {GetGenderAdapter} from '../Adapter/GetGenderAdapter';
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
      /**
       * Nesse step vamos utilizar algumas facilidades já produzidas pela comunidade
       * - fs.createReadStream é um módulo do NodeJs que cria stream a partir de um arquivo
       * - parse é uma stream do tipo transform, que quando a leitura vem de um createReadStream originado
       * de um arquivo csv, eu consigo definir um delimitador e quando a flag columns está setada para true
       * ele ignora a primeira coluna e passar a enviar objetos com a chave sendo essa primeira coluna
       */
      fs.createReadStream(namesFile),
      new Set([
        parse({columns: true, delimiter: ';'}),
        new GetGenderTransform(new GetGenderAdapter()),
      ]),
      new OutputStream('second_step.csv')
    );
    this.steps.add(secondStep);
  }
}
