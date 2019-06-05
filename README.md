## Development server
	- Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
	- Delete node_module + package-lock.json (if existing).
	- Run `npm i -g webpack` to install a module bundler.
	- Run `npm i -g webpack-dev-server` to install library that using the webpack with a development server that provides live reloading.
	- Run `npm install` to install needed libraries.
	- Build:
		+ Run `npm run build:ssr:dev` to build the project in development mode. Using for Developer.
		+ Run `npm run build:ssr:stag` to build the project in testing mode. Using for Tester.
	- The build artifacts will be stored in the `dist/` directory. Please, copy dist folder to your hosting folder on server.
	- After that, Open file server.js and Find line have code: `var PORT = process.env.PORT || 5000;`
		+ Rename 5000 if Development mode.
		+ Rename 5001 if Staging mode.
	- Drap and drop every thing into Hosting Server
	- Restart server with command line:
		+ `pm2 restart dev` for development mode.
		+ `pm2 restart stag` for staging mode.

## Running unit tests
	- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
	- Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
	- Before running the tests make sure you are serving the app via `ng serve`.
