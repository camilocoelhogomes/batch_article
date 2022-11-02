import {Transform, TransformCallback} from 'stream';
import {Person} from '../Domain/Person';

export class CreatePerson extends Transform {
  constructor() {
    super({objectMode: true});
  }
  _transform(
    chunk: string,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.push(new Person(chunk));
    callback();
  }
}
