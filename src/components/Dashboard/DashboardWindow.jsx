import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import LoadingProgress from '../Loading/LoadingProgress';

function DashboardWindow({ title, quantity = 0, isLoading }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      {isLoading ? (
        <LoadingProgress />
      ) : (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {quantity}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

DashboardWindow.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool.isRequired
};

export default DashboardWindow;
