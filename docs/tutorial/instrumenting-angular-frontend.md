---
id: instrumenting-angular-frontend
title: Instrumenting Angular Frontend Web App
description: Instrument your angular frontend app.
---

### Why you need to instrument your frontend application 🤔

We all are familiar with instrumenting backend services but have you ever thought about instrumenting frontend application. Let us first understand why do we need to instrument frontend application and why reliability is a priority.

- Frontend is the first and last point of user's interaction.
- Unreliable frontend can block user's access to product inturn having direct business impact.
- Increasing devices and platforms unlocks new user genres hence unknown and multiple point of failures.
- To examine and analyze the reliability of a new feature served as an A/B experiment.
- It works in region X but not in region Y.
- RCA on the user's complete journey inside the application.

### Instrumenting angular app 🛠

#### Pre-requisites

Enable CORS in the OTel Receiver. Inside `docker/clickhouse-setup/otel-collector-config.yaml` add the following CORS config.

```yml
      http:
+        cors:
+          allowed_origins:
+            - https://netflix.com  # URL of your Frontend application
```

> Make sure to restart the container after making the config changes

Now let's get back to instrumenting our Angular Application. Let's start by installing couple of dependencies.

```sh
npm i @jufab/opentelemetry-angular-interceptor && npm i @opentelemetry/api @opentelemetry/sdk-trace-web @opentelemetry/sdk-trace-base @opentelemetry/core @opentelemetry/semantic-conventions @opentelemetry/resources @opentelemetry/exporter-trace-otlp-http @opentelemetry/exporter-zipkin @opentelemetry/propagator-b3 @opentelemetry/propagator-jaeger @opentelemetry/context-zone-peer-dep @opentelemetry/instrumentation @opentelemetry/instrumentation-document-load @opentelemetry/instrumentation-fetch @opentelemetry/instrumentation-xml-http-request @opentelemetry/propagator-aws-xray --save-dev
```

Not let's import OTel module in `app.module.ts`

```ts
import {
  OpenTelemetryInterceptorModule,
  OtelColExporterModule,
  CompositePropagatorModule,
} from '@jufab/opentelemetry-angular-interceptor';

@NgModule({
  ...
  imports: [
    ...
    OpenTelemetryInterceptorModule.forRoot({
      commonConfig: {
        console: true, // Display trace on console (only in DEV env)
        production: false, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
        serviceName: 'Angular Sample App', // Service name send in trace
      },
      otelcolConfig: {
        url: 'http://127.0.0.1:4318/v1/traces', // URL of opentelemetry collector
      },
    }),
    //Insert OtelCol exporter module
    OtelColExporterModule,
    //Insert propagator module
    CompositePropagatorModule,
  ],
  ...
})
```

This config would be enough to get you up and running. For more tweaks refer [this](https://github.com/jufab/opentelemetry-angular-interceptor#readme) detailed documentation of the instrumentation library.

**🎉 Congratulations you have successfully instrumented you application. **

<div align="center">
<iframe src="https://giphy.com/embed/fGCa0O9sogzEOTbBaP" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
<p>P.S. Issue triaging is now a piece of cake.</p>
</div>

### Stuck... 😖

Facing difficulties with instrumenting your application? Check out this video tutorial 👇

// TODO Video
