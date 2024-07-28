import { useNavigate, useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import "./styles.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import * as productService from "../../../services/product-service";
import * as cartService from "../../../services/cart-service";
import { ContextCartCount } from "../../../utils/context-cart";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<ProductDTO>();
  const navigate = useNavigate();

  /**
   * - useContext: Seta o estado global do carrinho. Usamos aqui
   *   para somar itens no carrinho.
   */
  const { setContextCartCount } = useContext(ContextCartCount);

  useEffect(() => {
    productService
      .findById(Number(params.productId))
      .then((reponse) => {
        console.log(reponse.data);
        setProduct(reponse.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  /**
   * - Função: Chama o cartService, adiciona um produto na localStorage e 
   *   navega para a página de carrinho.
   * 
   * - cartService: Adiciona um produto no carrinho.
   * 
   * - setContextCartCount: Atualiza o contexto global com a quantidade
   *   de itens do carrinho.
   * 
   * - navigate: Navega para a página de cart.
   */
  function handleBuyClick() {
    if (product) {
      cartService.addProducts(product);
      setContextCartCount(cartService.getCart().items.length);
      navigate("/cart");
    }
  }

  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {product && <ProductDetailsCard product={product} />}
        <div className="dsc-btn-page-container">
          <div onClick={handleBuyClick}>
            <ButtonPrimary text="Comprar" />
          </div>
          <Link to="/">
            <ButtonInverse text="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}
