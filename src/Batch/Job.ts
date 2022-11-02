import {Step} from './Step';

export abstract class Job {
  constructor(public readonly steps: Set<Step>) {}
  abstract start(): Promise<void>;
}
