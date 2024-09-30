import { CircularProgress } from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';

export default function LoadingProgress() {
  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <CircularProgress />
    </VerticalContainer>
  );
}
