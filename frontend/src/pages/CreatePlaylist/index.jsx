import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from '@mui/material';

import classes from './style.module.scss';
import { postCreatePlaylistRequest } from './actions';

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playlistCoverInputRef = useRef(null);

  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistCover, setPlaylistCover] = useState('');

  const createPlaylistHandler = () => {
    const payload = new FormData();

    payload.append('name', playlistTitle);
    payload.append('playlistCover', playlistCover);

    dispatch(postCreatePlaylistRequest(payload));
  };

  return (
    <Container>
      <Box className={classes.create_container}>
        <Typography variant="h5">Create Song</Typography>
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
                <FormattedMessage id="create_song_file2" />
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
                    <FormattedMessage id="create_song_upload_cover" />
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

export default CreatePlaylist;
