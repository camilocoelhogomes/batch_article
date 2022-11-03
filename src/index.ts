import {BatchJob} from './Jobs/BatchJob';

(async () => {
  const batch = new BatchJob();
  await batch.start();
})();
