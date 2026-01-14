import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Alerts from "./pages/Alerts";
import Visits from "./pages/Visits";
import Proposals from "./pages/Proposals";
import AdminOnly from "./pages/AdminOnly";
import UserManagement from "./pages/UserManagement";
import ImovelManagement from "./pages/ImovelManagement";
import ConsignacaoManagement from "./pages/ConsignacaoManagement";
import ContratoManagement from "./pages/ContratoManagement";
import BoletoManagement from "./pages/BoletoManagement";
import Layout from "./components/Layout";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
 return (
    <BrowserRouter>
       <Routes>
         {/* Páginas de autenticação - sem layout */}
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         
          {/* Página principal com Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          
          {/* Rotas do usuário com Layout */}
          <Route path="/" element={<Layout />}>
            <Route path="buscar" element={<Home />} />
            <Route path="comprar" element={<Home />} />
            <Route path="anunciar" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="admin" element={<AdminOnly />} />
            
            {/* Rotas do usuário */}
            <Route element={<PrivateRoute />}>
              <Route path="favorites" element={<Favorites />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="visits" element={<Visits />} />
              <Route path="proposals" element={<Proposals />} />
            </Route>
            
            {/* Rotas administrativas */}
            <Route element={<AdminRoute />}>
              <Route path="users" element={<UserManagement />} />
              <Route path="imoveis" element={<ImovelManagement />} />
              <Route path="consignacoes" element={<ConsignacaoManagement />} />
              <Route path="contratos" element={<ContratoManagement />} />
              <Route path="boletos" element={<BoletoManagement />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
         
         {/* Rotas do usuário com Layout */}
         <Route path="/" element={<Layout />}>
           <Route path="buscar" element={<Home />} />
           <Route path="comprar" element={<Home />} />
           <Route path="anunciar" element={<Home />} />
           <Route path="home" element={<Home />} />
           <Route path="admin" element={<AdminOnly />} />
           <Route path="favorites" element={<Favorites />} />
           <Route path="alerts" element={<Alerts />} />
           <Route path="visits" element={<Visits />} />
           <Route path="proposals" element={<Proposals />} />
         </Route>
         
         {/* Rotas administrativas com proteção */}
         <Route path="/" element={<Layout />}>
           <Route element={<AdminRoute />}>
             <Route path="users" element={<UserManagement />} />
             <Route path="imoveis" element={<ImovelManagement />} />
             <Route path="consignacoes" element={<ConsignacaoManagement />} />
             <Route path="contratos" element={<ContratoManagement />} />
             <Route path="boletos" element={<BoletoManagement />} />
           </Route>
         </Route>
       </Routes>
    </BrowserRouter>
  );
}
