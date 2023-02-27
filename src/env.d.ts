declare namespace NodeJS {
  export interface ProcessEnv {
    NG_APP_ENV: string;
    NODE_ENV: string;
    NG_APP_MODE: string;
    NG_APP_VERSION: string;
    NG_APP_API_URL: string;
    NG_APP_AZURE_TENANT_ID: string;
    NG_APP_AZURE_CLIENT_ID: string;
    NG_APP_AZURE_APPLICATION_ID: string;
    NG_APP_AZURE_SECRET: string;
    NG_APP_AZURE_REDIRECT_URI: string;
    appVersion: string;
    appPreviewDocsUrl: string;
    USERDATA_KEY: string;
  }
}

// declare var process: {
//   env: {
//     NG_APP_ENV: string;
//     NODE_ENV: string;
//     NG_APP_MODE: string;
//     NG_APP_VERSION: string;
//     NG_APP_API_URL: string;
//     NG_APP_AZURE_TENANT_ID: string;
//     NG_APP_AZURE_CLIENT_ID: string;
//     NG_APP_AZURE_APPLICATION_ID: string;
//     NG_APP_AZURE_SECRET: string;
//     NG_APP_AZURE_REDIRECT_URI: string;
//     appVersion: string;
//     appPreviewDocsUrl: string;
//     USERDATA_KEY: string;
//     // Replace the line below with your environment variable for better type checking
//     [key: string]: any;
//   };
// };
