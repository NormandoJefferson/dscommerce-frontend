import "./styles.css";
import SearchBar from "../../../components/SearchBar";
import CatalogCard from "../../../components/CatalogCard";
import ButtonNextPage from "../../../components/ButtonNextPage";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import * as productService from "../../../services/product-service";

/**
 * - Objeto: Os atributos desse objeto vão servir como parâmetros da busca do método findPageRequest()
 *   no useEffect.
 */
type QueryParams = {
  page: number;
  name: string;
};

export default function Catalog() {
  /**
   * - useState: Faz o botão 'Carregar mais' desaparecer quando for a última página,
   *   iniciamos com false e mudamos para true quando for a última página.
   */
  const [isLastPage, setIsLastPage] = useState(false);

  /**
   * useState: Recebe uma lista de produtos do backend.
   */
  const [products, setProducts] = useState<ProductDTO[]>([]);

  /**
   * - useState: Possui todos os parâmetros da busca do findPageRequest().
   *
   * - Definimos um objeto com os valores default para valor inicial do useState.
   */
  const [queryParams, setqueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  /**
   * - useEffect: Busca os objetos do backend para carregar a lista de produtos na página de catálogo.
   *
   * - findPageRequest: Recebe nosso tipo QueryParams (que é um useState).
   *
   * - const nextPage: Recebe os valores da página.
   *
   * - setProducts: Seta os valores sem excluír os que já existiam.
   *
   * - setIsLastPage: Seta os useState isLastPage para true quando for a última página,
   *   o response.data.last mostra quando chega na última página.
   *
   * - [queryParams]: Refaz a busca quando:
   *   . Limpamos a barra de pesquisa com o botão limpar do componente filho SearchBar.
   *   . enviarmos um texto do input do componente filho SearchBar.
   *   . Clicamos em 'carregar mais'.
   */
  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        const nextPage = response.data.content;
        setProducts(products.concat(nextPage));
        setIsLastPage(response.data.last);
      });
  }, [queryParams]);

  /**
   * - Função: Essa função é passada para o componente filho searchBar para
   *   quando clicarmos em buscar os parâmetros da busca do findPageRequest()
   *   sejam preenchidos com os textos digitados.
   *
   * - setProducts([]): Sempre que mudarmos o texto de busca temos que zerar a lista de produtos,
   *   pois ai será concatenado uma lista vazia com a nova busca no 'setProducts(products.concat(nextPage))'
   *   do useEffect.
   *
   * - setqueryParams: Recebe o que tiver do queryParams e o que vier da busca do searchBar,
   *   note que também colocamos a página para a 0.
   *
   *   OBS: Como usamos todos os parâmetros do QueryParams nem precisavamos da desestruturação,
   *   porém vamos deixar apenas por manutenção, vai que no futuro queremos inserir mais valores.
   */
  function handleSearch(searchText: string) {
    setProducts([]);
    setqueryParams({ ...queryParams, page: 0, name: searchText });
  }

  /**
   * - Função: Quando clicarmos em 'carregar mais' aparecere
   *   os resultados da próxima página.
   *
   * - setqueryParams: Refaz a consulta com a página nova.
   */
  function handleNextPageClick() {
    setqueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  /**
   * - handleSearch: Função passada como props.
   *
   * - products.map: Percorre a lista de produtos do backend e carrega um CatalogCard para cada produto.
   *
   * - isLastPage: Só renderiza o botão abaixo enquanto não for a última página
   */
  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <SearchBar onSearch={handleSearch} />
        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
          {products.map((product) => (
            <CatalogCard key={product.id} product={product} />
          ))}
        </div>
        {!isLastPage && (
          <div onClick={handleNextPageClick}>
            <ButtonNextPage />
          </div>
        )}
      </section>
    </main>
  );
}
