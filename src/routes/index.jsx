import { Routes, Route } from 'react-router-dom';
// import ProdutoPage from '../pages/Produto/ProdutoPage';
// import EstoquePage from '../pages/Estoque/EstoquePage';
import HomePage from '../pages/Home/HomePage';
import Page404 from '../pages/Page404/Page404';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/players" element={<PlayersPage />} /> */}
      {/* <Route path="/battles" element={<BattlesPage />} /> */}
      {/* <Route path="/queries" element={<BattlesPage />} /> */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
