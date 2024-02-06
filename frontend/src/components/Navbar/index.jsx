import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';

import { selectLogin } from '@pages/Login/selectors';
import { setLogin, setToken } from '@containers/Client/actions';
import { selectLogin as isSelectLogin } from '@containers/Client/selectors';

import classes from './style.module.scss';
import ProfilePicture from '../../assets/profile.jpg';

const Navbar = ({ title, login, isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              {/* Profile Button */}
              <div className={classes.toggle} onClick={handleClick}>
                {/* GET Profile Picture */}
                <Avatar className={classes.avatar} src={ProfilePicture} />
                <div className={classes.lang}>{login.data.fullname}</div>
                <ExpandMoreIcon />
              </div>
            </div>
            {/* Profile Dropdown */}
            <Menu open={open} anchorEl={menuPosition} onClose={handleClose} className={classes.menu_container}>
              <MenuItem
                onClick={() => {
                  navigate(`/user/detail/${login.data.id}`);
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
  login: PropTypes.object,
  isLogin: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  isLogin: isSelectLogin,
});

export default connect(mapStateToProps)(Navbar);
