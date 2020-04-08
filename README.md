# Marketplace UI

The Marketplace UI is web-based frontend for Marketplace Server, and requires an instance of the server to be launched.

## Developer Quick Start

This is an [Angular](https://angular.io) project using `ng` [@angular/cli](https://cli.angular.io/) as the build system, [SCSS](http://sass-lang.com) for CSS and [Bootstrap](http://getbootstrap.com/) for layout. `npm` is the package manager. Assuming you already have node installed via [`nvm`](https://github.com/nvm-sh/nvm) or similar, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. The following must be set:

	export MARKETPLACE_SERVER_URL=https://marketplace-server.logicahealth.org
	export MARKETPLACE_SERVER_WEBSOCKET_URL=wss://marketplace-server.logicahealth.org
	
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


# Building for Production

First, build:

	ng build # to build your local copy with any local changes

Then, assuming you've already familiar with [Docker](https://www.docker.com) awesomeness and have it installed, plop the build into a wicked-fast [nginx](http://nginx.org) web server container using the including Dockerfile with:

	docker build -t p3000/marketplace-ui:latest . # though you probably want your own repo and tag strings :)

## Production Deployment

Extremely easy in your existing Dockerized hosting environment by pointing it at your Marketplace Server installation. Just:

	docker run -d -p 9000:80 --restart unless-stopped -e "MARKETPLACE_SERVER_URL=http://localhost:3000" p3000/marketplace-ui:latest # or any official tag

And you're done. No environment variables or further configuration are needed. Jedi's may use your existing Kubernetes, Open Shift etc installations as you see fit. :)


# License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
