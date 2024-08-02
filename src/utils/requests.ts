import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import * as authService from "../services/auth-services";

/**
 * - requestBackend:
 *   . Recebe AxiosRequestConfig.
 *   . Aroveita o que vem do config na desestruturação
 *   . Acrescenta o BASE_URL.
 *
 * - withCredentials: Se for verdadeiro vamos pegar os headers que já existem e
 *   acrescentar nosso Authorization. Se não for true apenas mantemos os configs
 *   que já existiam.
 * 
 * - No return aproveitamos o que já veio, colocamos nossa BASE_URL e nossos headers.
 */
export function requestBackend(config: AxiosRequestConfig) {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer " + authService.getAccessToken(),
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
}
