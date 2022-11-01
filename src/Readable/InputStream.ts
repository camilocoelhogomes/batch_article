import {Readable} from 'stream';
import {names, uniqueNamesGenerator} from 'unique-names-generator';

export class InputStream extends Readable {
  constructor() {
    super({objectMode: true});
  }
  count = 0;

  async _read(size: number): Promise<void> {
    for await (const iterator of this.nameGenerator()) {
      this.push(iterator);
      this.count++;
      if (this.count >= 20) {
        this.push(null);
      }
    }
  }

  async *nameGenerator() {
    yield uniqueNamesGenerator({
      dictionaries: [names],
    });
  }
}
