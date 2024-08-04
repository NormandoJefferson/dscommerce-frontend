import { createContext } from "react";
import { AccessTokenPayloadDTO } from "../models/auth";

/**
 * - contextTokenPayload: Tipo do dado que vamos manipular.
 *
 * - accessTokenPayload: Função para alterar o dado do nosso tipo.
 */
export type ContextTokenType = {
  contextTokenPayload: AccessTokenPayloadDTO | undefined;
  setContextTokenPayload: (accessTokenPayload: AccessTokenPayloadDTO | undefined) => void;
};

/**
 * - const ContextToken: Cria um contexto com a função createContext parametrizada com nosso tipo.
 *   O Argumento dessa função é um objeto do nosso tipo acima.
 * 
 * - contextTokenPayload: undefined: Inicia como undefined.
 */
export const ContextToken = createContext<ContextTokenType>({
  contextTokenPayload: undefined,
  setContextTokenPayload: () => {},
});
