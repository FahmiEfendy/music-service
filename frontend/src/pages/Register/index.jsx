import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import encryptPayload from '@utils/encryptPayload';
import { selectRegister } from './selectors';
import { postRegisterRequest } from './actions';

import classes from './style.module.scss';

const Register = ({ register }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const registerHandler = () => {
    // TODO: Add Validation
    const payload = {
      username: encryptPayload(username),
      fullname: encryptPayload(fullname),
      password: encryptPayload(password),
      confirmPassword: encryptPayload(confirmPassword),
      role,
    };

    dispatch(postRegisterRequest(payload));

    setUsername('');
    setFullname('');
    setPassword('');
    setConfirmPassword('');
    setRole('');

    if (register.isError) return;

    navigate('/login');
  };

  return (
    <Container className={classes.register_container}>
      <Container className={classes.register_container_inner}>
        <Box className={classes.wrapper_left} />
        <Box className={classes.wrapper_right}>
          <Typography variant="h5">
            <FormattedMessage id="register_header" />
          </Typography>
          <FormControl className={classes.form}>
            <FormLabel className={classes.form_label}>Username</FormLabel>
            <TextField type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl className={classes.form}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="profile_fullname" />
            </FormLabel>
            <TextField type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          </FormControl>
          <FormControl className={classes.form}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="login_input_password" />
            </FormLabel>
            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl className={classes.form}>
            <FormLabel className={classes.form_label}>
              <FormattedMessage id="register_confirm_password" />
            </FormLabel>
            <TextField type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
          <FormControl className={classes.form}>
            <FormLabel className={classes.form_label}>Role</FormLabel>
            <RadioGroup className={classes.radio} value={role} onChange={(e) => setRole(e.target.value)}>
              <FormControlLabel className={classes.radio_label} value="artist" control={<Radio />} label="Artist" />
              <FormControlLabel className={classes.radio_label} value="listener" control={<Radio />} label="Listener" />
            </RadioGroup>
          </FormControl>
          <Box className={classes.form}>
            <Button variant="contained" onClick={registerHandler}>
              <FormattedMessage id="register_header" />
            </Button>
          </Box>
          <Typography variant="body1" className={classes.login}>
            <FormattedMessage id="register_login_label_1" />
            <a href="/login">
              <FormattedMessage id="register_login_label_2" />
            </a>
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

Register.propTypes = {
  register: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  register: selectRegister,
});

export default connect(mapStateToProps)(Register);
