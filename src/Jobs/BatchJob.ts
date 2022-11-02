import {Job} from '../Batch/Job';

export class BatchJob extends Job {
  async start(): Promise<void> {
    const [firstStep, secondStep, thirdStep, fourthStep] = this.steps;

    let now = performance.now();
    await firstStep.start();
    console.log({primeiroStep: performance.now() - now});

    now = performance.now();
    await secondStep.start();
    console.log({segundoStep: performance.now() - now});

    now = performance.now();
    await thirdStep.start();
    console.log({thirdStep: performance.now() - now});

    now = performance.now();
    await fourthStep.start();
    console.log({fourthStep: performance.now() - now});
  }
}
