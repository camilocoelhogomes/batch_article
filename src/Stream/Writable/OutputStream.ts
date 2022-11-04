import {Writable} from 'stream';
import {Person} from '../../Domain/Person';
import fs from 'fs';

export class OutputStream extends Writable {
  writeStream: Writable;
  /**
   * Em seu construtor a classe já cria o arquivo, abre o mesmo e já escreve a primeira linha
   * @param fileName Identifica o nome do arquivo
   */
  constructor(private readonly fileName: string) {
    super({objectMode: true});
    this.writeStream = fs.createWriteStream(fileName);
    this.writeStream.write('name;gender\n');
  }

  /**
   * A cada dado recebido escreve o mesmo da writableStream
   * @param chunk O chunk é a pessoa recebida do transform
   * @param encoding
   * @param callback Função de callback a ser chamada no final da execução
   */
  async _write(
    chunk: Person,
    encoding: BufferEncoding,
    callback: (error?: Error | null | undefined) => void
  ): Promise<void> {
    this.writeStream.write(`${chunk.name};${chunk.gender ?? ''}\n`);
    callback();
  }
}
