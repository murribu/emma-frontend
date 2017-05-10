## Cory Martin's Emma Project - Frontend
---

#### To run the project

1. $ ```git clone https://github.com/murribu/emma-frontend```
2. $ ```cd emma-frontend```
3. $ ```npm install```
4. $ ```npm start```
5. Visit / - and you should see the UI

#### Explanation of some npm packages
As you can see in [package.json](https://github.com/murribu/emma-frontend/package.json), I loaded the following npm packages:

1. [express](https://www.npmjs.com/package/express) - handles http requests
2. [request-promise](https://github.com/request/request-promise) - sends http requests from the backend process and handles the response with a promise
3. [body-parser](https://www.npmjs.com/package/body-parser) - facilitates handling an http request's parameters
4. [path](https://nodejs.org/docs/latest/api/path.html) - provides utilities for working with file and directory paths
5. [vue-loader](https://www.npmjs.com/package/vue-loader) - sets up a webpack-friendly environment for combining vue components into one file
6. [axios](https://www.npmjs.com/package/axios) - handles ajax-y requests from the client side
 