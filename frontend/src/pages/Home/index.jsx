import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';

import tokenDecoder from '@utils/tokenDecoder';
import stringLimitter from '@utils/stringLimitter';
import { selectToken } from '@containers/Client/selectors';
import { getSongDetailRequest } from '@components/MusicPlayer/actions';
import { selectPlaylistList, selectSongList, selectUserList } from './selectors';
import { getPlaylistListRequest, getSongListRequest, getUserListRequest } from './actions';

import classes from './style.module.scss';

const Home = ({ token, userList, playlistList, songList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState('');

  useEffect(() => {
    dispatch(getUserListRequest({ role: 'artist' }));
    dispatch(getPlaylistListRequest());
    dispatch(getSongListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;

    const data = tokenDecoder(token);
    setUserData(data);
  }, [token]);

  const playSongHandler = (id) => {
    dispatch(getSongDetailRequest(id));
  };

  return (
    <Container className={classes.home_container}>
      <Box className={classes.feature_container}>
        <Box className={classes.feature_text}>
          <Typography variant="h5">Unleash the Beats: Your Soundtrack, Your Style</Typography>
          <Typography variant="body1">Where Rhythm Meets Innovation - Hip-Hop Your Way</Typography>
          {userData?.role === 'artist' ? (
            <Button onClick={() => navigate('/song/create')}>
              <FormattedMessage id="home_button" />
            </Button>
          ) : (
            <Button onClick={() => navigate('/playlist/create')}>
              <FormattedMessage id="home_button_create" />
            </Button>
          )}
        </Box>
        <Box className={classes.feature_backdrop} />
      </Box>

      {/* Popular Artist */}
      <Box className={classes.list_container}>
        <Box className={classes.list_header}>
          <Typography variant="h5">
            <FormattedMessage id="home_artist_popular" />
          </Typography>
          <Button className={classes.more_btn}>
            <FormattedMessage id="home_button_secondary" />
          </Button>
        </Box>
        {userList?.data && (
          <Box className={classes.item_wrapper}>
            {userList?.data.map((data) => (
              <Box className={classes.item_wrapper_inner} key={data.id}>
                <Avatar className={classes.item_image_rounded} src={data.profilePicture} />
                <Typography variant="body1">{data.fullname}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Popular Playlist */}
      <Box className={classes.list_container}>
        <Box className={classes.list_header}>
          <Typography variant="h5">
            <FormattedMessage id="home_playlist_popular" />
          </Typography>
          <Button className={classes.more_btn}>
            <FormattedMessage id="home_button_secondary" />
          </Button>
        </Box>
        <Box className={classes.item_wrapper}>
          {playlistList?.data.map((data) => (
            <Box className={classes.item_wrapper_inner} key={data.id}>
              <Avatar className={classes.item_image} src={data.playlistCover}>
                <LibraryMusicIcon />
              </Avatar>
              <Typography variant="body1">{stringLimitter(data.name)}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Popular Song */}
      <Box className={classes.list_container}>
        <Box className={classes.list_header}>
          <Typography variant="h5">
            <FormattedMessage id="home_song_popular" />
          </Typography>
          <Button className={classes.more_btn}>
            <FormattedMessage id="home_button_secondary" />
          </Button>
        </Box>
        <Box className={classes.item_wrapper}>
          {songList?.data.map((data) => (
            <Box
              className={classes.item_wrapper_inner}
              key={data.id}
              onClick={() => {
                playSongHandler(data.id);
              }}
            >
              <Avatar className={classes.item_image} src={data?.songCoverUrl}>
                <AudiotrackIcon />
              </Avatar>
              <Typography variant="body1">{`${data?.singer} - ${data?.title}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

Home.propTypes = {
  token: PropTypes.string,
  userList: PropTypes.object,
  playlistList: PropTypes.object,
  songList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userList: selectUserList,
  playlistList: selectPlaylistList,
  songList: selectSongList,
});

export default connect(mapStateToProps)(Home);
