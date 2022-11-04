import {Person} from '../../Domain/Person';

export interface GetGenderAdapter {
  getPersonGender(person: Person): Promise<Person>;
}
