# tubity-ui

**tubity-ui** is a front-end for the [tubity-roda](https://github.com/ababich/tubity-roda) URL shortening service.

## Installation

*[**NodeJS**](https://nodejs.org/) and its **npm** package manager are both assumed to be installed prior execution of the following instructions.*

1. Checkout
2. `cd` into the `bin` directory and run `node install` command
3. run `./webpack` command when you will need to rebuild an application

Built application is shipped with this repository and is located in the `app/app.js` file. Every new build that's made via abovementioned `./webpack` command will overwrite that `app/app.js` file. The `app` directory itself may be linked as a root directory into a configuration of your Apache, nginx or whatever server you do prefer.

## Configuration

In order to eliminate the need for rebuilding each time when backend server host was changed it was made a part of the `app/index.html` file (check for `APP.CONF` object out there).
