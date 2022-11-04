import {Readable} from 'stream';
import {names, uniqueNamesGenerator} from 'unique-names-generator';

export class NameGenerator extends Readable {
  /**
   * Classe responsável por gerar nomes aleatórios e streamalos
   * para a pipeline
   * @param namesToGenerate Quantos nomes a ser gerado
   */
  constructor(private readonly namesToGenerate: number) {
    /**
     * Normalmente Stream trabalham apenas com string, ou com Binário
     * Mas quando essa flag é setada para true, é possível passar
     * objetos pelo método push e callback das streams. O que deixa o
     * código mais limpo
     */
    super({objectMode: true});
  }
  count = 0;

  /**
   *Método que será chamado para inputar os arquivos na pipeline
   */
  async _read(): Promise<void> {
    while (this.count < this.namesToGenerate) {
      const result = await this.nameGenerator();
      this.push(result);
      this.count++;
    }
    this.push(null);
  }

  async nameGenerator() {
    return uniqueNamesGenerator({
      dictionaries: [names],
    });
  }
}
