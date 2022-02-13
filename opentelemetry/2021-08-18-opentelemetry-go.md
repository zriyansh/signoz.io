---
title: Monitor your Go application with OpenTelemetry and SigNoz
slug: go
date: 2021-08-18
tags: [go-monitoring]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: In this article, learn how to setup application monitoring for Go applications with OpenTelemetry and SigNoz.
image: /img/blog/2021/08/opentelemetry_go_cover-min.png
keywords:
  - opentelemetry
  - opentelemetry golang
  - opentelemetry go
  - distributed tracing
  - observability
  - golang application monitoring
  - golang instrumentation
  - signoz
---

<head>
  <link rel="canonical" href="https://signoz.io/opentelemetry/go/"/>
</head>

OpenTelemetry provides a set of APIs to directly measure the performance and behavior of your software and send this data to observability platforms. Let's learn how to get started with OpenTelemetry for Go applications and visualize that data with SigNoz.

<!--truncate-->

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Monitor your Go applications with SigNoz"
  height={500}
  src="/img/blog/2021/08/opentelemetry_go_cover-min.png"
  width={700}
/>

OpenTelemetry is a vendor-agnostic instrumentation library. In this article, let's explore how you can instrument your Go application with OpenTelemetry and get the data reported through SigNoz - an open-source APM and observability tool.

Steps to get started with OpenTelemetry for Go application

- Installing SigNoz
- Installing sample Go application
- Instrumentation with OpenTelemetry and sending data to SigNoz

## Installing SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=opentelemetry_go)

When you are done installing SigNoz, you can access the UI at: http://localhost:3301

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

<Screenshot
  alt="SigNoz dashboard"
  height={500}
  src="/img/blog/common/signoz_dashboard_homepage.png"
  title="SigNoz dashboard"
  width={700}
/>

## Installing sample Go application

To see how OpenTelemetry can be used to instrument a Go application, let's see how it works with a sample bookstore app ([GitHub repo](https://github.com/SigNoz/sample-golang-app)).

It is a simple bookstore app with a REST API that provides book data and performs CRUD operations. The app uses Gin framework to build a RESTful API. Gin is a high-performance HTTP web framework written in Golang containing a set of commonly used functionalities like routing, middleware support and rendering.

OpenTelemetry has specific instrumentation packages to support popular Go packages and use cases.  For example, this app uses the Gin framework for request routing. OpenTelemetry provides instrumentation package named **otelgin** to instrument the Gin framework which you need to import in your app. You can find the complete list of supported Golang packages [here](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation).

**Prerequisites**
Verify if you have Golang installed on your machine by running `$ go version` on your terminal. If you don't have Golang installed, you can download it [here](https://golang.org/doc/install).

**Steps to install sample Go application:**

1. **Clone sample Go application repository**<br></br>
   From your terminal use the following command to clone sample Go application GitHub repository.
   ```
   git clone https://github.com/SigNoz/sample-golang-app.git
   ```
2. **Update path to sample-golang-app**<br></br>
   Update your terminal path to the sample app directory

   ```
   cd sample-golang-app
   ```


## Instrumentation with OpenTelemetry and sending data to SigNoz

The file `main.go` has instructions to import all the necessary OpenTelemetry packages in order to instrument the sample app. For this app, we import the following OpenTelemetry packages.

```
import (
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp"
	"go.opentelemetry.io/otel/exporters/otlp/otlpgrpc"
	"go.opentelemetry.io/otel/label"

	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
)
```

<br></br>You need to run the Go app with the necessary environment variables in order to start sending data to SigNoz. Use the following command to run and configure the app to send data to SigNoz:<br></br>

```
SERVICE_NAME=goApp INSECURE_MODE=true OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT=<IP of SigNoz backend>:4317 go run main.go
```

`Ip of SigNoz` can be replaced with localhost in this case. Hence, the final command becomes:

```
SERVICE_NAME=goApp INSECURE_MODE=true OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT=localhost:4317 go run main.go
```

<br></br>And, congratulations! You have instrumented your sample Golang app. 

Hit the `/books` endpoint of the bookstore app at [http://localhost:8090/books](http://localhost:8090/books). Refresh it a bunch of times in order to generate load, and wait for 1-2 mins for data to appear on SigNoz dashboard.

 <Screenshot
   alt="Sample Go app"
   height={500}
   src="/img/blog/2021/08/opentelemetry_go_sample_app.png"
   title="/books endpoint of our bookstore app"
   width={700}
   />

You can now access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301) to monitor your app for performance metrics.

<Screenshot
   alt="Sample Go app in the list of applications monitored by SigNoz"
   height={500}
   src="/img/blog/2021/08/opentelemetry_go_app_list.png"
   title="Sample Golang app appears in the list of application"
   width={700}
/>

If you want to instrument your own Golang application, you can read about it in our [documentation](https://signoz.io/docs/instrumentation/golang/#instrumentation-of-a-sample-golang-application).

## Metrics and Traces of the Go application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<Screenshot
  alt="SigNoz charts and visualization"
  height={500}
  src="/img/blog/common/signoz_charts_application_metrics.png"
  title="Measure things like application latency, requests per sec, error percentage and see your top endpoints"
  width={700}
/>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<Screenshot
      alt="See traces, and apply powerful filters on trace data"
      height={500}
      src="/img/blog/common/signoz_list_of_traces_hc.png"
      title="View of traces at a particular timestamp"
      width={700}
/>

You can use flamegraphs to exactly identify the issue causing the latency.

<Screenshot
      alt="Flamegraphs for distributed tracing"
      height={500}
      src="/img/blog/common/signoz_flamegraphs.png"
      title="Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing"
      width={700}
/>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Go applications and generate telemetry data. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇<br></br>

[![SigNoz GitHub repo](/img/blog/common/signoz_github.png)](https://github.com/SigNoz/signoz)

If you face any issues while trying out SigNoz, feel free to write to us at: support@signoz.io

If you want to read more about SigNoz 👇<br></br>
[Monitor your Spring Boot application with OpenTelemetry and SigNoz](https://signoz.io/blog/opentelemetry-spring-boot/)
