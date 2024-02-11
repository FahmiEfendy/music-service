import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';

import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from '@mui/material';

import tokenDecoder from '@utils/tokenDecoder';
import { selectToken } from '@containers/Client/selectors';
import { postCreatePlaylistRequest } from './actions';

import classes from './style.module.scss';

const CreatePlaylist = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playlistCoverInputRef = useRef(null);

  const [userData, setUserData] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistCover, setPlaylistCover] = useState('');

  const createPlaylistHandler = () => {
    const payload = new FormData();

    payload.append('name', playlistTitle);
    payload.append('playlistCover', playlistCover);

    dispatch(postCreatePlaylistRequest(payload, () => navigate(`/playlist/list/${userData?.id}`)));
  };

  useEffect(() => {
    if (!token) return;

    const data = tokenDecoder(token);
    setUserData(data);
  }, [token]);

  return (
    <Container>
      <Box className={classes.create_container}>
        <Typography variant="h5">
          <FormattedMessage id="create_playlist_header" />
        </Typography>
        <FormControl className={classes.form}>
          <Box className={classes.input_list}>
            <FormLabel className={classes.input_label}>
              <Typography variant="body1">
                <FormattedMessage id="create_song_title" />
              </Typography>
            </FormLabel>
            <TextField type="text" onChange={(e) => setPlaylistTitle(e.target.value)} />
          </Box>
          <Box className={classes.input_list}>
            <FormLabel className={classes.input_label}>
              <Typography variant="body1">
                <FormattedMessage id="create_playlist_file_label" />
              </Typography>
            </FormLabel>
            {playlistCover ? (
              <img
                className={classes.cover_preview}
                src={typeof playlistCover === 'object' ? URL.createObjectURL(playlistCover) : playlistCover}
                alt="Song Cover"
              />
            ) : (
              <Box className={classes.input_file_cover}>
                <FormLabel className={classes.input_label} htmlFor="songCoverInput">
                  <UploadIcon />
                  <Typography variant="body1">
                    <FormattedMessage id="create_playlist_upload_cover" />
                  </Typography>
                </FormLabel>
                <input
                  type="file"
                  id="songCoverInput"
                  ref={playlistCoverInputRef}
                  className={classes.hide_input}
                  onChange={(e) => setPlaylistCover(e.target.files[0])}
                />
              </Box>
            )}
          </Box>
          <Box className={classes.btn}>
            <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
              <FormattedMessage id="create_song_cancel" />
            </Button>
            <Button type="button" variant="contained" onClick={createPlaylistHandler}>
              <FormattedMessage id="create_song_proceed" />
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
};

CreatePlaylist.propTypes = {
  token: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(CreatePlaylist);
