export const environment = {
  production: true,
  live: false,

  API_URL: '//stagingapi.xtrip.vn', // common
  API_GEN_URL: '//gen.xtrip.vn/qrcode', // qr code
  API_MEDIA_URL: '//stagingmedia.xtrip.vn', // media src
  API_PAY_URL: '//stagingpay.xtrip.vn', // payment
  API_STATIC_URL: '//stagingstatic.xtrip.vn', // static - support image
  CDN_ASSETS: '',

  // google login
  GOOGLE_TAG_MANAGER: 'GTM-P9ZXQF2',
  GOOGLE_CLIENT_ID: '1064048350666-l3s92goiip5otvsu3v6obkik2eptqc65.apps.googleusercontent.com',
  GOOGLE_SECRET_CLIENT_ID: '6MHOt2vJc3QnmIEqOYbSl5LF',
  GOOGLE_ANALYTIC_ID: 'UA-125785023-1',

  //google maps api key
  GOOGLE_MAP_API_KEY: 'AIzaSyA1fT9mvay7ZQ9yc7GCECXX-EeTaXKiAv8',

  //Facebook login
  FACEBOOK_CLIENT_ID: '833156290223533', // xtrip
  FACEBOOK_PIXEL_ID: '147717922421751',
  FACEBOOK_VMTRAVEL_CLIENT_ID: '202252777147981', // vietmaptravel

  APP_VERSION: '2.1.0',

  FIREBASE: {
    apiKey: 'AIzaSyCjjwCUDsdLMwA_cv1MWfe_45klAkfd30A',
    authDomain: 'xtravel-a95cf.firebaseapp.com',
    databaseURL: 'https://xtravel-a95cf.firebaseio.com',
    projectId: 'xtravel-a95cf',
    storageBucket: 'xtravel-a95cf.appspot.com',
    messagingSenderId: '155973539888'
  },

  IOS_URL: 'xtrip://',
  IOS_STORE_ID: '1380598007',
  ANDROID_URL: 'xtripStaging://',
  ANDROID_PACKAGE: 'com.xtrip.staging1'
};
