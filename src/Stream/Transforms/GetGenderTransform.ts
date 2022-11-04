import {Transform, TransformCallback} from 'stream';
import {Person} from '../../Domain/Person';
import {GetGenderPort} from '../Port/GetGenderPort';

export class GetGenderTransform extends Transform {
  constructor(private readonly getGenderPort: GetGenderPort) {
    super({objectMode: true});
  }
  async _transform(
    chunk: Person,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): Promise<void> {
    try {
      const result = await this.getGenderPort.getGender(chunk);
      this.push(result);
    } catch (error) {
      callback(error as Error);
    } finally {
      callback();
    }
  }
}
