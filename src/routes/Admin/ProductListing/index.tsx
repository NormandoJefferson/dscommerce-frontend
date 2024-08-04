import "./styles.css";
import * as productService from "../../../services/product-service"
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import SearchBar from "../../../components/SearchBar";
import ButtonNextPage from "../../../components/ButtonNextPage";

type QueryParams = {
  page: number;
  name: string;
}

export default function ProductListing() {

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
   * useState: Recebe uma lista de produtos do backend.
   */
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [isLastPage, setIsLastPage] = useState(false);

  /**
   * - findPageRequest faz a requisição passando a página e o nome filtrados
   *   que por padrão são 0 e "".
   * 
   * - setProducts: Seta os valores sem excluír os que já existiam.
   * 
   * - setIsLastPage: Seta os useState isLastPage para true quando for a última página,
   *   o response.data.last mostra quando chega na última página.
   */
  useEffect(() => {
    productService.findPageRequest(queryParams.page, queryParams.name)
     .then((response) => {
        const nextPage = response.data.content;
        setProducts(products.concat(nextPage))
        setIsLastPage(response.data.last)
     })
  }, [queryParams])
  
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
     * - SearchBar: Passa a função handleSearch como props para o filho e 
     *   fica observando algo ser mandado do filho para disparar a função.
     * 
     * - products.map: Renderiza os tr conforme os produtos.
     * 
     * - ButtonNextPage: Passa a função handleNextPageClick como props para o 
     *   filho e fica observando o filho para disparar  função.
     */
    return(
        <main>
        <section id="product-listing-section" className="dsc-container">
          <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>
  
          <div className="dsc-btn-page-container dsc-mb20">
            <div className="dsc-btn dsc-btn-white">Novo</div>
          </div>
  
          <SearchBar onSearch={handleSearch}/>
  
          <table className="dsc-table dsc-mb20 dsc-mt20">
            <thead>
              <tr>
                <th className="dsc-tb576">ID</th>
                <th></th>
                <th className="dsc-tb768">Preço</th>
                <th className="dsc-txt-left">Nome</th>
                <th></th>
                <th></th>  
              </tr>
            </thead>
            <tbody>
              {
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="dsc-tb576">{product.id}</td>
                    <td><img className="dsc-product-listing-image" src={product.imgUrl} alt={product.name}/></td>
                    <td className="dsc-tb768">R$ {product.price.toFixed(2)}</td>
                    <td className="dsc-txt-left">{product.name}</td>
                    <td><img className="dsc-product-listing-btn" src={editIcon} alt="Editar"/></td>
                    <td><img className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar"/></td>
                </tr>
                ))
              }
            </tbody>
          </table>
  
          {!isLastPage && (
          <div onClick={handleNextPageClick}>
            <ButtonNextPage />
          </div>
        )}
        </section>
      </main>
    )
}