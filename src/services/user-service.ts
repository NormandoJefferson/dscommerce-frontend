import { requestBackend } from "../utils/requests";
import * as authService from "../services/auth-services";

/**
 * - Faz um requisição para o backend em um endpoint que
 *   nos traz os dados do usuário.
 *
 * - headers: É o formato Bearer + accessToken.
 */
export function findMe() {
  const headers = {
    Authorization: "Bearer " + authService.getAccessToken(),
  };
  return requestBackend({ url: `/users/me`, headers: headers });
}
