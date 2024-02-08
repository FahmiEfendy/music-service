import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import UploadIcon from '@mui/icons-material/Upload';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Box, Button, Container, FormControl, FormLabel, IconButton, TextField, Typography } from '@mui/material';

import { postCreateSongRequest } from './action';

import classes from './style.module.scss';

const CreateSong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const songInputRef = useRef(null);
  const songCoverInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [song, setSong] = useState('');
  const [songCover, setSongCover] = useState('');

  const inputSongCoverHandler = () => {
    songInputRef.current.click();
  };

  const createSongHandler = () => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('song', song);
    formData.append('songCover', songCover);

    dispatch(postCreateSongRequest(formData));
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
            <TextField type="text" onChange={(e) => setTitle(e.target.value)} />
          </Box>
          <Box className={classes.input_list}>
            <FormLabel className={classes.input_label}>
              <Typography variant="body1">
                <FormattedMessage id="create_song_genre" />
              </Typography>
            </FormLabel>
            <TextField type="text" onChange={(e) => setGenre(e.target.value)} />
          </Box>
          <Box className={classes.input_list}>
            <FormLabel className={classes.input_label} htmlFor="songInput">
              <Typography variant="body1">
                <FormattedMessage id="create_song_file1" />
              </Typography>
            </FormLabel>
            <Box className={classes.input_file}>
              {song.name && (
                <Box className={classes.music_preview}>
                  <IconButton className={classes.btn_wrapper}>
                    <MusicNoteIcon />
                  </IconButton>
                  <Typography variant="body1">{song.name}</Typography>
                </Box>
              )}
              <Button variant="outlined" onClick={inputSongCoverHandler} className={classes.input_btn}>
                Choose File
              </Button>
            </Box>
            <input
              type="file"
              id="songInput"
              ref={songInputRef}
              className={classes.hide_input}
              onChange={(e) => setSong(e.target.files[0])}
            />
          </Box>
          <Box className={classes.input_list}>
            <FormLabel className={classes.input_label}>
              <Typography variant="body1">
                <FormattedMessage id="create_song_file2" />
              </Typography>
            </FormLabel>
            {songCover ? (
              <img
                className={classes.cover_preview}
                src={typeof songCover === 'object' ? URL.createObjectURL(songCover) : songCover}
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
                  ref={songCoverInputRef}
                  className={classes.hide_input}
                  onChange={(e) => setSongCover(e.target.files[0])}
                />
              </Box>
            )}
          </Box>
          <Box className={classes.btn}>
            <Button type="button" variant="outlined" onClick={() => navigate(-1)}>
              <FormattedMessage id="create_song_cancel" />
            </Button>
            <Button type="button" variant="contained" onClick={createSongHandler}>
              <FormattedMessage id="create_song_proceed" />
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
};

export default CreateSong;
