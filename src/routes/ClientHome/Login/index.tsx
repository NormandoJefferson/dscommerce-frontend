import { useContext, useState } from "react";
import "./styles.css";
import { CredentialsDTO } from "../../../models/auth";
import * as authService from "../../../services/auth-services";
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../../utils/context-token";

export default function Login() {

  const { setContextTokenPayload } = useContext(ContextToken);

  /**
   * - useNavigate: Para quando clicarmos em logar redirecionar para a página 
   *   de carrinho.
   */
  const navigate = useNavigate();

  /**
   * - useState do nosso objeto CredentialsDTO, que possui os dados do usuário.
   *   Ele inicia com string vazia.
   */
  const [formData, setFormData] = useState<CredentialsDTO>({
    username: "",
    password: "",
  });

  /**
   * - loginRequest: É uma função que exportamos no auth-services
   *   . Chamamos essa função passando o formeData que digitamos no input.
   *
   * - authService.saveAccessToken: Salva nosso token no localStorage.
   * 
   * - setContextTokenPayload: Seta o payload quando fazemos login.
   * 
   * - navigate("/cart"): Navega para o carrinho.
   */
  function handleSubmit(event: any) {
    event.preventDefault();
    authService
      .loginRequest(formData)
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload());
        navigate("/cart")
      })
      .catch((error) => {
        console.log("Erro no login", error);
      });
  }

  /**
   * - event.target.value: Pega o valor digitado na caixinha.
   *
   * - event.target.name: Pega o nome da caixinha.
   *
   * - setFormData: Vai aproveitar o que tem do formData sendo que
   *   onde tiver o campo com o nome name vamos colocar o novo valor value
   *   que for digitado.
   */
  function handleInputChange(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <main>
      <section
        id="login-section"
        className="dsc-container"
        onSubmit={handleSubmit}
      >
        <div className="dsc-login-form-container">
          <form className="dsc-card dsc-form">
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <input
                  name="username"
                  value={formData.username}
                  className="dsc-form-control"
                  type="text"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
                <div className="dsc-form-error"></div>
              </div>
              <div>
                <input
                  name="password"
                  value={formData.password}
                  className="dsc-form-control"
                  type="password"
                  placeholder="Senha"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="dsc-login-form-buttons dsc-mt20">
              <button type="submit" className="dsc-btn dsc-btn-blue">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
