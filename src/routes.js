import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div> </div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const AllInfo = Loadable({
  loader: () => import('./views/AllInfo'),
  loading: Loading,
});

const Choose = Loadable({
  loader: () => import('./views/Choose'),
  loading: Loading,
});

const Choose2 = Loadable({
  loader: () => import('./views/Choose2'),
  loading: Loading,
});

const Results = Loadable({
  loader: () => import('./views/Results'),
  loading: Loading,
});


const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/choose',  name: 'Choose',  component: Choose  },
  { path: '/allinfo', name: 'AllInfo', component: AllInfo },
  { path: '/choose2', name: 'Choose2', component: Choose2 },
  { path: '/results', name: 'Results', component: Results },
];

export default routes;
