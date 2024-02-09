import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import Login from '@pages/Login';
import Profile from '@pages/Profile';
import CreateSong from '@pages/CreateSong';
import SongList from '@pages/SongList';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
  },
  {
    path: '/user',
    name: 'User',
    subRoutes: [
      {
        path: '/detail/:id',
        name: 'User Detail',
        protected: true,
        component: Profile,
        layout: MainLayout,
      },
    ],
  },
  {
    path: '/song',
    name: 'Song',
    subRoutes: [
      {
        path: '/create',
        name: 'Create Song',
        protected: true,
        component: CreateSong,
        layout: MainLayout,
      },
      {
        path: '/list/:id',
        name: 'My Song List',
        protected: true,
        component: SongList,
        layout: MainLayout,
      },
    ],
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
