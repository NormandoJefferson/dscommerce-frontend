import "./styles.css";
import { useEffect, useState } from "react";
import { UserDTO } from "../../../models/userDTO";
import * as userService from "../../../services/user-service";

export default function AdminHome() {

  /**
   * - useState que salva o nome do nosso usuário logado para 
   *   renderizar na tela de boas vindas.
   */
  const [user, setUser] = useState<UserDTO>();

  /**
   * - findMe: busca o nome do usuário logado.
   */
  useEffect(() => {
    userService
      .findMe()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <section id="admin-home-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">
          Bem-vindo à àrea administrativa {user?.name}
        </h2>
      </section>
    </main>
  );
}
