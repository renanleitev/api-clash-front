import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import PlayersPage from '../pages/Players/PlayersPage';
import BattlesPage from '../pages/Battles/BattlesPage';
import QueriesPage from '../pages/Queries/QueriesPage';
import Page404 from '../pages/Page404/Page404';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/players" element={<PlayersPage />} />
      <Route path="/battles" element={<BattlesPage />} />
      <Route path="/queries" element={<QueriesPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
