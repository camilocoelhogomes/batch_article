import {Transform, TransformCallback} from 'stream';

export class DeBufferStream extends Transform {
  constructor() {
    super({objectMode: true});
  }
  _transform(
    chunk: any[],
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    chunk.forEach(item => {
      this.push(item);
    });
    callback();
  }
}
