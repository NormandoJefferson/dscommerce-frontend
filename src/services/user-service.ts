import { requestBackend } from "../utils/requests";
import * as authService from "../services/auth-services";
import { AxiosRequestConfig } from "axios";

/**
 * - url: Faz um requisição para o backend em um endpoint que
 *   nos traz os dados do usuário.
 *
 * - withCredentials: Devemos usar sempre que for uma requisição protejida.
 */
export function findMe() {
  const config: AxiosRequestConfig = {
    url: "/users/me",
    withCredentials: true,
  };

  return requestBackend(config);
}
