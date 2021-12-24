---
id: nodejs
title: OpenTelemetry NodeJS Instrumentation
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>


**Requirements**

- Node.js version 12 or newer
- An app to add OpenTelemetry to

To install OpenTelemetry, we recommend [LightStep's handy OTel-Launcher](https://github.com/lightstep/otel-launcher-node), which simplifies the process.

### Instrumenting a sample Express application

For this tutorial, we’re going to create a very simple application: an express service that responds at `http://localhost:9090/hello` with "Hello World".

First, let's create a sample Express application. If you don't want to create the app manually, you can clone it from its [GitHub repo](https://github.com/SigNoz/sample-nodejs-app). Steps to create a sample Express application:

1. **Make a directory, and install express:**<br></br>

   ```bash
   npm i express
   ```

2. **Create a file called `server.js`**<br></br>

   ```bash
   const express = require('express');

   const app = express();

   app.get('/hello', (req, res) => {
 res.status(200).send('Hello World');
});

  app.listen(9090);
   ```

3. **Boot up the server to check if the app is working**<br></br>

   ```bash
   node server.js
   ```

   You can check that the application is working fine by visiting [http://localhost:9090/hello](http://localhost:9090/hello)

4. **Stop the application**<br></br>

   You can stop the application using `Ctrl+C` on your terminal. We're doing this because we need to restart the application with OpenTelemetry.

### Instrumenting sample app with OpenTelemetry

1. **Install OpenTelemetry Launcher package**<br></br>

   In the same directory path at the terminal, install the OpenTelemetry launcher package with this command:

   ```bash
   npm install lightstep-opentelemetry-launcher-node
   ```

2. **Create a new entry point for your application**<br></br>

   Create a file called `server_init.js` and copy the following code in the file:

   ```bash
   const {
    lightstep,
    opentelemetry,
   } = require('lightstep-opentelemetry-launcher-node');

   const sdk = lightstep.configureOpenTelemetry();

   sdk.start().then(() => {
    require('./server');
   });

   function shutdown() {
    sdk.shutdown().then(
      () => console.log("SDK shut down successfully"),
      (err) => console.log("Error shutting down SDK", err),
    ).finally(() => process.exit(0))
   };

   process.on('exit', shutdown);
   process.on('SIGINT', shutdown);
   process.on('SIGTERM', shutdown);
   ```

   This servs as the new entry point for the sample application. It enables OpenTelemetry SDK to load before the application starts so that OpenTelemetry can apply available instrumentation.
  

3. **Final run command**<br></br>
   
   :::caution
   Run this command at your terminal after replacing the environment variables applicable for your setup.
   :::

   Now you need to run your application with some environment variables for OpenTelemetry. Environment variables that need to be configured:

   a. `IP of SigNoz backend` - IP of the machine where SigNoz is installed. In case you have installed SigNoz on your local machine, you can use `localhost`

   b. `service name` - the service you are monitoring (you can name it anything)

   You need to put these environment variables in the below command and run it at your terminal.
   ```bash
   OTEL_METRICS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="http://<IP of SigNoz Backend>:55681/v1/trace" \
   LS_SERVICE_NAME=<service name> \
   node server_init.js
   ```
   Note that this command is running your application with `node server_init.js` as this is the new entry point of your application.

   If you're running SigNoz on `localhost`, and want to name your service as `node_app`, the final command will be as follows:

   ```bash
   OTEL_METRICS_EXPORTER=none \
   OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="http://localhost:55681/v1/trace" \
   LS_SERVICE_NAME=node_app \
   node server_init.js
   ```
   <br></br>

   :::note
   - Remember to allow incoming requests to port **55681** of machine where SigNoz backend is hosted
   :::

   You can check your application running at [http://localhost:9090/hello](http://localhost:9090/hello). You need to generate some load in order to see data reported on SigNoz dashboard. Refresh the endpoint for 10-20 times, and wait for 2-3 mins. 
   
   You should see your service `node_app` in the list of applications monitored on SigNoz dashboard as shown below.

   ![nodejs-app-instrumentation](../../static/img/docs/nodejs_app_instrumentation.gif)



<!-- </TabItem>
  <TabItem value="cloud">

```bash
OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="https://ingest.signoz.io:55681/v1/trace" LS_SERVICE_NAME=<App Name> LS_ACCESS_TOKEN=<access_token> node server_init.js
```
You will find the access token in your settings page as shown in below image

![access_token_settings_page](../../static/img/access_token_settings_page.png)

</TabItem>

</Tabs> -->

<!-- ### Instrumentation of a sample NodeJs application

We have included a sample Express application with `README.md` at https://github.com/SigNoz/sample-nodejs-app.

Feel free to use this repo to test out OpenTelemetry instrumentation and how to send telemetry data to SigNoz. -->

### Troubleshooting your installation

Set an environment variable to run the OpenTelemetry launcher in debug mode, where it logs details about the configuration and emitted spans:

```bash
export OTEL_LOG_LEVEL=debug
```

<br></br>

The output may be very verbose with some benign errors. Early in the console output, look for logs about the configuration. Next, look for lines like the ones below, which are emitted when spans are emitted to SigNoz.

```bash
{
  "traceId": "985b66d592a1299f7d12ebca56ca1fe3",
  "parentId": "8d62a70aa335a227",
  "name": "bar",
  "id": "17ada85c3d55376a",
  "kind": 0,
  "timestamp": 1685674607399000,
  "duration": 299,
  "attributes": {},
  "status": { "code": 0 },
  "events": []
}
{
  "traceId": "985b66d592a1299f7d12ebca56ca1fe3",
  "name": "foo",
  "id": "8d62a70aa335a227",
  "kind": 0,
  "timestamp": 1585130342183948,
  "duration": 315,
  "attributes": {
    "name": "value"
  },
  "status": { "code": 0 },
  "events": [
    {
      "name": "event in foo",
      "time": [1585130342, 184213041]
    }
  ]
}
```

<br></br>

_Running short applications (Lambda/Serverless/etc)_
If your application exits quickly after startup, you may need to explicitly shutdown the tracer to ensure that all spans are flushed:

```bash
opentelemetry.trace.getTracer('your_tracer_name').getActiveSpanProcessor().shutdown()
```

<p>&nbsp;</p>

