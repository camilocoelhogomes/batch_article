import {pipeline, Readable, Transform, Writable} from 'stream';
import {promisify} from 'util';

/**
 * Classe responsável por criar e executar um passo
 * dentro de um job
 */
export class Step {
  /**
   * Esse método do mótulo de util do  NodeJs transforma
   * uma pipeline em uma promise, fazendo que possa tulizar
   * async await para o processamento
   */
  private asyncPipeline = promisify(pipeline);
  constructor(
    /**
     * responsável por ler os itens
     */
    private readonly itemReader: Readable,
    /**
     * A pipeline do node Js pode receber várias transforms em cadeia, onde a
     * saida de uma é a entrada da outra, por isso vamos passar um Set<Transform> aqui,
     * garantindo assim que elas serão executadas na ordem correta
     */
    private readonly itemProcessors: Set<Transform>,
    /**
     * Responsável por escrever os dados de saida
     */
    private readonly itemWriter: Writable
  ) {}

  /**
   * Responsável por criar e executar a pipeline em sua devida ordem,
   * com as streams recebidas no construtor da classe
   * @returns Promise<void>
   */
  async start() {
    const args = [this.itemReader, ...this.itemProcessors, this.itemWriter];
    return this.asyncPipeline(args);
  }
}
