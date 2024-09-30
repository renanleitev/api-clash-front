import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';

function DashboardWindow({ title, quantity, isLoading }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      {isLoading ? (
        <VerticalContainer style={{ padding: '2rem' }}>
          <CircularProgress />
        </VerticalContainer>
      ) : (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {quantity ?? 0}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

DashboardWindow.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default DashboardWindow;
