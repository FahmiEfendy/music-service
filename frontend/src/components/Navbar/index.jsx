import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';

import tokenDecoder from '@utils/tokenDecoder';
import { setLogin, setToken } from '@containers/Client/actions';
import { selectLogin as isSelectLogin, selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Navbar = ({ title, token, isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState('');
  const [menuPosition, setMenuPosition] = useState(null);

  const open = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const goHome = () => {
    navigate('/');
  };

  const logoutHandler = () => {
    dispatch(setLogin(false));
    dispatch(setToken(null));
  };

  useEffect(() => {
    if (!token) return;

    const data = tokenDecoder(token);
    setUserData(data);
  }, [token]);

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/vite.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>

        {isLogin ? (
          <>
            <div className={classes.toolbar}>
              <div className={classes.toggle} onClick={handleClick}>
                <Avatar className={classes.avatar} src={userData.profilePicture} />
                <div className={classes.lang}>{userData.fullname}</div>
                <ExpandMoreIcon />
              </div>
            </div>
            <Menu open={open} anchorEl={menuPosition} onClose={handleClose} className={classes.menu_container}>
              <MenuItem
                onClick={() => {
                  navigate(`/user/detail/${userData?.id}`);
                }}
              >
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="nav_profile" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={logoutHandler}>
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="nav_logout" />
                  </div>
                </div>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button type="button" variant="contained" className={classes.login_btn} onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  token: PropTypes.any,
  isLogin: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  isLogin: isSelectLogin,
});

export default connect(mapStateToProps)(Navbar);
