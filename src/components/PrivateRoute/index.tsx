import { Navigate } from "react-router-dom";
import * as authService from "../../services/auth-services";
import { RoleEnum } from "../../models/auth";

type Props = {
  children: JSX.Element;
  roles?: RoleEnum[];
};

/**
 * - Se não estiver autenticado redireciona para o login,
 *   se não retorna o children (o que está dentro do route).
 *
 * - roles =[]: Agora recebemos os roles, se não forem informados
 *   por padrão são lista vazia.
 *
 * - O segundo if verifica se possui alguma das roles, se não possuir
 *   vai para o catalog.
 */
export function PrivateRoute({ children, roles = [] }: Props) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (!authService.hasAnyRoles(roles)) {
    return <Navigate to="/catalog" />;
  }
  return children;
}
