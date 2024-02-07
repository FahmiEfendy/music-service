import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';

import { selectUserList } from './selectors';
import { getUserListRequest } from './actions';

import classes from './style.module.scss';

const Home = ({ userList }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListRequest());
  }, [dispatch]);

  return (
    <Container className={classes.home_container}>
      <Box className={classes.feature_container}>
        <Box className={classes.feature_text}>
          <Typography variant="h5">Unleash the Beats: Your Soundtrack, Your Style</Typography>
          <Typography variant="body1">Where Rhythm Meets Innovation - Hip-Hop Your Way</Typography>
          <Button>See More</Button>
        </Box>
        <Box className={classes.feature_backdrop} />
      </Box>

      {/* Popular Artist */}
      <Box className={classes.artist_container}>
        <Box className={classes.artist_text}>
          <Typography variant="h5">Popular Artist</Typography>
          <Button className={classes.artist_button}>See More</Button>
        </Box>
        {userList?.data && (
          <Box className={classes.artist_list}>
            {userList?.data.map((data) => (
              <Box className={classes.artist_item} key={data.id}>
                {/* <img src={data.profilePicture} alt={data.fullname} className={classes.artist_item_image} /> */}
                <Avatar className={classes.artist_item_image} src={data.profilePicture} />
                <Typography variant="body1">{data.fullname}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

Home.propTypes = {
  userList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  userList: selectUserList,
});

export default connect(mapStateToProps)(Home);
