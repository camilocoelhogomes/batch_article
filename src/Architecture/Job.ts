import {Step} from './Step';

export abstract class Job {
  constructor() {
    this.config();
  }

  /**
   * Variavel utilizada para armazenar os steps, um Set foi utilizado
   * pois ele garante que nenhum item será adicionado mais de uma vez
   * à lista  e também garante a ordenação da lista
   */
  public readonly steps: Set<Step> = new Set();

  /**
   * Método responsável por executar os steps na ordem configurada no método
   * config
   */
  async start() {
    let i = 0;
    for await (const step of this.steps.values()) {
      i++;
      const start = performance.now();
      await step.start();
      const end = performance.now();
      console.log(`step ${i} gastou: ${Math.round(end - start)} ms`);
    }
  }

  /**
   * Método responsável por configurar os Steps do Job em ssua ordem
   * definida
   */
  abstract config(): void;
}
