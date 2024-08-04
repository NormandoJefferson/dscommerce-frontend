import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

/**
 * - findByIdfRequest: Recebe um pedido por id.
 * 
 * - withCredentials: Vai ser uma requisição protegida.
 */
export function findByIdfRequest(id: number) {
  const config: AxiosRequestConfig = {
    url: `/orders/${id}`,
    withCredentials: true,
  };

  return requestBackend(config);
}
