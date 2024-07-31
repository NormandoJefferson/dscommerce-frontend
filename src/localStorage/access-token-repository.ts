import { TOKEN_KEY } from "../utils/system";

/**
 * - localStorage.setItem: Salva o valor que vier no token no nosso localStorage.
 *    .TOKEN_KEY: É o nome da nossa chava do localStorage que está no arquivo system.ts.
 */
export function save(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * - localStorage.getItem: Busca nosso tokem pela chave.
 *
 * - : string | null: Tipa o nosso retorno da função.
 *   Nosso retorno pode ser string ou nulo.
 */
export function get(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * - localStorage.removeItem: Remove um item da nossa localStorage.
 */
export function remove() {
  localStorage.removeItem(TOKEN_KEY);
}
