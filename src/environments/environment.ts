export const environment = {
  production: false,
  live: false, // production

  API_URL: '//devapi.xtrip.vn', // common
  API_GEN_URL: '//gen.xtrip.vn/qrcode', // qr code
  API_MEDIA_URL: '//devmedia.xtrip.vn', // media src
  API_PAY_URL: '//devpay.xtrip.vn', // payment
  API_STATIC_URL: '//devstatic.xtrip.vn', // static - support image
  CDN_ASSETS: '',

  // google login
  GOOGLE_TAG_MANAGER: 'GTM-P9ZXQF2',
  GOOGLE_CLIENT_ID: '934604773508-2ie2bjf8jqdhf6o6k3d3hi7ob1385juj.apps.googleusercontent.com',
  GOOGLE_SECRET_CLIENT_ID: '35E3s53D5QpMyYnLKO9MZju8',
  GOOGLE_ANALYTIC_ID: 'UA-125785023-1',

  //google maps api key
  GOOGLE_MAP_API_KEY: 'AIzaSyA1fT9mvay7ZQ9yc7GCECXX-EeTaXKiAv8',

  //Facebook login
  FACEBOOK_CLIENT_ID: '833156290223533', // xtrip',
  FACEBOOK_PIXEL_ID: '569040650239566',
  FACEBOOK_VMTRAVEL_CLIENT_ID: '202252777147981', // vietmaptravel

  APP_VERSION: '2.1.0',

  FIREBASE: {
    apiKey: 'AIzaSyBiqa4ktVPIlI-z1s1BWkB4dq1_svyYK4U',
    authDomain: 'xtraveldev.firebaseapp.com',
    databaseURL: 'https://xtraveldev.firebaseio.com',
    projectId: 'xtraveldev',
    storageBucket: 'xtraveldev.appspot.com',
    messagingSenderId: '1055915137065'
  },

  IOS_URL: 'xtrip://',
  IOS_STORE_ID: '1380598007',
  ANDROID_URL: 'xtripDev://',
  ANDROID_PACKAGE: 'com.xtrip.dev'
};
