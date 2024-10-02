import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { VerticalContainer } from '../../config/GlobalStyle';

DeckStatus.propTypes = {
  wins: PropTypes.number.isRequired,
  losses: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default function DeckStatus({ wins, losses, total }) {
  return (
    <VerticalContainer style={{ alignItems: 'flex-start' }}>
      <Typography variant="h6">Vitórias: {wins}</Typography>
      <Typography variant="h6">Derrotas: {losses}</Typography>
      <Typography variant="h6">Batalhas: {total}</Typography>
    </VerticalContainer>
  );
}
