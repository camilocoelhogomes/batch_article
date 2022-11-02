import {Readable} from 'stream';
import {names, uniqueNamesGenerator} from 'unique-names-generator';

export class NameGenerator extends Readable {
  constructor(private readonly namesToGenerate: number) {
    super({objectMode: true});
  }
  count = 0;

  async _read(size: number): Promise<void> {
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
