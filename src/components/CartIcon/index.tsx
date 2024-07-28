import "./styles.css";
import { useContext } from "react";
import cartIcon from "../../assets/cart.svg";
import { ContextCartCount } from "../../utils/context-cart";

export default function CartIcon() {

  /**
   * - useContext: Busca o dado global do número de itens do carrinho.
   */
  const { contextCartCount } = useContext(ContextCartCount);

  return (
    <>
      <img src={cartIcon} alt="Carrinho de compras" />
      {/* Se o valor do carrinho for maior que zero apresenta esse número no carrinho. */}
      {contextCartCount > 0 && (
        <div className="dsc-cart-count">{contextCartCount}</div>
      )}
    </>
  );
}
