import { SET_LOCAL, SET_THEME, SET_POPUP, SET_LOADING, PING } from '@containers/App/constants';

export const setLocale = (locale) => ({
  type: SET_LOCAL,
  locale,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});

export const showPopup = (title = '', message = '', btnText = '', btnHandler = () => {}) => ({
  type: SET_POPUP,
  popup: {
    open: true,
    title,
    message,
    onClick: {
      btnText,
      btnHandler,
    },
  },
});

export const hidePopup = () => ({
  type: SET_POPUP,
  popup: {
    open: false,
    title: '',
    message: '',
    onClick: {
      btnText: '',
      btnHandler: () => {},
    },
  },
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

export const ping = () => ({
  type: PING,
});
