import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { OrderDTO } from "../models/order";

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

/**
 * - placeOrderRequest: Salva um pedido no banco.
 *
 * - withCredentials: Vai ser uma requisição protegida.
 *
 * - data: cart: O corpo da requisição é o data.
 */
export function placeOrderRequest(cart: OrderDTO) {
  const config: AxiosRequestConfig = {
    url: "/orders",
    method: "POST",
    withCredentials: true,
    data: cart,
  };

  return requestBackend(config);
}
