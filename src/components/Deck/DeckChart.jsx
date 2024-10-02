import { PieChart } from '@mui/x-charts';
import PropTypes from 'prop-types';

import * as colors from '../../config/colors';

DeckChart.propTypes = {
  winPercentage: PropTypes.number.isRequired,
  lossPercentage: PropTypes.number.isRequired
};

export default function DeckChart({ winPercentage, lossPercentage }) {
  return (
    <PieChart
      // https://mui.com/x/react-charts/pie/
      series={[
        {
          arcLabel: (item) => `${Number.parseFloat(item.value).toFixed(2)}%`,
          data: [
            {
              id: 0,
              value: Number.parseFloat(winPercentage).toFixed(2),
              label: '% Vitórias',
              color: colors.sucessColor
            },
            {
              id: 1,
              value: Number.parseFloat(lossPercentage).toFixed(2),
              label: '% Derrotas',
              color: colors.dangerColor
            }
          ]
        }
      ]}
      width={400}
      height={200}
    />
  );
}
