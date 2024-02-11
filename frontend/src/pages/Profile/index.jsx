import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
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
import UploadIcon from '@mui/icons-material/Upload';

import { showPopup } from '@containers/App/actions';
import { selectUserDetail } from './selectors';
import { getUserDetailRequest, patchUpdateProfileRequest } from './actions';

import classes from './style.module.scss';

const Profile = ({ userDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [fullname, setFullname] = useState('');
  const [file, setFile] = useState('');

  const updateProfileHandler = () => {
    const formData = new FormData();

    formData.append('fullname', fullname);
    formData.append('profilePicture', file);

    dispatch(
      patchUpdateProfileRequest(formData, () => {
        dispatch(showPopup('home_success', 'profile_update_success'));
      })
    );
  };

  useEffect(() => {
    dispatch(getUserDetailRequest());
  }, [dispatch]);

  useEffect(() => {
    if (userDetail?.data?.length !== 0) {
      setFile(userDetail?.data?.profilePicture);
      setFullname(userDetail?.data?.fullname);
    }
  }, [userDetail?.data]);

  return (
    userDetail?.data?.length !== 0 && (
      <Container className={classes.container} maxWidth="md">
        <Container className={classes.container_inner}>
          <Typography variant="h5">
            <FormattedMessage id="profile_header" />
          </Typography>
          <FormControl className={classes.input_wrapper}>
            <FormLabel className={classes.input_label}>Username</FormLabel>
            <TextField type="text" value={userDetail?.data?.username || ''} disabled />
          </FormControl>
          <FormControl className={classes.input_wrapper}>
            <FormLabel className={classes.input_label}>
              <FormattedMessage id="profile_fullname" />
            </FormLabel>
            <TextField type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
          </FormControl>
          <FormControl className={classes.input_wrapper}>
            <FormLabel className={classes.input_label}>Role</FormLabel>
            <RadioGroup className={classes.radio} value={userDetail?.data?.role || ''}>
              <FormControlLabel
                className={classes.radio_label}
                value="artist"
                control={<Radio />}
                label="Artist"
                disabled
              />
              <FormControlLabel
                className={classes.radio_label}
                value="listener"
                control={<Radio />}
                label="Listener"
                disabled
              />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.input_wrapper}>
            <FormLabel className={classes.input_label}>
              <FormattedMessage id="profile_picture_label" />
            </FormLabel>
            {userDetail?.data?.profilePicture || file ? (
              <>
                <img
                  className={classes.profile_picture}
                  src={typeof file === 'object' ? URL.createObjectURL(file) : file}
                  alt="Profile"
                />
                {/* TODO: Fix Change Profile Picture */}
                {/* <Button
                  type="button"
                  variant="text"
                  className={classes.change_btn}
                  onClick={() => fileInputRef?.current?.click()}
                >
                  Change Profile Picture
                </Button> */}
              </>
            ) : (
              <Box className={classes.input_profile_picture}>
                <FormLabel htmlFor="fileInput">
                  <UploadIcon />
                  <Typography variant="body1">
                    <FormattedMessage id="profile_upload" />
                  </Typography>
                </FormLabel>
                <input type="file" id="fileInput" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} />
              </Box>
            )}
          </FormControl>
          <Box className={classes.button_wrapper}>
            <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
              <FormattedMessage id="profile_back" />
            </Button>
            <Button type="button" variant="contained" onClick={updateProfileHandler}>
              <FormattedMessage id="profile_proceed" />
            </Button>
          </Box>
        </Container>
      </Container>
    )
  );
};

Profile.propTypes = {
  userDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userDetail: selectUserDetail,
});

export default connect(mapStateToProps)(Profile);
