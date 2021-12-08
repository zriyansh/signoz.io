---
id: nodejs
title: OpenTelemetry NodeJS Instrumentation
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<p align="center">

[![Book meeting](/img/docs/ZoomCTA.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>


**Requirements**

- Node.js version 12 or newer
- An app to add OpenTelemetry to

To install OpenTelemetry, we recommend [LightStep's handy OTel-Launcher](https://github.com/lightstep/otel-launcher-node), which simplifies the process.

### Sample Express Application

For this tutorial, we’re going to make a very, very simple application: an express service that responds to `http://localhost:9090/hello` with "Hello World". It’s as basic as it is original!

First, make a directory to contain your project, and install express:

```bash
npm i express
```

Once we have that, let’s get to coding. Make a file called `server.js` and serve up some hello world:

```bash
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
 res.status(200).send('Hello World');
});

app.listen(9090);
```

Boot up server by

```bash
node server.js
```

and check that it works by visiting `http://localhost:9090/hello`

Once you ensure that your app is running, you can stop the server using `Ctrl+C`.

### Setting up OpenTelemetry

Installing the OpenTelemetry Launcher package will also install OpenTelemetry, plus all currently available [instrumentation](https://github.com/open-telemetry/opentelemetry-js#plugins).

```bash
npm install lightstep-opentelemetry-launcher-node
```

Create a file called `server_init.js`. This will serve as your new entry point. You can copy and paste the below code.

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
  
<p>&nbsp;</p>

### Run Command

After you set up your files, you can start sending data with OpenTelemetry using the following command:

<!-- <Tabs
  defaultValue="self-hosted"
  groupId="hosting-options-node"
  values={[
    { label: "Self Hosted", value: "self-hosted" },
    { label: "Cloud", value: "cloud" },
  ]}
>
  <TabItem value="self-hosted"> -->

```bash
OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="http://<IP of SigNoz Backend>:55681/v1/trace" LS_SERVICE_NAME=<service name> node server_init.js
```
<br></br>
You will need to replace 'IP of SigNoz Backend' with the IP of the machine where you installed SigNoz. Replacing the placeholders in the above command for local host:

- `IP of SigNoz Backend`: localhost (since we are running SigNoz on our local host)

- `service name`: node_app (you can give whatever name that suits you)

```jsx
OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="http://localhost:55681/v1/trace" LS_SERVICE_NAME=node_app node server_init.js
```
<br></br>

:::note

- Remember to allow incoming requests to port **55681** of machine where SigNoz backend is hosted

:::
  
<p>&nbsp;</p>


<!-- </TabItem>
  <TabItem value="cloud">

```bash
OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="https://ingest.signoz.io:55681/v1/trace" LS_SERVICE_NAME=<App Name> LS_ACCESS_TOKEN=<access_token> node server_init.js
```
You will find the access token in your settings page as shown in below image

![access_token_settings_page](../../static/img/access_token_settings_page.png)

</TabItem>

</Tabs> -->

### Instrumentation of a sample NodeJs application

We have included a sample Express application with `README.md` at https://github.com/SigNoz/sample-nodejs-app.

Feel free to use this repo to test out OpenTelemetry instrumentation and how to send telemetry data to SigNoz.

### Troubleshooting your installation

Set an environment variable to run the OpenTelemetry launcher in debug mode, where it logs details about the configuration and emitted spans:

```bash
export OTEL_LOG_LEVEL=debug
```

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

_Running short applications (Lambda/Serverless/etc)_
If your application exits quickly after startup, you may need to explicitly shutdown the tracer to ensure that all spans are flushed:

```bash
opentelemetry.trace.getTracer('your_tracer_name').getActiveSpanProcessor().shutdown()
```

<p>&nbsp;</p>

