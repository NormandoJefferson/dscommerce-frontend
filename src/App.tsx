import { Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import Catalog from "./routes/ClientHome/Catalog";
import Cart from "./routes/ClientHome/Cart";
import { useEffect, useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import Login from "./routes/ClientHome/Login";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";
import { PrivateRoute } from "./components/PrivateRoute";
import { AccessTokenPayloadDTO } from "./models/auth";
import { ContextToken } from "./utils/context-token";
import * as authService from "./services/auth-services";
import * as cartService from "./services/cart-service";
import Confirmation from "./routes/ClientHome/Confirmation";
import ProductListing from "./routes/Admin/AdminHome/ProductListing";
import ProductForm from "./routes/Admin/AdminHome/ProductForm";

function App() {
  /**
   * - useState: Armazena nosso contexto global da contagem do carrinho de compras.
   *
   * - É parametrizado com o tipo number, que é o tipo que usamos.
   */
  const [contextCartCount, setContextCartCount] = useState<number>(0);

  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  /**
   * - cartService.getCart().items.length: Já iniciamos o carrinho com o total 
   *   de itens.
   * 
   * - Se estiver autenticado pegamos o payloada com o getAccessTokenPayload
   *   e salvamos no contexto para iniciar já com o valor do token que estava 
   *   salvo no localStorage.
   */
  useEffect(() => {
    setContextCartCount(cartService.getCart().items.length)
    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);
  
  /**
  * - Envolvemos tudo com o nosso contexto global, agora podemos usar esse estado onde nós
  *   quisermos.
  * 
  * --------- History:
  * 
  * - HistoryRouter: Trocamos nosso browseRouter pele HistoryRouter que nos dá a possibilidade
  *   de fazer redirecionamentos inclusive de módulos que não forem componentes react.
  * 
  * --------- Rotas:
  * 
  * - path="*" element={<Navigate to="/" />}: Redireciona qualquer rota que não exista para
  *   Catalog, já que o index do "/" é o Catalog.
  *
  * - /admin/:
  *    .PrivateRoute roles={['ROLE_ADMIN']: A rota admin só pode ser acessada por quem possui
  *     o role admin.
  *    .Todas as rotas dentro de admin (os outlets) também ficam protegidas apenas para role_admin.
  *    .index element={<Navigate to="/admin/home" />}: Se digitarmos apenas /admin será redirecionado para /admin/home.
  */
  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="product-details/:productId"element={<ProductDetails />}/>
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="confirmation/:orderId"element={<PrivateRoute><Confirmation /></PrivateRoute>}/>
            </Route>
            <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin /></PrivateRoute>}>
              <Route index element={<Navigate to="/admin/home" />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="products" element={<ProductListing />} />
              <Route path="products/:productId" element={<ProductForm />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}

export default App;
