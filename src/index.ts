import {OutputStream} from './Output/OutputStream';
import {NameGenerator} from './Readable/NameGenerator';
import {Step} from './Batch/Step';
import {CreatePerson} from './Transforms/CreatePerson';
import fs from 'fs';
import {parse} from 'csv-parse';
import {BatchJob} from './Jobs/BatchJob';

(async () => {
  const namesFile = 'names.txt';
  const firstStep = new Step(
    new NameGenerator(200),
    new Set([new CreatePerson()]),
    new OutputStream(namesFile)
  );
  const secondStep = new Step(
    fs.createReadStream(namesFile).pipe(parse({delimiter: ';', columns: true})),
    new Set([]),
    new OutputStream('second_step.txt')
  );
  const thirdStep = new Step(
    fs.createReadStream(namesFile).pipe(parse({delimiter: ';', columns: true})),
    new Set([]),
    new OutputStream('third_step.txt')
  );
  const forthStep = new Step(
    fs.createReadStream(namesFile).pipe(parse({delimiter: ';', columns: true})),
    new Set([]),
    new OutputStream('forth_step.txt')
  );
  const batch = new BatchJob(
    new Set([firstStep, secondStep, thirdStep, forthStep])
  );
  await batch.start();
})();
