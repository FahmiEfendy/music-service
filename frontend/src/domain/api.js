import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',

  register: '/user/register',
  login: '/user/login',
  userList: '/user',
  userDetail: '/user/detail',
  updateProfile: '/user/update-profile',

  playlistList: '/playlist',

  songList: '/song',
  songDetail: '/song/detail',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const postRegister = (data) => {
  callAPI(urls.register, 'POST', {}, {}, data);
};
export const postLogin = (data) => callAPI(urls.login, 'POST', {}, {}, data);
export const getUserList = (params) => callAPI(urls.userList, 'GET', {}, params, {});
export const getUserDetail = () => callAPI(urls.userDetail, 'GET');
export const patchUpdateProfile = (data) => {
  const header = { 'Content-Type': 'multipart/form-data' };
  return callAPI(urls.updateProfile, 'PATCH', header, {}, data);
};
export const getplaylistList = () => callAPI(urls.playlistList, 'GET');
export const getSongList = () => callAPI(urls.songList, 'GET');
export const getSongDetail = (id) => callAPI(`${urls.songDetail}/${id}`, 'GET');
