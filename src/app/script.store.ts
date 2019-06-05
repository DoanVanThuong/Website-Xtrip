import {environment} from '../environments/environment';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  {name: 'fbSdk', src: 'https://connect.facebook.net/en_US/sdk.js'},
  {name: 'Stripe', src: 'https://js.stripe.com/v3/'},
  {name: 'zaloSdk', src: 'https://sp.zalo.me/plugins/sdk.js'},
  {name: 'gAnalytic', src: `https://www.googletagmanager.com/gtag/js?id=${environment.GOOGLE_ANALYTIC_ID}`}
];
