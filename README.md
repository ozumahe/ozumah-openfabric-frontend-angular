# INSTRUCTIONS to Deploying Angular app to Heroku

- ## Configuring Angular App

  - ### Step 1: ` Ensure you have the latest version of angular CLI and angular compiler cli`
  - ### Step 2: ` Copy below dependencies from devDependencies to dependencies`

  ```
   "@angular/cli": "^11.0.2",

    "@angular/compiler-cli": "^10.0.14",

    "typescript": "~3.9.5"
  ```

  - ### Step 3: `Create heroku-postbuild script in package.json. Under “scripts”, add a “heroku-postbuild” command as seen below`

  ```
  "heroku-postbuild": "ng build --prod"
  ```

  - ### Step 4: `Add Node and NPM version on the package.json engines`

  ```
  "engines": {
    "node": "12.18.2",
    "npm": "6.14.5"
  }
  ```

  - ### Step 5: `Install Server to run your app`

  ```
  npm install express path --save
  ```

  - ### Step 6: `Create a main.js file in the root of the application and paste the following code.`

  ```
  //Install express server
  const express = require('express');
  const path = require('path');


    const app = express();

    // Serve only the static files form the dist directory
    app.use(express.static('./dist/angular-app-heroku'));

    app.get('/\*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-app-heroku/'}),
    );

    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);
  ```

  - ### Step 7: `Change start command In package.json, change the “start” command to node server.js so it becomes`

  ```
  "start": "node main.js"
  ```

- ## Host source code of Angular App on GitHub
- ## Login to Heroku and create a new app in Heroku
- ## Connecting GitHub repository to Heroku app
