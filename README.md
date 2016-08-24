# tubity-ui

**tubity-ui** is a front-end for the
[tubity-roda](https://github.com/ababich/tubity-roda) URL shortening service.

## Prerequisites

_[**NodeJS**](https://nodejs.org/) and its **npm** package manager are both
assumed to be installed prior execution of the following instructions._

1. Checkout
2. `cd` into the `bin` directory and run `node install` command
3. run `./webpack` command when you will need to rebuild an application

## Installation

Built application is shipped with this repository and is located in the
`app/app.js` file. Every new build that's made via abovementioned `./webpack`
command will overwrite application code in the `app/app.js`.

**You have two options of running built application.**

1) The recommended way is to specify the `app` directory as a root directory in
the configuration of your Apache, nginx or whatever server you are running.

2) For those who by any reason can't run the application under a real webserver,
a local NodeJS-based solution is provided. Just execute `cd bin` and then run
`node tubity-ui-server`, optionally you may pass a port number the server will
be listening on (`3000` by default), e.g. .`node tubity-ui-server 3456` As soon
as you've lauched **tubity-ui-server** locally on your machine you may open
**http://localhost:3000/** in your browser (replace 3000 with your port number
if any was passed as an argument during server startup).

## Configuration

In order to eliminate the need for rebuilding each time when backend server host
was changed it was made a part of the `app/index.html`

You'll have to update a value of the APP.CONF.api_host variable in the
`app/index.html` file if you're running tubity backend on port:host which differ
from those by default `localhost:9990`

## Release Notes

- Client-side URL validation was ommited intentionally since documentation
doesn't mention how intelligent the backend is and whether it's able to process
schemeless URL etc.    
