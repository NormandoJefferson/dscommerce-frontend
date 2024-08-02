import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import Catalog from "./routes/ClientHome/Catalog";
import Cart from "./routes/ClientHome/Cart";
import { useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import Login from "./routes/ClientHome/Login";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  /**
   * - useState: Armazena nosso contexto global da contagem do carrinho de compras.
   *
   * - É parametrizado com o tipo number, que é o tipo que usamos.
   */
  const [contextCartCount, setContextCartCount] = useState<number>(0);

  return (
    /**
     * - Envolvemos tudo com o nosso contexto global, agora podemos usar esse estado onde nós
     *   quisermos.
     *
     * - HistoryRouter: Trocamos nosso browseRouter pele HistoryRouter que nos dá a possibilidade
     *   de fazer redirecionamentos inclusive de módulos que não forem componentes react.
     */
    <ContextCartCount.Provider
      value={{ contextCartCount, setContextCartCount }}
    >
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<ClientHome />}>
            <Route index element={<Catalog />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="product-details/:productId"element={<ProductDetails />}/>
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/admin/"element={<PrivateRoute><Admin /></PrivateRoute>}>
            <Route index element={<AdminHome />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HistoryRouter>
    </ContextCartCount.Provider>
  );
}

export default App;
