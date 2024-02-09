import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from '@mui/material';

import encryptPayload from '@utils/encryptPayload';
import { setLogin, setToken } from '@containers/Client/actions';
import { selectLogin } from './selectors';
import { postLoginRequest } from './actions';

import classes from './style.module.scss';

const Login = ({ login }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    // TODO: Add Validation
    const payload = {
      username: encryptPayload(username),
      password: encryptPayload(password),
    };

    dispatch(postLoginRequest(payload));

    if (login.isError) return;

    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (login?.data?.token) {
      dispatch(setLogin(true));
      dispatch(setToken(login?.data?.token));
      navigate('/');
    }
  }, [dispatch, login?.data?.token, navigate]);

  return (
    <Container className={classes.login_container}>
      <Container className={classes.login_container_inner}>
        <Box className={classes.wrapper_left} />
        <Box className={classes.wrapper_right}>
          <Typography variant="h5">
            <FormattedMessage id="login_header" />
          </Typography>
          <FormControl className={classes.form}>
            <FormLabel className={classes.form_label}>Username</FormLabel>
            <TextField type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl className={classes.form}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="login_input_password" />
            </FormLabel>
            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Box className={classes.form}>
            <Button variant="contained" onClick={loginHandler}>
              <FormattedMessage id="login_header" />
            </Button>
          </Box>
          <Typography variant="body1" className={classes.login}>
            <FormattedMessage id="login_register_label_1" />
            <a href="/register">
              <FormattedMessage id="login_register_label_2" />
            </a>
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default connect(mapStateToProps)(Login);
