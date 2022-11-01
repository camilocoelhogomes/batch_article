import {Writable} from 'stream';
import {Person} from '../Domain/Person';

export class OutputStream extends Writable {
  constructor() {
    super({objectMode: true});
  }
  async _write(
    chunk: Person,
    encoding: BufferEncoding,
    callback: (error?: Error | null | undefined) => void
  ): Promise<void> {
    console.log(chunk);
    callback();
  }
}
