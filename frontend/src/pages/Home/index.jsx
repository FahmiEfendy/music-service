/* eslint-disable no-nested-ternary */
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

import stringLimitter from '@utils/stringLimitter';
import { showPopup } from '@containers/App/actions';
import { selectUserDetail } from '@pages/Profile/selectors';
import { getSongDetailRequest } from '@components/MusicPlayer/actions';
import { selectAddPlaylistSong, selectPlaylistList, selectSongList, selectUserList } from './selectors';
import {
  getPlaylistListRequest,
  getSongListRequest,
  getUserListRequest,
  postAddSongToPlaylistRequest,
} from './actions';

import classes from './style.module.scss';

const Home = ({ userList, playlistList, songList, addPlaylistSong, userDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (userDetail?.data?.playlists?.length < 1) return dispatch(showPopup('home_error', 'home_no_playlist'));

    setPlaylistPosition(e.currentTarget);
    setOpenedElement(element);
  };

  const addToPlaylistHandler = (song_id, playlist_id) => {
    dispatch(
      postAddSongToPlaylistRequest({ song_id, playlist_id }, () => {
        dispatch(showPopup('home_success', 'home_success_add_playlist_song'));
      })
    );
  };

  useEffect(() => {
    setIsAddPlaylistSongError(addPlaylistSong?.isError);
  }, [addPlaylistSong?.isError, dispatch, isAddPlaylistSongError]);

  useEffect(() => {
    dispatch(getUserListRequest({ role: 'artist' }));
    dispatch(getPlaylistListRequest());
    dispatch(getSongListRequest());
  }, [dispatch]);

  return (
    <Container className={classes.home_container}>
      <Box className={classes.feature_container}>
        <Box className={classes.feature_text}>
          <Typography variant="h5">Unleash the Beats: Your Soundtrack, Your Style</Typography>
          <Typography variant="body1">Where Rhythm Meets Innovation - Hip-Hop Your Way</Typography>
          {userDetail?.data?.role ? (
            userDetail?.data?.role === 'artist' ? (
              <Button onClick={() => navigate('/song/create')}>
                <FormattedMessage id="home_button" />
              </Button>
            ) : (
              <Button onClick={() => navigate('/playlist/create')}>
                <FormattedMessage id="home_button_create" />
              </Button>
            )
          ) : (
            ''
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
          {userList?.data?.length > 0 && (
            <Button className={classes.more_btn}>
              <FormattedMessage id="home_button_secondary" />
            </Button>
          )}
        </Box>
        <Box className={classes.item_container}>
          {userList?.data?.length > 0 ? (
            userList?.data.map((data) => (
              <Box className={classes.item_wrapper} key={data.id}>
                <Box className={classes.item_wrapper_inner}>
                  <Avatar className={classes.item_image_rounded} src={data.profilePicture} />
                  <Typography variant="body1">{data.fullname}</Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body1" align="center">
              <FormattedMessage id="home_no_artist" />
            </Typography>
          )}
        </Box>
      </Box>

      {/* Popular Playlist */}
      <Box className={classes.list_container}>
        <Box className={classes.list_header}>
          <Typography variant="h5">
            <FormattedMessage id="home_playlist_popular" />
          </Typography>
          {playlistList?.data?.length > 0 && (
            <Button className={classes.more_btn}>
              <FormattedMessage id="home_button_secondary" />
            </Button>
          )}
        </Box>
        <Box className={classes.item_container}>
          {playlistList?.data?.length > 0 ? (
            playlistList?.data?.map((data) => (
              <Box className={classes.item_wrapper} key={data.id}>
                <Box className={classes.item_wrapper_inner} onClick={() => navigate(`playlist/detail/${data.id}`)}>
                  <Avatar className={classes.item_image} src={data.playlistCover}>
                    <LibraryMusicIcon />
                  </Avatar>
                  <Typography variant="body1">{stringLimitter(data.name)}</Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body1" align="center">
              <FormattedMessage id="home_no_playlist" />
            </Typography>
          )}
        </Box>
      </Box>

      {/* Popular Song */}
      <Box className={classes.list_container}>
        <Box className={classes.list_header}>
          <Typography variant="h5">
            <FormattedMessage id="home_song_popular" />
          </Typography>
          {songList?.data?.length > 0 && (
            <Button className={classes.more_btn}>
              <FormattedMessage id="home_button_secondary" />
            </Button>
          )}
        </Box>
        <Box className={classes.item_container}>
          {songList?.data?.length > 0 ? (
            songList?.data.map((data) => (
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
                  {userDetail?.data?.playlists?.map((item, index) => (
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
            ))
          ) : (
            <Typography variant="body1" align="center">
              <FormattedMessage id="home_no_song" />
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

Home.propTypes = {
  userList: PropTypes.object,
  playlistList: PropTypes.object,
  songList: PropTypes.object,
  addPlaylistSong: PropTypes.object,
  userDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userList: selectUserList,
  playlistList: selectPlaylistList,
  songList: selectSongList,
  addPlaylistSong: selectAddPlaylistSong,
  userDetail: selectUserDetail,
});

export default connect(mapStateToProps)(Home);
