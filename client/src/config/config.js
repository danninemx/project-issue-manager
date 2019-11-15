import React from 'react'
import Loadable from 'react-loadable'
import getMenuItems from './menuItems'
import LoadingComponent from 'rmw-shell/lib/components/LoadingComponent'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import grants from './grants'

const Loading = () => <LoadingComponent />

const LPAsync = Loadable({
  loader: () => import('../../src/pages/LandingPage'),
  loading: Loading
})

const config = {
  firebase_config: {
    apiKey: "AIzaSyCzm64_uz3vESpXIPdgcOeeSFouv-fT5Gw",
    authDomain: "project-issue-manager.firebaseapp.com",
    databaseURL: "https://project-issue-manager.firebaseio.com",
    projectId: "project-issue-manager",
    storageBucket: "project-issue-manager.appspot.com",
    messagingSenderId: "75473494710",
    appId: "1:75473494710:web:a8615765ade2042799bc17",
    measurementId: "G-M63C8B557N"
    // apiKey: 'AIzaSyBQAmNJ2DbRyw8PqdmNWlePYtMP0hUcjpY',
    // authDomain: 'react-most-wanted-3b1b2.firebaseapp.com',
    // databaseURL: 'https://react-most-wanted-3b1b2.firebaseio.com',
    // projectId: 'react-most-wanted-3b1b2',
    // storageBucket: 'react-most-wanted-3b1b2.appspot.com',
    // messagingSenderId: '258373383650',
    // appId: '1:258373383650:web:b49ad5dd28da999a'
  },
  firebase_config_dev: {

    // apiKey: "AIzaSyDMcQELOQmBOByvakmRURcrCPe0pxvYFpw",
    // authDomain: "project-issue-manager-dev.firebaseapp.com",
    // databaseURL: "https://project-issue-manager-dev.firebaseio.com",
    // projectId: "project-issue-manager-dev",
    // storageBucket: "project-issue-manager-dev.appspot.com",
    // messagingSenderId: "888306851451",
    // appId: "1:888306851451:web:864a986c54a1e298c30cde",
    // measurementId: "G-3Z248R31JP"
    apiKey: 'AIzaSyB31cMH9nJnERC1WCWA7lQHnY08voLs-Z0',
    authDomain: 'react-most-wanted-dev.firebaseapp.com',
    databaseURL: 'https://react-most-wanted-dev.firebaseio.com',
    projectId: 'react-most-wanted-dev',
    storageBucket: 'react-most-wanted-dev.appspot.com',
    messagingSenderId: '70650394824',
    appId: '1:70650394824:web:7cd3113c37741efc'
  },
  firebase_providers: ['google.com', 'facebook.com', 'twitter.com', 'github.com', 'password', 'phone'],
  initial_state: {
    themeSource: {
      isNightModeOn: true,
      source: 'light'
    },
    locale: 'en'
  },
  drawer_width: 256,
  locales,
  themes,
  grants,
  routes,
  getMenuItems,
  firebaseLoad: () => import('./firebase'),
  landingPage: LPAsync
}

export default config
