# AppInformesFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

## pre requisites
`node 16.18.1`
`npm install --legacy-peer-deps`
se usa https://github.com/chihab/ngx-env y https://github.com/kentcdodds/cross-env para leer las variables

En el archivo package.json y los archivos .env .env.local .env.development .env.production

<pre>
    "start": "cross-env NODE_ENV=development ng serve --configuration development",
    "build": "cross-env NODE_ENV=producction ng build --configuration production",
</pre>

La variable `NG_APP_ENV` de la libreria ngx-env se hereda de `NODE_ENV` por ello importante declararlo antes que las otras variables

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
