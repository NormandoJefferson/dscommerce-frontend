import QueryString from "qs";
import { AccessTokenPayloadDTO, CredentialsDTO } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import * as accessTokenRepository from "../localStorage/access-token-repository";
import jwtDecode from "jwt-decode";

/**
 *- CredentialsDTO: É nosso tipo com username e password do usuário.
 *
 * - headers: É um objeto com o cabeçalho da requisição.
 *   . window.btoa: É o algorítimo base64 do javascript.
 *
 * - requestBody: É o corpo da requisição.
 *   . Desestruturamos o loginData que digitamos no formulário e
 *     acrescentamos o grant_type: password.
 *   . QueryString.stringify: Não queremos no formato JSon e sim
 *     no formato x-www-form-urlencoded, para gerar esse formato
 *     apartir de um JSon vamos usar esse método da biblioteca
 *     que instalamos.
 *
 * - config: É a nossa requisição do tipo AxiosRequestConfig.
 *
 * - requestBackend: É a nossa função do requests.ts.
 */
export function loginRequest(loginData: CredentialsDTO) {
  const headers = {
    "Content-Type": " application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const requestBody = QueryString.stringify({
    ...loginData,
    grant_type: "password",
  });

  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/oauth/token",
    data: requestBody,
    headers,
  };

  return requestBackend(config);
}

/**
 * - accessTokenRepository.remove: Chama nossa função do repository para deslogar.
 *   Deslogar é apagar um token.
 */
export function logout() {
  accessTokenRepository.remove();
}

/**
 * - accessTokenRepository.save: Salva um token na nossa localStorage.
 */
export function saveAccessToken(token: string) {
  accessTokenRepository.save(token);
}

export function getAccessToken() {
  return accessTokenRepository.get();
}

/**
 * - try: Pode dar um erro na hora converter o token para o paiload, por isso
 *   colocamos para retornar um accessToen ou um undefined.
 *
 * - const token: Pega um token.
 *
 * - Se o token for null retonra undefined,
 *   se não retorna um jwtDecode do token já com o casting para
 *   nosso  AccessTokenPayloadDTO.
 */
export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
  try {
    const token = accessTokenRepository.get();
    return token == null
      ? undefined
      : (jwtDecode(token) as AccessTokenPayloadDTO);
  } catch (error) {
    return undefined;
  }
}

/**
 * - obs: o exp do token é um número que expressa quantos miliseguntos passaram
 *   desde uma certa data, a liguagem sabe converter isso. Porém o tempo do javascript
 *   está em milisegundos e o do jwt em segundos, por isso multiplicamos por 1000.
 *
 * - getAccessTokenPayload: salva o token no tokenPayLoad.
 *
 * - Dentro do if tem 2 condições ligadas por um 'e'(&&), a primeira verifica se o token existe
 *   a segunda verifica se o tokenPayLoad.exp é maior que o tempo de agora, se for maior é
 *   porque ainda está válido.
 *
 * - Outra forma de escrever o if:
 *    return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
 */
export function isAuthenticated(): boolean {
  let tokenPayload = getAccessTokenPayload();
  if (tokenPayload && tokenPayload.exp * 1000 > Date.now()) {
    return true;
  }
  return false;
}

/**
 * - roles: RoleEnum[]: Recebemos uma lista de roles como argumento.
 * 
 * - : boolean: O retorno será um boolean.
 * 
 * - O primeiro if verifica se a lista é vazia, se for retorna
 *   verdadeiro.
 * 
 * - const tokenPayload: Pega o nosso token.
 * 
 * - Ser o tokenPayLoad existe vamos percorrer a lista que veio no get
 *   e testar se para cada item que veio da lista o tokenPayLoad.autorities 
 *   é igual a alguma das roles do nosso enum.
 */
export function hasAnyRoles(roles: RoleEnum[]): boolean {
  if (roles.length === 0) {
    return true;
  }
  const tokenPayload = getAccessTokenPayload();
  if (tokenPayload !== undefined) {
    for (let i = 0; i < roles.length; i++) {
      if (tokenPayload.authorities.includes(roles[i])) {
        return true;
      }
    }
    //return roles.some(role => tokenData.authorities.includes(role));
  }
  return false;
}
