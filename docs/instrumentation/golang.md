---
id: golang
title: OpenTelemetry Go Instrumentation
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";


To install OpenTelemetry, we recommend handy [OTel-Launcher](https://github.com/lightstep/otel-launcher-go), which simplifies the process.
```bash
go get "github.com/lightstep/otel-launcher-go/launcher"
```
Once you've downloaded the launcher, you can run OpenTelemetry using the following basic configuration.

The full list of configuration options can be found in the [README](https://github.com/lightstep/otel-launcher-go).

### Run Command

<Tabs
  defaultValue="self-hosted"
  groupId="hosting-options"
  values={[
    { label: "Self Hosted", value: "self-hosted" },
    { label: "Cloud", value: "cloud" },
  ]}
>
<TabItem value="self-hosted">

```bash
    // main.go
    package main

    import "github.com/lightstep/otel-launcher-go/launcher"

    func main() {
    otelLauncher := launcher.ConfigureOpentelemetry(
        launcher.WithServiceName("service-123"),
        launcher.WithSpanExporterEndpoint("<IP of SigNoz Backend>:4317>")
        launcher.WithSpanExporterInsecure("true")
        launcher.WithMetricExporterEndpoint("<IP of SigNoz Backend>:4317>")
        launcher.WithMetricExporterInsecure("true")
    )
    defer otelLauncher.Shutdown()
    }
```
</TabItem>
<TabItem value="cloud">

```bash
    // main.go
    package main

    import "github.com/lightstep/otel-launcher-go/launcher"

    func main() {
    otelLauncher := launcher.ConfigureOpentelemetry(
        launcher.WithServiceName("service-123"),
        launcher.WithAccessToken("<access_token>"),
        launcher.WithSpanExporterEndpoint("ingest.signoz.io:443")
        launcher.WithMetricExporterEndpoint("ingest.signoz.io:443")
    )
    defer otelLauncher.Shutdown()
    }
``` 

*<access_token>* can be found in your settings page as shown in below image

![access_token_settings_page](../../static/img/access_token_settings_page.png)
</TabItem>
</Tabs>

#### Validate installation by checking for traces
With your application running, you can now verify that you’ve installed OpenTelemetry correctly by confirming that telemetry data is being reported to your observability backend.

To do this, you need to make sure that your application is actually generating data. Applications will generally not produce traces unless they are being interacted with, and opentelemetry will often buffer data before sending it. So it may take some amount of time and interaction before your application data begins to appear in your backend.


#### Library and framework support
Besides OpenTelemetry core modules, it is important to install instrumentation packages for every important library and framework which your service depends upon. Beyond the critical telemetry data these components emit, library and framework integrations are often required to ensure that the trace context is properly propagated.

OpenTelemetry automatically provides instrumentation for a large number of libraries and frameworks, right out of the box.

The full list of supported instrumentation can be found in the [README](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/master/instrumentation).

Don’t see support for a framework or library you use? Join the beta by [filing an issue](https://github.com/open-telemetry/opentelemetry-go-contrib/issues), or try your hand at writing an instrumentation adapter yourself!

OpenTracing support in Go
The OpenTracing shim allows existing OpenTracing instrumentation to report to the OpenTelemetry SDK. OpenTracing support is not enabled by default. Instructions for enabling the shim can be found in the README.

Go OpenTracing shim
Read more about upgrading to OpenTelemetry in our OpenTracing Migration Guide.