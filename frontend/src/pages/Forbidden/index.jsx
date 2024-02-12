import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

import classes from './style.module.scss';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.text}>
        <FormattedMessage id="forbidden" />
      </Typography>
      <Button onClick={() => navigate('/')} variant="contained">
        <FormattedMessage id="go_home" />
      </Button>
    </Container>
  );
};

export default Forbidden;
