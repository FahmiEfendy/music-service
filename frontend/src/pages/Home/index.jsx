/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

import tokenDecoder from '@utils/tokenDecoder';
import stringLimitter from '@utils/stringLimitter';
import { selectToken } from '@containers/Client/selectors';
import { getSongDetailRequest } from '@components/MusicPlayer/actions';
import { selectAddPlaylistSong, selectPlaylistList, selectSongList, selectUserList } from './selectors';
import {
  getPlaylistListRequest,
  getSongListRequest,
  getUserListRequest,
  postAddSongToPlaylistRequest,
} from './actions';

import classes from './style.module.scss';

const Home = ({ token, userList, playlistList, songList, addPlaylistSong }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState('');
  const [openedElement, setOpenedElement] = useState(null);
  const [listPlaylistPosition, setPlaylistPosition] = useState(null);
  const [isAddPlaylistSongError, setIsAddPlaylistSongError] = useState(false);

  const playSongHandler = (id) => {
    dispatch(getSongDetailRequest(id));
  };

  const listPlaylistCloseHandler = () => {
    setPlaylistPosition(null);
    setOpenedElement(null);
  };

  const listPlaylistClickHandler = (element) => (e) => {
    setPlaylistPosition(e.currentTarget);
    setOpenedElement(element);
  };

  const addToPlaylistHandler = (song_id, playlist_id) => {
    dispatch(postAddSongToPlaylistRequest({ song_id, playlist_id }));
  };

  useEffect(() => {
    setIsAddPlaylistSongError(addPlaylistSong?.isError);
  }, [addPlaylistSong?.isError, dispatch, isAddPlaylistSongError]);

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
        <Box className={classes.item_container}>
          {userList?.data &&
            userList?.data.map((data) => (
              <Box className={classes.item_wrapper} key={data.id}>
                <Box className={classes.item_wrapper_inner}>
                  <Avatar className={classes.item_image_rounded} src={data.profilePicture} />
                  <Typography variant="body1">{data.fullname}</Typography>
                </Box>
              </Box>
            ))}
        </Box>
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
        <Box className={classes.item_container}>
          {playlistList?.data.map((data) => (
            <Box className={classes.item_wrapper} key={data.id}>
              <Box className={classes.item_wrapper_inner} onClick={() => navigate(`playlist/detail/${data.id}`)}>
                <Avatar className={classes.item_image} src={data.playlistCover}>
                  <LibraryMusicIcon />
                </Avatar>
                <Typography variant="body1">{stringLimitter(data.name)}</Typography>
              </Box>
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
        <Box className={classes.item_container}>
          {songList?.data.map((data) => (
            <Box className={classes.item_wrapper} key={data.id}>
              <div className={classes.toolbar} onClick={listPlaylistClickHandler(data.id)}>
                <Tooltip title={<FormattedMessage id="home_playlist_button" />} arrow>
                  <IconButton className={classes.button}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <Menu
                open={openedElement === data.id}
                anchorEl={listPlaylistPosition}
                onClose={listPlaylistCloseHandler}
                className={classes.menu_container}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {userData?.playlists?.map((item, index) => (
                  <MenuItem key={index}>
                    <div className={classes.menu}>
                      <div className={classes.menuLang} onClick={() => addToPlaylistHandler(data.id, item.id)}>
                        {item.name}
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
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
  addPlaylistSong: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userList: selectUserList,
  playlistList: selectPlaylistList,
  songList: selectSongList,
  addPlaylistSong: selectAddPlaylistSong,
});

export default connect(mapStateToProps)(Home);
