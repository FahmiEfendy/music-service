import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';

import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Avatar, Box, Container, Typography } from '@mui/material';

import tokenDecoder from '@utils/tokenDecoder';
import stringLimitter from '@utils/stringLimitter';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';
import { selectPlaylistList } from '@pages/Home/selectors';
import { getPlaylistListRequest } from '@pages/Home/actions';

import classes from './style.module.scss';

const PlaylistList = ({ token, playlistList }) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState('');

  useEffect(() => {
    dispatch(getPlaylistListRequest({ id: userData?.id }));
  }, [dispatch, userData?.id]);

  useEffect(() => {
    if (!token) return;

    const data = tokenDecoder(token);
    setUserData(data);
  }, [token]);

  return (
    <Container className={classes.container}>
      <Box className={classes.list_container}>
        <Box className={classes.list_header}>
          <Typography variant="h5">
            <FormattedMessage id="nav_my_playlist" />
          </Typography>
        </Box>
        <Box className={classes.item_wrapper}>
          {playlistList?.data?.length > 0 ? (
            playlistList?.data.map((data) => (
              <Box className={classes.item_wrapper_inner} key={data.id}>
                <Avatar className={classes.item_image} src={data.playlistCover}>
                  <LibraryMusicIcon />
                </Avatar>
                <Typography variant="body1">{stringLimitter(data.name)}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1" className={classes.center_text}>
              <FormattedMessage id="home_no_playlist" />
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

PlaylistList.propTypes = {
  token: PropTypes.string,
  playlistList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  playlistList: selectPlaylistList,
});

export default connect(mapStateToProps)(PlaylistList);
