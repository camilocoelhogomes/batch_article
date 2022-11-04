import axios from 'axios';
import {Person} from '../Domain/Person';
import {GetGenderPort} from '../Stream/Port/GetGenderPort';

export class GetGenderAdapter implements GetGenderPort {
  private url = 'https://api.genderize.io/';
  async getGender(person: Person): Promise<Person> {
    try {
      const result = await axios.get(this.url, {
        params: {
          name: person.name,
        },
      });
      return new Person(result.data['name'], result.data['gender']);
    } catch (error) {
      throw new Error(`Person not found ${person.name}`);
    }
  }
}
