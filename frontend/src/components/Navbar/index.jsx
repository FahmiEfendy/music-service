import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';

import { setLocale } from '@containers/App/actions';
import { postLoginReset } from '@pages/Login/actions';
import { selectUserDetail } from '@pages/Profile/selectors';
import { getUserDetailRequest } from '@pages/Profile/actions';
import { setLogin, setToken } from '@containers/Client/actions';
import { selectLogin as isSelectLogin } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Navbar = ({ title, locale, isLogin, userDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuPosition, setMenuPosition] = useState(null);
  const [langMenuPosition, setLangMenuPosition] = useState(null);

  const open = Boolean(menuPosition);
  const isLangOpen = Boolean(langMenuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const langClickHandler = (e) => {
    setLangMenuPosition(e.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const langCloseHandler = () => {
    setLangMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  const logoutHandler = () => {
    dispatch(setLogin(false));
    dispatch(setToken(null));
    dispatch(postLoginReset());
  };

  useEffect(() => {
    dispatch(getUserDetailRequest());
  }, [dispatch]);

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/vite.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>

        {/* Switch Language */}
        <div className={classes.toolbar_lang}>
          <div className={classes.toggle} onClick={langClickHandler}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
        </div>
        <Menu open={isLangOpen} anchorEl={langMenuPosition} onClose={langCloseHandler}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu_lang} style={{ display: 'flex' }}>
              <Avatar
                className={classes.menuAvatar}
                src="/id.png"
                style={{ width: '30px', height: '30px', marginRight: '.5rem' }}
              />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu_lang} style={{ display: 'flex' }}>
              <Avatar
                className={classes.menuAvatar}
                src="/en.png"
                style={{ width: '30px', height: '30px', marginRight: '.5rem' }}
              />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>

        {/* Profile */}
        {isLogin ? (
          <>
            <div className={classes.toolbar}>
              <div className={classes.toggle} onClick={handleClick}>
                <Avatar className={classes.avatar} src={userDetail?.data?.profilePicture} />
                <div className={classes.lang}>{userDetail?.data?.fullname}</div>
                <ExpandMoreIcon />
              </div>
            </div>
            <Menu open={open} anchorEl={menuPosition} onClose={handleClose} className={classes.menu_container}>
              <MenuItem
                onClick={() => {
                  navigate(`/user/detail/${userDetail?.data?.id}`);
                }}
              >
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="nav_profile" />
                  </div>
                </div>
              </MenuItem>
              {userDetail?.data?.role === 'artist' ? (
                <MenuItem onClick={() => navigate(`/song/list/${userDetail?.data?.id}`)}>
                  <div className={classes.menu}>
                    <div className={classes.menuLang}>
                      <FormattedMessage id="nav_my_song" />
                    </div>
                  </div>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => navigate(`/playlist/list/${userDetail?.data?.id}`)}>
                  <div className={classes.menu}>
                    <div className={classes.menuLang}>
                      <FormattedMessage id="nav_my_playlist" />
                    </div>
                  </div>
                </MenuItem>
              )}
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
  locale: PropTypes.string,
  isLogin: PropTypes.bool,
  userDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLogin: isSelectLogin,
  userDetail: selectUserDetail,
});

export default connect(mapStateToProps)(Navbar);
