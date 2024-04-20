# Getting Started with SPA Web application(table)

This document provides instructions on how to set up and run SPA Web Application. Follow these steps to get your environment ready and launch the application.

## 1. Sandbox Setup

### Create Project
``` #bash
# Create Project
projectPath=/d/WISeAgent/wrk/github/spa_table
mkdir ${projectPath}
cd ${projectPath}

# Initialize Node.js Project
npm init -y

# Install Necessary Packages
npm install express
npm install body-parser
npm install nodemon --save-dev

npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin css-loader style-loader
mkdir client/src
mkdir server
```
### Setup Webpack (Optional)
Create a webpack.config.js file in the root of your project directory
```
const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development', // 'production' for production builds
};
```


## 2. Running the Application

### Development Environment
To run the application in development mode with Nodemon, which will automatically restart your server on file changes, add the following script to your package.json:

```#bash
"scripts": {
  "start": "nodemon ./server/index.js"
}
```
Then start your server:
``` #bash
# Start the server
node server/index.js

# Run the Webpack development server for the client
npm client/start
nodemon ./server/index.js
# update package.json to add --> "start": "nodemon ./server/index.js"
npm start
```
### Building and Publishing
If using Webpack, add a build script to your package.json:

``` #json
"scripts": {
  "build": "webpack --mode production"
}
```

Run this command to build your application:
``` #bash
Copy code
npm run build
```

### Deployment
Deploy your built application to your production server. This step will vary depending on your hosting provider.

## 3. REST API and Usage

### List All Entries
``` #bash
Copy code
curl http://localhost:3000/api/entries
```

### Add a New Entry
``` #bash
Copy code
curl -X POST http://localhost:3000/api/entries \
-H "Content-Type: application/json" \
-d '{"name": "Alice Smith", "age": 28, "email": "alice@example.com"}'
```

###Remove an Entry
``` #bash
Copy code
curl -X DELETE http://localhost:3000/api/entries/1
```

### Get Current Verbose Level
``` #bash
Copy code
curl http://localhost:3000/api/verbose
```

### Set Verbose Level
``` #bash
Copy code
curl -X POST http://localhost:3000/api/verbose \
-H "Content-Type: application/json" \
-d '{"level": "debug"}'
```

Replace localhost:3000 with your actual server address if deployed to a remote server.

## References
