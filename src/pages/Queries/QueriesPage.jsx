import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  List,
  ListItemText,
  ListItemButton,
  ListSubheader
} from '@mui/material';
import {
  VerticalContainer,
  HorizontalContainer
} from '../../config/GlobalStyle';
import WinLossPercentage from './WinLossPercentage';
import DecksWinPercentage from './DecksWinPercentage';
import DefeatsByCardCombo from './DefeatsByCardCombo';
import * as colors from '../../config/colors';

const QUERY = {
  WinLossPercentage: 'win-loss-percentage',
  DecksWinPercentage: 'decks-win-percentage',
  DefeatsByCardCombo: 'defeats-by-card-combo',
  WinsByCardAndTrophies: 'wins-by-card-and-trophies',
  CombosWinsPercentage: 'combos-wins-percentage'
};

RenderQuery.propTypes = {
  query: PropTypes.string.isRequired
};

function RenderQuery({ query }) {
  switch (query) {
    case QUERY.DefeatsByCardCombo:
      return <DefeatsByCardCombo />;
    case QUERY.DecksWinPercentage:
      return <DecksWinPercentage />;
    case QUERY.WinLossPercentage:
    default:
      return <WinLossPercentage />;
  }
}

export default function QueriesPage() {
  const [query, setQuery] = useState(QUERY.WinLossPercentage);

  const winLossPercentageText =
    'Calcule a porcentagem de vitórias e derrotas utilizando a carta X (parâmetro) ocorridas em um intervalo de timestamps (parâmetro).';
  const decksWinPercentageText =
    'Liste os decks completos que produziram mais de X% (parâmetro) de vitórias ocorridas em um intervalo de timestamps (parâmetro).';
  const defeatsByCardComboText =
    'Calcule a quantidade de derrotas utilizando o combo de cartas (X1,X2, ...) (parâmetro) ocorridas em um intervalo de timestamps (parâmetro).';
  const winsByCardAndTrophiesText =
    'Calcule a quantidade de vitórias envolvendo a carta X (parâmetro) nos casos em que o vencedor possui Z% (parâmetro) menos troféus do que o perdedor e o perdedor derrubou ao menos duas torres do adversário.';
  const combosWinsPercentageText =
    'Liste o combo de cartas (eg: carta 1, carta 2, carta 3... carta n) de tamanho N (parâmetro) que produziram mais de Y% (parâmetro) de vitórias ocorridas em um intervalo de timestamps (parâmetro).';

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Paper sx={{ padding: '2rem' }}>
        <HorizontalContainer style={{ width: '100%' }}>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: colors.primaryWhiteColor
            }}
            component="nav"
            aria-labelledby="queries-subheader"
            subheader={
              <ListSubheader component="div" id="queries-subheader">
                Consultas
              </ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => setQuery(QUERY.WinLossPercentage)}
              selected={query === QUERY.WinLossPercentage}
            >
              <ListItemText primary={winLossPercentageText} />
            </ListItemButton>
            <ListItemButton
              onClick={() => setQuery(QUERY.DecksWinPercentage)}
              selected={query === QUERY.DecksWinPercentage}
            >
              <ListItemText primary={decksWinPercentageText} />
            </ListItemButton>
            <ListItemButton
              onClick={() => setQuery(QUERY.DefeatsByCardCombo)}
              selected={query === QUERY.DefeatsByCardCombo}
            >
              <ListItemText primary={defeatsByCardComboText} />
            </ListItemButton>
            <ListItemButton
              onClick={() => setQuery(QUERY.WinsByCardAndTrophies)}
              selected={query === QUERY.WinsByCardAndTrophies}
            >
              <ListItemText primary={winsByCardAndTrophiesText} />
            </ListItemButton>
            <ListItemButton
              onClick={() => setQuery(QUERY.CombosWinsPercentage)}
              selected={query === QUERY.CombosWinsPercentage}
            >
              <ListItemText primary={combosWinsPercentageText} />
            </ListItemButton>
          </List>
          <RenderQuery query={query} />
        </HorizontalContainer>
      </Paper>
    </VerticalContainer>
  );
}
