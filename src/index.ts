import {pipeline} from 'stream';
import {promisify} from 'util';
import {OutputStream} from './Output/OutputStream';
import {InputStream} from './Readable/InputStream';
import {BufferStream} from './Transforms/BufferStream';
import {DeBufferStream} from './Transforms/DeBufferStream';
import {GenderTransform} from './Transforms/GenderTransform';
import {TransformObject} from './Transforms/TransformObject';

class BatchProcessing {
  private asyncPipeline = promisify(pipeline);
  async main() {
    await this.asyncPipeline(
      new InputStream(),
      new TransformObject(),
      new BufferStream(5),
      new BufferStream(2),
      new GenderTransform(),
      new DeBufferStream(),
      new DeBufferStream(),
      new OutputStream()
    );
  }
}

(async () => {
  const batch = new BatchProcessing();
  await batch.main();
})();
