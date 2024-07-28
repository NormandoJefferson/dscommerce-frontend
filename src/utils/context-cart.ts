import { createContext } from "react";

/**
 * - contextCartCount: Tipo do dado que vamos manipular.
 * 
 * - setContextCartCount: Função para alterar o dado do nosso tipo.
 */
export type ContextCartCountType = {
  contextCartCount: number;
  setContextCartCount: (contextCartCount: number) => void;
};

/**
 * - Função: Cria um contexto com a função createContext parametrizada com nosso tipo.
 * 
 * - O Argumento dessa função é um objeto do nosso tipo acima.
 */
export const ContextCartCount = createContext<ContextCartCountType>({
  contextCartCount: 0,
  setContextCartCount: () => {},
});
