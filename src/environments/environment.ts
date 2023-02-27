// se usa https://github.com/chihab/ngx-env y https://github.com/kentcdodds/cross-env para leer las variables

export const environment = {
  NG_APP_ENV: process.env.NG_APP_MODE,
  VERSION: process.env.NG_APP_VERSION,
  API_URL: process.env.NG_APP_API_URL,
  AZURE_TENANT_ID: process.env.NG_APP_AZURE_TENANT_ID,
  AZURE_CLIENT_ID: process.env.NG_APP_AZURE_CLIENT_ID,
  AZURE_APPLICATION_ID: process.env.NG_APP_AZURE_APPLICATION_ID,
  AZURE_SECRET: process.env.NG_APP_AZURE_SECRET,
  AZURE_REDIRECT_URI: process.env.NG_APP_AZURE_REDIRECT_URI,
  appVersion: 'v1.0.0',
  appPreviewDocsUrl: 'https://preview.keenthemes.com/metronic8/angular/docs',
  USERDATA_KEY: 'authf649fc9a5f55',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
