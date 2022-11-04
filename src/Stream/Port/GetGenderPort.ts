import {Person} from '../../Domain/Person';

export interface GetGenderPort {
  getGender(person: Person): Promise<Person>;
}
