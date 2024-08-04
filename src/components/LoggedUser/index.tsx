import { Link } from 'react-router-dom';
import * as authService from '../../services/auth-services';
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';

export default function LoggedUser() {

     /**
   * - useContext para observar se existe token no localStorage.
   */
    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);

    /**
     * - authService.logout(): Retira o token do localStorage.
     * 
     * - setContextTokenPayload(undefined): Atualizamos o contexto global sem o token.
     */
    function handleLogoutClick() {
        authService.logout();
        setContextTokenPayload(undefined);
    }

    /**
     * - Se estiver logado carrega o botão sair,
     *   se não carrega o botão entrar.
     */
    return(
        contextTokenPayload && authService.isAuthenticated()
        ?  (
            <div className="dsc-logged-user">
              <p>{contextTokenPayload?.user_name}</p>
              <span onClick={handleLogoutClick}>Sair</span>
            </div>
        )
        : (
            <Link to="/login">Entrar</Link>
        )
    )
}
