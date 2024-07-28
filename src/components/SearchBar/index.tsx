import { useState } from "react";
import "./styles.css";

/**
 * Props-> Recebe a funçao handleSearch da página Catalog. 
 */
type Props = {
  onSearch: Function;
};

export default function SearchBar({ onSearch }: Props) { 
  const [text, setText] = useState(""); // useState do texto do formulário.


  /**
   * Funçao: Responsável por seta o useState text com o valor do input.
   */
  function handleChange(event: any) {
    setText(event.target.value);
  }

  /**
   * - Função: Responsável por limpar o input.
   * 
   * - onSearch(text): Passa o texto vazio para a função handleSearch da página Catalog.
   */
  function handleResetClick() {
    setText("");
    onSearch(text);
  }

  /**
   * - Função: Chama a função handleSearch da página Catalog, passando para 
   *   ela o texto digitado na barra de pesquisa.
   * 
   * - event.preventDefault(): Evita que a página seja recarregada ao enviarmos o formulário.
   * 
   * - onSearch(text): Passa o texto digitado na barra para o handleSearch da página Catalog.
   */
  function handleSubmit(event: any) {
    event.preventDefault();
    onSearch(text);
  }

  return (
    <form className="dsc-search-bar" onSubmit={handleSubmit}>
      <button type="submit">🔎︎</button>
      <input
        value={text} // O valor do input está atrelado a esse useState.
        type="text"
        placeholder="Nome do produto"
        onChange={handleChange}
      />
      <button onClick={handleResetClick}>🗙</button>
    </form>
  );
}
