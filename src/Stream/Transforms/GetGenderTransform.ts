import {Transform, TransformCallback} from 'stream';
import {Person} from '../../Domain/Person';
import {GetGenderPort} from '../Port/GetGenderPort';

export class GetGenderTransform extends Transform {
  /**
   * Mantendo a boa separação entre as classes, vamos utilizar uma classe externa
   * para buscar o genero do nome em cada registro
   * @param getGenderPort Classe responsável por buscar o genero
   */
  constructor(private readonly getGenderPort: GetGenderPort) {
    super({objectMode: true});
  }

  /**
   * Recebe a pessoa, busca pelo seu genero através de seu adapter e retorna a pessoa com seu genero
   */
  async _transform(
    chunk: Person,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): Promise<void> {
    try {
      const result = await this.getGenderPort.getGender(chunk);
      this.push(result);
      callback();
    } catch (error) {
      callback();
    }
  }
}
