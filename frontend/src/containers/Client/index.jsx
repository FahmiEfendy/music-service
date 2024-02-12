import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin } from '@containers/Client/selectors';
import { selectUserDetail } from '@pages/Profile/selectors';

const Client = ({ login, children, singerOnly, userDetail }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
    } else if (singerOnly && userDetail?.data?.role !== 'singer') {
      navigate('/forbidden');
    }
  }, [login, navigate, singerOnly, userDetail?.data?.role]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  children: PropTypes.element,
  singerOnly: PropTypes.bool,
  userDetail: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  userDetail: selectUserDetail,
});

export default connect(mapStateToProps)(Client);
