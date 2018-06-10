# SIAM618

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## NOTE
> edit file `node_modules/jszip/lib.readable-stream-browser.js`

```javascript

  module.exports = require("readable-stream");
  // instead of
  module.exports = require("stream");

```

# Documantation

```bash
sudo npm install -g @compodoc/compodoc
compodoc -p src/tsconfig.app.json -s
```

# Widgets

# Test

## Test Find & Fix vulnerabilities in your dependencies
```bash
sudo npm i snyk -g
cd your-project
snyk auth #use it once
snyk test
```

# Workarounds


 Copy the file in
 
 `ng-alerts.metadata.json`
 
 To
 
 `node_modules/@jaspero/ng-alerts`

```


# IMPORTANT
```javascript
// Clean  'src/assets' directory, and specialy
assets/demo/demo12/base/style.bundle.css
```
