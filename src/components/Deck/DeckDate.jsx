import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { VerticalContainer } from '../../config/GlobalStyle';

DeckDate.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired
};

export default function DeckDate({ startDate, endDate }) {
  return (
    <VerticalContainer style={{ width: '50%' }}>
      <Typography variant="h6">
        Data Inicial: {dayjs(startDate).format('DD/MM/YYYY')}
      </Typography>
      <Typography variant="h6">
        Data Final: {dayjs(endDate).format('DD/MM/YYYY')}
      </Typography>
    </VerticalContainer>
  );
}
