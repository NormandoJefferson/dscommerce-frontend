import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

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
