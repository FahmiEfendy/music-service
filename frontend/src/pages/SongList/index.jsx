import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Avatar, Box, Button, Container, Grid, IconButton, List, ListItem, Typography } from '@mui/material';

import tokenDecoder from '@utils/tokenDecoder';
import { hidePopup, showPopup } from '@containers/App/actions';
import { selectSongList } from '@pages/Home/selectors';
import { getSongListRequest } from '@pages/Home/actions';
import { selectToken } from '@containers/Client/selectors';
import { deleteSongRequest } from './actions';

import classes from './style.module.scss';

const SongList = ({ songList, token }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState('');

  const deleteHandler = (data) => {
    const confirmDeleteHandler = () => {
      dispatch(deleteSongRequest(data.id, () => dispatch(getSongListRequest({ id }))));
      dispatch(hidePopup());
    };
    dispatch(showPopup('song_delete', 'song_delete_sub', 'song_delete_proceed', confirmDeleteHandler));
  };

  useEffect(() => {
    dispatch(getSongListRequest({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (!token) return;

    const data = tokenDecoder(token);
    setUserData(data);
  }, [token]);

  return (
    <Container className={classes.container}>
      <Box className={classes.profile_wrapper}>
        <Avatar className={classes.avatar} src={userData.profilePicture} />
        <Typography variant="h5">{userData?.fullname}</Typography>
      </Box>
      <List className={classes.list}>
        <Button type="button" variant="contained" onClick={() => navigate('/song/create')}>
          <FormattedMessage id="song_create" />
        </Button>
        <Grid container>
          <ListItem>
            <Grid item xs={3}>
              <Typography variant="body1" className={classes.header}>
                <FormattedMessage id="song_cover" />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className={classes.header}>
                <FormattedMessage id="song_title" />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" className={classes.header}>
                <FormattedMessage id="song_genre" />
              </Typography>
            </Grid>
          </ListItem>
          {songList?.data?.length > 0 ? (
            songList?.data.map((data) => (
              <ListItem className={classes.item} key={data.id}>
                <Grid item xs={3} className={classes.info}>
                  <Avatar src={data?.songCoverUrl} className={classes.song_cover}>
                    <AudiotrackIcon />
                  </Avatar>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.song_title}>{data?.title}</Typography>
                  <Typography className={classes.song_singer}>{data?.singer}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className={classes.song_genre}>{data?.genre}</Typography>
                </Grid>
                <Grid item xs={1} className={classes.action_wrapper}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      deleteHandler(data);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" className={classes.center_text}>
              <FormattedMessage id="home_no_song" />
            </Typography>
          )}
        </Grid>
      </List>
    </Container>
  );
};

SongList.propTypes = {
  songList: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  songList: selectSongList,
  token: selectToken,
});

export default connect(mapStateToProps)(SongList);
