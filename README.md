# Sonovatetest

This project was generated with
[Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.
It uses [ng-bootstrap](https://ng-bootstrap.github.io/) to lay out the
UI.

## Development server

Run `npm start` for a dev server. Navigate to
`http://localhost:4900/`. The app will automatically reload if you
change any of the source files.  This will also build and run the
back-end server.

## Build

Run `ng build` to build the project. The build artifacts will be
stored in the `dist/` directory. Use the `-prod` flag for a production
build.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/).  Before running the
tests make sure you are serving the app via `npm start`.


## Back-end server

The back-end server is a WCF REST host, running on Mono.  It also
exposes a Swagger endpoint, using
[SwaggerWCF](https://github.com/abelsilva/swaggerwcf).

The System.ServiceModel.dll included in the server/assemblies/
directory is from Mono v5.0.1.1 with some bugs fixed (based on the fix
in https://bugzilla.xamarin.com/show_bug.cgi?id=25698 but extended to
other HTTP methods)

The WebHttpCors.dll included in the server/assemblies/ directory is
from Ido Flatow's blog entry "Cross-Origin Resource Sharing (CORS) and
WCF"
(http://blogs.microsoft.co.il/idof/2011/07/02/cross-origin-resource-sharing-cors-and-wcf/),
also with some fixes.

