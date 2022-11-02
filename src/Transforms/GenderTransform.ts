import axios from 'axios';
import {Transform, TransformCallback} from 'stream';
import {Person} from '../Domain/Person';

export class GenderTransform extends Transform {
  constructor() {
    super({objectMode: true});
  }

  async _transform(
    chunk: Person[][],
    encoding: BufferEncoding,
    callback: TransformCallback
  ): Promise<void> {
    const promiseArr: Promise<Person[]>[] = chunk.map(personArr =>
      this.getGender(personArr)
    );
    const result = await Promise.all(promiseArr);
    this.push(result);
    callback();
  }

  private async getGender(persons: Person[]): Promise<Person[]> {
    const names: string[] = [];
    const returnValue: Person[] = [];
    if (persons.length === 0) {
      return [];
    }
    persons.forEach(person => names.push(person.name));
    const result = await axios.get('https://api.genderize.io/', {
      params: {'name[]': names},
    });
    result.data.forEach((item: {[x: string]: string | undefined}) => {
      if (item['name'] && item['gender']) {
        returnValue.push(new Person(item['name'], item['gender']));
      }
    });
    return returnValue;
  }
}
