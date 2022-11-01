import {Transform, TransformCallback} from 'stream';

export class BufferStream extends Transform {
  arr: any[] = [];
  constructor(private readonly bufferSize: number) {
    super({objectMode: true});
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.arr.push(chunk);
    if (this.arr.length >= this.bufferSize) {
      this.bufferPush();
    }
    callback();
  }

  _flush(callback: TransformCallback): void {
    if (this.arr.length === 0) {
      this.push(null);
      callback();
    }
    this.bufferPush();
    callback();
  }

  private bufferPush() {
    this.push(this.arr);
    this.arr = [];
  }
}
