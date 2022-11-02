import {Writable} from 'stream';
import {Person} from '../Domain/Person';
import fs from 'fs';

export class OutputStream extends Writable {
  writeStream: Writable;
  constructor(private readonly fileName: string) {
    super({objectMode: true});
    this.writeStream = fs.createWriteStream(fileName);
    this.writeStream.write('name;gender\n');
  }
  async _write(
    chunk: Person,
    encoding: BufferEncoding,
    callback: (error?: Error | null | undefined) => void
  ): Promise<void> {
    this.writeStream.write(`${chunk.name};${chunk.gender ?? ''}\n`);
    callback();
  }
}
