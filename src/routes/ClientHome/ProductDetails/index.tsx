import { useNavigate, useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import * as productService from "../../../services/product-service";
import * as cartService from "../../../services/cart-service";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<ProductDTO>();
  const navigate = useNavigate();

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

  function handleBuyClick() {
    if (product) {
      cartService.addProducts(product);
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
