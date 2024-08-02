import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import { history } from "./history";
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

/**
 * - Primeiro return: Faz algo antes da da request ser enviada.
 * 
 * - Segundo return: Faz algo se houver erro.
 */
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * - Primeiro return: Faz algo se a resposta for 200.
 * 
 * - Segundo return: Faz algo se houver erro.
 * 
 * - history.push: Redireciona quando der 401 ou 403.
 */
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      history.push("/login")
    }
    if (error.response.status === 401) {
      history.push("/login")
    }
    return Promise.reject(error);
  }
);
