---
id: swift
title: Swift Opentelemetry Instrumentation
description: Send events from your Swift application to SigNoz

---
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'

This documentation contains instructions on how to set up OpenTelemetry(OTel) instrumentation in your Swift application. OpenTelemetry, also known as OTel for short, is an open-source observability framework that can help you generate and collect telemetry data - traces, metrics, and logs from your Swift application.

Once the telemetry data is generated, you can configure an exporter to send the data to SigNoz for monitoring and visualization.

There are three major steps to using OpenTelemetry:

- Instrumenting your Swift application with OpenTelemetry
- Configuring the exporter to send data to SigNoz
- Validating the configuration to ensure that data is being sent as expected.

In this tutorial, we will instrument a Swift application for traces and send it to SigNoz.

## Requirements

[Swift](https://www.swift.org/getting-started/#installing-swift)

## Send traces to SigNoz Cloud
Based on your application environment, you can choose the setup below to send traces to SigNoz Cloud.

<Tabs>
<TabItem value="VM" label="VM" default>
From VMs, there are two ways to send data to SigNoz Cloud.

- [Send traces directly to SigNoz Cloud](#send-traces-directly-to-signoz-cloud)
- [Send traces via OTel Collector binary](#send-traces-via-otel-collector-binary) (recommended)

### Send traces directly to SigNoz cloud

Here we will be sending traces to SigNoz cloud in 4 easy steps, if you want to send traces to self hosted SigNoz , you can refer to [this](https://signoz.io/docs/instrumentation/swift/#send-traces-to-self-hosted-signoz). 

:::info
If you are using the [sample swift application](https://github.com/SigNoz/OpenTelemetry-swift-example/), then you just need to update the ingestion key and SigNoz endpoint after that you are good to go!
:::

**Step 1 : Instrument your application with OpenTelemetry**

To configure our Swift application to send data you need to initialize OpenTelemetry, You have to add this dependency in `Package.swift` file of your project or if you are using XCode then you can add this [dependency](https://github.com/open-telemetry/opentelemetry-swift), and after adding it there, you need to import these  in main file.

```
import Foundation
import GRPC
import NIO
import NIOSSL
import OpenTelemetryApi
import OpenTelemetryProtocolExporterCommon
import OpenTelemetryProtocolExporterGrpc
import OpenTelemetrySdk
import ResourceExtension
import SignPostIntegration
import StdoutExporter
import ZipkinExporter
```

**Step 2: Initialize the tracer**

Add these statements to initialize tracer in the `main.swift` file inside the main function or you can create another function for initializing the tracer and call it in some other block of code.

```swift
var resources = DefaultResources().get()

let instrumentationScopeName = "SwiftExample"
let instrumentationScopeVersion = "semver:0.1.0"

let otlpConfiguration: OtlpConfiguration = OtlpConfiguration(timeout: TimeInterval(10), headers: [("signoz-access-token", <SIGNOZ_INGESTION_KEY>)])

let grpcChannel = ClientConnection.usingPlatformAppropriateTLS(for: MultiThreadedEventLoopGroup(numberOfThreads:1)).connect(host: <SIGNOZ_INGESTION_URL>, port: 443)

let otlpTraceExporter = OtlpTraceExporter(channel: grpcChannel,
                                      config: otlpConfiguration)
let stdoutExporter = StdoutExporter()

let spanExporter = MultiSpanExporter(spanExporters: [otlpTraceExporter, stdoutExporter])

let spanProcessor = SimpleSpanProcessor(spanExporter: spanExporter)
OpenTelemetry.registerTracerProvider(tracerProvider:
    TracerProviderBuilder()
        .add(spanProcessor: spanProcessor)
        .build()
)
```

You need to replace SIGNOZ_INGESTION_KEY and SIGNOZ_INGESTION_URL with the actual ingestion key and url.

**Step 3: Send Telemetry data to SigNoz**

Now for sending the telemetry data to SigNoz, you can create a function to add span and data

```swift
func doWork() {
    let childSpan = tracer.spanBuilder(spanName: "doWork").setSpanKind(spanKind: .client).startSpan()
    childSpan.setAttribute(key: sampleKey, value: sampleValue)
    Thread.sleep(forTimeInterval: Double.random(in: 0 ..< 10) / 100)
    childSpan.end()
}
```

and if you call this doWork function it will add a trace with span name `doWork` and and attributes with key value pair.

This function can be modified as per your needs.


**Step 4: Run app**

Run your app using the below command to send your traces:

```
swift run
```

### Send traces via OTel Collector binary

**Step 1 : Install OTel Collector**
OTel Collector binary helps to collect logs, hostmetrics, resource and infra attributes. It is recommended to install Otel Collector binary to collect and send traces to SigNoz cloud. You can correlate signals and have rich contextual data through this way.

:::note
You can find instructions to install OTel Collector binary [here](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/) in your VM. Once you are done setting up your OTel Collector binary, you can follow the below steps for instrumenting your Swift application.
:::

**Step 2 : Instrument your application with OpenTelemetry**

To configure our Swift application to send data you need to initialize OpenTelemetry, You have to add this dependency in `Package.swift` file of your project or if you are using XCode then you can add this [dependency](https://github.com/open-telemetry/opentelemetry-swift), and after adding it there, you need to import these  in main file.

```
import Foundation
import GRPC
import NIO
import NIOSSL
import OpenTelemetryApi
import OpenTelemetryProtocolExporterCommon
import OpenTelemetryProtocolExporterGrpc
import OpenTelemetrySdk
import ResourceExtension
import SignPostIntegration
import StdoutExporter
import ZipkinExporter
```

**Step 3: Initialize the tracer**

Add these statements to initialize tracer in the `main.swift` file inside the main function or you can create another function for initializing the tracer and call it in some other block of code.

```swift
var resources = DefaultResources().get()

let instrumentationScopeName = "SwiftExample"
let instrumentationScopeVersion = "semver:0.1.0"

let otlpConfiguration: OtlpConfiguration = OtlpConfiguration(timeout: TimeInterval(10))

let grpcChannel = ClientConnection.usingPlatformAppropriateTLS(for: MultiThreadedEventLoopGroup(numberOfThreads:1)).connect(host: <OtelCollector_URL>, port: 443)

let otlpTraceExporter = OtlpTraceExporter(channel: grpcChannel,
                                      config: otlpConfiguration)
let stdoutExporter = StdoutExporter()

let spanExporter = MultiSpanExporter(spanExporters: [otlpTraceExporter, stdoutExporter])

let spanProcessor = SimpleSpanProcessor(spanExporter: spanExporter)
OpenTelemetry.registerTracerProvider(tracerProvider:
    TracerProviderBuilder()
        .add(spanProcessor: spanProcessor)
        .build()
)
```

You need to replace OtelCollector_URL with the endpoint where Otel Collector is running.

**Step 4: Send Telemetry data to SigNoz**

Now for sending the Otel data to SigNoz via Otel Collector, you can create a function to add span and data

```swift
func doWork() {
    let childSpan = tracer.spanBuilder(spanName: "doWork").setSpanKind(spanKind: .client).startSpan()
    childSpan.setAttribute(key: sampleKey, value: sampleValue)
    Thread.sleep(forTimeInterval: Double.random(in: 0 ..< 10) / 100)
    childSpan.end()
}
```

and if you call this doWork function it will add a trace with span name `doWork` and and attributes with key value pair.

This function can be modified as per your needs.


**Step 5: Run app**

Run your app using the below command to send your traces:

```
swift run
```

</TabItem>
<TabItem value="orange" label="Kubernetes">

**Step 1 : Install OTel Collector agent in K8s**

For Swift application deployed on Kubernetes, you need to install OTel Collector agent in your k8s infra to collect and send traces to SigNoz Cloud. You can find the instructions to install OTel Collector agent [here](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/).


**Step 2 : Instrument your application with OpenTelemetry**

If you don't have a Swift application you can use our [sample Swift application](https://github.com/SigNoz/OpenTelemetry-swift-example/),To configure our Swift application to send data you need to initialize OpenTelemetry, You have to add this dependency in `Package.swift` file of your project or if you are using XCode then you can add this [dependency](https://github.com/open-telemetry/opentelemetry-swift), and after adding it there, you need to import these  in main file.

```
import Foundation
import GRPC
import NIO
import NIOSSL
import OpenTelemetryApi
import OpenTelemetryProtocolExporterCommon
import OpenTelemetryProtocolExporterGrpc
import OpenTelemetrySdk
import ResourceExtension
import SignPostIntegration
import StdoutExporter
import ZipkinExporter
```

**Step 3: Initialize the tracer**

Now you need to initialize the tracer using this


```swift
var resources = DefaultResources().get()

let instrumentationScopeName = "SwiftExample"
let instrumentationScopeVersion = "semver:0.1.0"

let otlpConfiguration: OtlpConfiguration = OtlpConfiguration(timeout: TimeInterval(10))

let grpcChannel = ClientConnection.usingPlatformAppropriateTLS(for: MultiThreadedEventLoopGroup(numberOfThreads:1)).connect(host: <OTEL_EXPORTER_OTLP_ENDPOINT>, port: 4317)

let otlpTraceExporter = OtlpTraceExporter(channel: grpcChannel,
                                      config: otlpConfiguration)
let stdoutExporter = StdoutExporter()

let spanExporter = MultiSpanExporter(spanExporters: [otlpTraceExporter, stdoutExporter])

let spanProcessor = SimpleSpanProcessor(spanExporter: spanExporter)
OpenTelemetry.registerTracerProvider(tracerProvider:
    TracerProviderBuilder()
        .add(spanProcessor: spanProcessor)
        .build()
)
```

**Step 4: Add the OpenTelemetry instrumentation for your Swift app**

Now for sending the Otel data to SigNoz via Otel Collector, you can create a function to add span and data

```swift
func doWork() {
    let childSpan = tracer.spanBuilder(spanName: "doWork").setSpanKind(spanKind: .client).startSpan()
    childSpan.setAttribute(key: sampleKey, value: sampleValue)
    Thread.sleep(forTimeInterval: Double.random(in: 0 ..< 10) / 100)
    childSpan.end()
}
```

If you call this `doWork` function, it will add a trace with span name **doWork** and attributes with key-value pair.

**Step 5: Set environment variables and run app**


| Variable                        | Description                                                                                                                                                                 |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OTEL_EXPORTER_OTLP_ENDPOINT     | This is the endpoint of your OTel Collector via which you will send traces, as you have already installed it the default endpoint is `http://localhost:4317` |

</TabItem>
</Tabs>

## Send Traces to Self-Hosted SigNoz

**Step 1 : Instrument your application with OpenTelemetry**

To configure our Swift application to send data you need to initialize OpenTelemetry, You have to add this dependency in `Package.swift` file of your project or if you are using XCode then you can add this [dependency](https://github.com/open-telemetry/opentelemetry-swift), and after adding it there, you need to import these  in main file.

```
import Foundation
import GRPC
import NIO
import NIOSSL
import OpenTelemetryApi
import OpenTelemetryProtocolExporterCommon
import OpenTelemetryProtocolExporterGrpc
import OpenTelemetrySdk
import ResourceExtension
import SignPostIntegration
import StdoutExporter
import ZipkinExporter
```

**Step 2: Initialize the tracer**

Add these statements to initialize tracer in the `main.swift` file inside the main function or you can create another function for initializing the tracer and call it in some other block of code.

```swift
var resources = DefaultResources().get()

let instrumentationScopeName = "SwiftExample"
let instrumentationScopeVersion = "semver:0.1.0"

let otlpConfiguration: OtlpConfiguration = OtlpConfiguration(timeout: TimeInterval(10))

let grpcChannel = ClientConnection.usingPlatformAppropriateTLS(for: MultiThreadedEventLoopGroup(numberOfThreads:1)).connect(host: <OtelCollector_URL>, port: 443)

let otlpTraceExporter = OtlpTraceExporter(channel: grpcChannel,
                                      config: otlpConfiguration)
let stdoutExporter = StdoutExporter()

let spanExporter = MultiSpanExporter(spanExporters: [otlpTraceExporter, stdoutExporter])

let spanProcessor = SimpleSpanProcessor(spanExporter: spanExporter)
OpenTelemetry.registerTracerProvider(tracerProvider:
    TracerProviderBuilder()
        .add(spanProcessor: spanProcessor)
        .build()
)
```

You need to replace OtelCollector_URL with the actual url.

**Step 3: Send Telemetry data to SigNoz**

Now for sending the Otel data to SigNoz via Otel Collector, you can create a function to add span and data

```swift
func doWork() {
    let childSpan = tracer.spanBuilder(spanName: "doWork").setSpanKind(spanKind: .client).startSpan()
    childSpan.setAttribute(key: sampleKey, value: sampleValue)
    Thread.sleep(forTimeInterval: Double.random(in: 0 ..< 10) / 100)
    childSpan.end()
}
```

and if you call this doWork function it will add a trace with span name `doWork` and and attributes with key value pair.

This function can be modified as per your needs.

**Step 4: Run app**

Run your app using the below command to send your traces:

```
swift run
```

## Sample Swift Application

We have included a sample Swift application at [Sample swift App Github Repo](https://github.com/SigNoz/OpenTelemetry-swift-example/), 

<InstrumentationFAQ />