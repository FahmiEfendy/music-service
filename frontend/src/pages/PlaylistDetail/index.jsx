import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FavoriteIcon from '@mui/icons-material/Favorite';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Avatar, Box, Container, Grid, IconButton, List, ListItem, Typography } from '@mui/material';

import { hidePopup, showPopup } from '@containers/App/actions';
import { selectPlaylistDetail } from './selectors';
import { deletePlaylistSongRequest, getPlaylistDetailRequest } from './actions';

import classes from './style.module.scss';

const PlaylistDetail = ({ playlistDetail }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const deleteHandler = (data) => {
    const confirmDeleteHandler = () => {
      dispatch(
        deletePlaylistSongRequest({ song_id: data?.id, playlist_id: id }, () => dispatch(getPlaylistDetailRequest(id)))
      );
      dispatch(hidePopup());
    };

    dispatch(showPopup('playlist_delete', 'playlist_delete_sub', 'song_delete_proceed', confirmDeleteHandler));
  };

  useEffect(() => {
    dispatch(getPlaylistDetailRequest(id));
  }, [dispatch, id]);

  return (
    playlistDetail.data && (
      <Container className={classes.container}>
        <Box className={classes.playlist_wrapper}>
          <Avatar className={classes.avatar} src={playlistDetail?.data?.playlistCover} />
          <Typography variant="h5">{playlistDetail?.data?.name}</Typography>
        </Box>
        <List className={classes.list}>
          <Grid container>
            <ListItem>
              <Grid item xs={1}>
                <Typography variant="body1" className={classes.header}>
                  <FormattedMessage id="song_cover" />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.header}>
                  <FormattedMessage id="song_title" />
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" className={classes.header}>
                  <FormattedMessage id="song_genre" />
                </Typography>
              </Grid>
            </ListItem>
            {playlistDetail?.data?.songs?.length > 0 ? (
              playlistDetail?.data?.songs?.map((data) => (
                <ListItem className={classes.item} key={data.id}>
                  <Grid item xs={1} className={classes.info}>
                    <Avatar src={data?.songCoverUrl} className={classes.song_cover}>
                      <AudiotrackIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.song_title}>{data?.title}</Typography>
                    <Typography className={classes.song_singer}>{data?.singer}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.song_genre}>{data?.genre}</Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.action_wrapper}>
                    <IconButton
                      onClick={() => {
                        deleteHandler(data);
                      }}
                    >
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </Grid>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" className={classes.text_center}>
                <FormattedMessage id="home_no_playlist" />
              </Typography>
            )}
          </Grid>
        </List>
      </Container>
    )
  );
};

PlaylistDetail.propTypes = {
  playlistDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  playlistDetail: selectPlaylistDetail,
});

export default connect(mapStateToProps)(PlaylistDetail);
