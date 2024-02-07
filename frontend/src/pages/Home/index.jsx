import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';

import tokenDecoder from '@utils/tokenDecoder';
import stringLimitter from '@utils/stringLimitter';
import { selectToken } from '@containers/Client/selectors';
import { selectPlaylistList, selectUserList } from './selectors';
import { getPlaylistListRequest, getUserListRequest } from './actions';

import classes from './style.module.scss';

const Home = ({ token, userList, playlistList }) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState('');

  useEffect(() => {
    dispatch(getUserListRequest());
    dispatch(getPlaylistListRequest());
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
            <Button>
              <FormattedMessage id="home_button" />
            </Button>
          ) : (
            <Button>
              <FormattedMessage id="home_button_secondary" />
            </Button>
          )}
        </Box>
        <Box className={classes.feature_backdrop} />
      </Box>

      {/* Popular Artist */}
      <Box className={classes.artist_container}>
        <Box className={classes.artist_text}>
          <Typography variant="h5">
            <FormattedMessage id="home_artist_popular" />
          </Typography>
          <Button className={classes.artist_button}>
            <FormattedMessage id="home_button_secondary" />
          </Button>
        </Box>
        {userList?.data && (
          <Box className={classes.artist_list}>
            {userList?.data.map((data) => (
              <Box className={classes.artist_item} key={data.id}>
                <Avatar className={classes.artist_item_image} src={data.profilePicture} />
                <Typography variant="body1">{data.fullname}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Popular Playlist */}
      <Box className={classes.playlist_container}>
        <Box className={classes.playlist_text}>
          <Typography variant="h5">
            <FormattedMessage id="home_playlist_popular" />
          </Typography>
          <Button className={classes.playlist_button}>
            <FormattedMessage id="home_button_secondary" />
          </Button>
        </Box>
        <Box className={classes.playlist_list}>
          {playlistList?.data.map((data) => (
            <Box className={classes.playlist_item} key={data.id}>
              <Avatar className={classes.playlist_item_image} src={data.playlistCover} />
              <Typography variant="body1">{stringLimitter(data.name)}</Typography>
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
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userList: selectUserList,
  playlistList: selectPlaylistList,
});

export default connect(mapStateToProps)(Home);
