import axios from 'axios';
import {Transform, TransformCallback} from 'stream';
import {Person} from '../Domain/Person';
import {GetGenderAdapter} from './output/GetGenderAdapter';

export class GenderTransform extends Transform {
  constructor(private readonly getGender: GetGenderAdapter) {
    super({objectMode: true});
  }

  async _transform(
    chunk: Person,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): Promise<void> {
    const result = await this.getGender.getPersonGender(chunk);
    this.push(result);
    callback();
  }
}
