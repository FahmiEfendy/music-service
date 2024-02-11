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
  playlistDetail: '/playlist/detail',
  createPlaylist: '/playlist/create',
  addPlaylistSong: '/playlist/add-song',
  deletePlaylistSong: '/playlist/remove-song',

  songList: '/song',
  songDetail: '/song/detail',
  createSong: '/song/create',
  deleteSong: '/song/remove',
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

// User
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
// TODO: PATCH Change Password
// TODO: POST Forgot Password
// TODO: POST Reset Password
// TODO: DELETE Remove User

// Playlist
export const postCreatePlaylist = (data) => {
  const header = { 'Content-Type': 'multipart/form-data' };
  return callAPI(urls.createPlaylist, 'POST', header, {}, data);
};
export const getplaylistList = (params) => callAPI(urls.playlistList, 'GET', params, {});
export const getPlaylistDetail = (id) => callAPI(`${urls.playlistDetail}/${id}`, 'GET');
// TODO: PATCH Update Playlist
// TODO: DELETE Remove Playlist
export const postAddPlaylistSong = (payload) =>
  callAPI(`${urls.addPlaylistSong}/${payload?.playlist_id}`, 'POST', {}, {}, { song_id: payload?.song_id });
export const deletePlaylistSong = (payload) =>
  callAPI(`${urls.deletePlaylistSong}/${payload?.playlist_id}`, 'DELETE', {}, {}, { song_id: payload?.song_id });

// Song
export const postCreateSong = (data) => {
  const header = { 'Content-Type': 'multipart/form-data' };
  return callAPI(urls.createSong, 'POST', header, {}, data);
};
export const getSongList = (params) => callAPI(urls.songList, 'GET', {}, params, {});
export const getSongDetail = (id) => callAPI(`${urls.songDetail}/${id}`, 'GET');
// TODO: PATCH Update Song
export const deleteSong = (id) => callAPI(`${urls.deleteSong}/${id}`, 'DELETE');
