import { useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { productDTO } from "../../../models/product";
import * as productService from "../../../services/product-service";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<productDTO>();

  useEffect(() => {
    productService.findById(Number(params.productId))
      .then((reponse) => {
        console.log(reponse.data);
        setProduct(reponse.data);
      });
  }, []);

  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {product && <ProductDetailsCard product={product} />}
        <div className="dsc-btn-page-container">
          <ButtonPrimary text="Comprar" />
          <Link to="/">
            <ButtonInverse text="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}
