import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.julesbousrez.shortnews',
  appName: 'ShortNews',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId:
        '347505037946-mve8cg6bdt2h05ljbfsq81pqf4bff4vh.apps.googleusercontent.com',
      iosClientId:
        '347505037946-rnb2g7b530h1lbn9jeh3ietoenp14401.apps.googleusercontent.com',
      serverClientId:
        '347505037946-mve8cg6bdt2h05ljbfsq81pqf4bff4vh.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
