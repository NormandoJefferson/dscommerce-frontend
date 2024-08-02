import { Navigate } from "react-router-dom";
import * as authService from "../../services/auth-services";

type Props = {
  children: JSX.Element;
};

/**
 * - Se não estiver autenticado redireciona para o login,
 *   se não retorna o children (o que está dentro do route).
 */
export function PrivateRoute({ children }: Props) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}
