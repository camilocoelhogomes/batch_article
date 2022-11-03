import {Transform, TransformCallback} from 'stream';
import {Person} from '../Domain/Person';

export class CreatePerson extends Transform {
  constructor() {
    super({objectMode: true});
  }
  /**
   * O método transform da classe é o método que será chamado,
   * em cada objeto recebido na pipeline
   * @param chunk Valor recebido pela stream
   * @param encoding objectmode como true não precisamos nos preocupar com isso
   * @param callback Função a ser chamada ao fim do processamento
   */
  _transform(
    chunk: string,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.push(new Person(chunk));
    /**
     * A função de callbach deve ser chamada ao fim do processamento
     * indicando que o mesmo acabou, e que essa etapa está
     * ápta a receber mais dados
     */
    callback();
  }
}
