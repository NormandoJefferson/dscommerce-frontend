import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";

/**
 * - requestBackend: 
 *   . Recebe AxiosRequestConfig.
 *   . Aroveita o que vem do config na desestruturação  
 *   . Acrescenta o BASE_URL.
 * 
 * - Objetivo: Agora vamos chamar o requestBackend nos services, pois ele vai incluir
 *  nossa BASE_URL lá.
 */
export function requestBackend(config: AxiosRequestConfig) {
  return axios({...config, baseURL:BASE_URL});
}
