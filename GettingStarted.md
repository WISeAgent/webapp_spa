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

## 2. OTel SDK instrumentation

The OpenTelemetry (OTel) SDK for Node.js is a comprehensive suite that includes a variety of packages for both manual and automatic instrumentation. Here’s a breakdown of the essential packages:

### Manual Instrumentation Essentials

- @opentelemetry/sdk-node: This is the core package that provides the full OpenTelemetry SDK for Node.js, including tracing and metrics.
- @opentelemetry/api: The API package is necessary for manual instrumentation, allowing you to create and manage traces and metrics.
- Additional instrumentation packages: Depending on the libraries you use, you may need to install specific instrumentation packages. For example, if you’re using Express, you would install @opentelemetry/instrumentation-express.

### Automatic Instrumentation Essentials

- @opentelemetry/auto-instrumentations-node: This package includes auto-instrumentation for supported libraries and frameworks, enabling telemetry capture without code changes.
- Exporters: Depending on where you want to send your telemetry data, you’ll need to install appropriate exporters, such as @opentelemetry/exporter-jaeger for tracing or @opentelemetry/exporter-prometheus for metrics.

For both manual and automatic instrumentation, you’ll also need to install any exporters you plan to use to send your telemetry data to the backend of your choice.

__NB__ the exact number of packages can vary as the project evolves, but the ones mentioned above are essential for getting started with instrumentation in a Node.js application.

### Create OTelSDK Directory
Create a directory for OTel SDK and instrumentation files

``` #bash
mkdir OTelSDK
cd OTelSDK
```

### Manual Instrumentation

Create a file for manual instrumentation. TODO: Add sample code for manual instrumentation in manual_instrumentation.js.
``` #bash
npm install --save-dev @opentelemetry/auto-instrumentations-node @opentelemetry/api @opentelemetry/instrumentation-express
npm install --save-dev @opentelemetry/sdk-trace-node @opentelemetry/tracing @opentelemetry/exporters-console
npm install --save-dev @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/sdk-trace-node

touch manual_instrumentation.js
```

### Automatic Instrumentation
Create a file for automatic instrumentation:
``` #bash
npm install --save-dev @opentelemetry/auto-instrumentations-node @opentelemetry/sdk-trace-node @opentelemetry/tracing 
@opentelemetry/exporters-console
npm install --save-dev @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node
touch automatic_instrumentation.js
```

## 3. Running the Application

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

## 4. REST API and Usage

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
curl http://localhost:3000/api/verbose
```

### Set Verbose Level
``` #bash
curl -X POST http://localhost:3000/api/verbose \
-H "Content-Type: application/json" \
-d '{"level": "debug"}'
```

Replace localhost:3000 with your actual server address if deployed to a remote server.

### 5. Running Application and Instrumentation

``` #bash
npm start
node --require ./OTelSDK/manual_instrumentation.js ./server/index.js  > manual_output.txt
node --require ./OTelSDK/automatic_instrumentation.js ./server/index.js > automatic_output.txt
```
## References
https://aws-otel.github.io/docs/getting-started/javascript-sdk
