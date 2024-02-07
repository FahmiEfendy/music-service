import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';

import Navbar from '@components/Navbar';
import MusicPlayer from '@components/MusicPlayer';
import { selectSongDetail } from '@components/MusicPlayer/selectors';

const MainLayout = ({ children, locale, theme, intl: { formatMessage }, songDetail }) => (
  <div>
    <Navbar title={formatMessage({ id: 'app_title_header' })} locale={locale} theme={theme} />
    {children}
    {songDetail?.data.length !== 0 && <MusicPlayer />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
  songDetail: selectSongDetail,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
  songDetail: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
