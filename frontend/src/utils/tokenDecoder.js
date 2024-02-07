import { jwtDecode } from 'jwt-decode';

const tokenDecoder = (token) => {
  const data = jwtDecode(token);

  return data;
};

export default tokenDecoder;
