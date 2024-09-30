import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';

export default function Page404() {
  return (
    <VerticalContainer style={{ height: '50%' }}>
      <h1>Erro. Página não encontrada.</h1>
      <Button variant="contained">
        <Link to="/">Página Inicial</Link>
      </Button>
    </VerticalContainer>
  );
}
