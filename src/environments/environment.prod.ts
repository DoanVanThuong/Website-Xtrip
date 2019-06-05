export const environment = {
  production: true,
  live: true,

  API_URL: 'https://api.xtrip.vn', // common
  API_GEN_URL: 'https://gen.xtrip.vn/qrcode', // qr code
  API_MEDIA_URL: 'https://cdn.xtrip.vn/media', // media src
  API_PAY_URL: 'https://pay.xtrip.vn', // payment
  API_STATIC_URL: 'https://cdn.xtrip.vn/static', // static - support image
  CDN_ASSETS: '//cdn.xtrip.vn',

  // google login
  GOOGLE_TAG_MANAGER: 'GTM-MPD9HM7',
  GOOGLE_CLIENT_ID: '1064048350666-l3s92goiip5otvsu3v6obkik2eptqc65.apps.googleusercontent.com',
  GOOGLE_SECRET_CLIENT_ID: '6MHOt2vJc3QnmIEqOYbSl5LF',
  GOOGLE_ANALYTIC_ID: 'UA-127268925-1',

  //google maps api key
  GOOGLE_MAP_API_KEY: 'AIzaSyA1fT9mvay7ZQ9yc7GCECXX-EeTaXKiAv8',

  //Facebook login
  FACEBOOK_CLIENT_ID: '202252777147981', // xtrip
  FACEBOOK_PIXEL_ID: '147717922421751',
  FACEBOOK_VMTRAVEL_CLIENT_ID: '202252777147981', // vietmaptravel

  APP_VERSION: '2.1.0',

  FIREBASE: {
    apiKey: 'AIzaSyCmoE5PUwQJK_iPHEAEkry54E6Xr3t_KmM',
    authDomain: 'xtrip-platform.firebaseapp.com',
    databaseURL: 'https://xtrip-platform.firebaseio.com',
    projectId: 'xtrip-platform',
    storageBucket: 'xtrip-platform.appspot.com',
    messagingSenderId: '1064048350666'
  },

  IOS_URL: 'xtrip://',
  IOS_STORE_ID: '1380598007',
  ANDROID_URL: 'xtrip://',
  ANDROID_PACKAGE: 'com.xtrip.production'
};
