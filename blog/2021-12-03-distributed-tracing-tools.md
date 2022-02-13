---
title: Latest top 11 distributed tracing tools [perfect for microservices]
slug: distributed-tracing-tools
date: 2021-12-03
tags: [distributed-tracing, application-monitoring, apm-tools]
authors: ankit_anand
description: Latest top distributed tracing tools list - 1.SigNoz 2.Dynatrace 3.New Relic 4.Honeycomb 5.Lightstep 6.Instana 7.Jaeger 8.DataDog 9.Zipkin..
image: /img/blog/2022/01/distributed_tracing_tools_cover.webp
keywords:
  - jaeger
  - tempo
  - grafana tempo
  - distributed tracing
  - apm tools
  - application performance monitoring
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/distributed-tracing-tools/"/>
</head>

Choosing the right distributed tracing tool is critical. How do you know which is the right one for you? Here are the top 11 distributed tracing tools that can solve your monitoring and observability needs.

<!--truncate-->

![Cover Image](/img/blog/2022/01/distributed_tracing_tools_cover.webp)

> What is a distributed tracing tool?<br></br>
> A distributed tracing tool enables you to track user requests across multiple servers and services in a microservice architecture. It gives you a central overview of how user requests are performing in different services.

Distributed tracing tools have become a critical component in a distributed and microservices-based architecture.

So why is distributed software so popular?

There are three major reasons for the popularity of distributed software: scalability, reliability, and maintainability.

But it also comes with its own challenges. Distributed software becomes complex with scale, and no single team can fully comprehend how all services interact. Although engineering teams own single services, they become implicitly responsible for many services.

A single user request can travel through hundreds or thousands of microservices. So to quickly identify where things are going wrong, you need a central overview of how requests are performing across services.

Distributed tracing tools capture user requests as they travel through every service and measure things like latency.

A great distributed tracing tool can improve your team's response to performance issues, thereby improving the end-user experience.

Here's the list of the top 11 distributed tracing tools we will be looking at in this article:

- [SigNoz](#signoz)
- [Jaeger](#jaeger)
- [Zipkin](#zipkin)
- [Dynatrace](#dynatrace)
- [New Relic](#new-relic)
- [Honeycomb](#honeycomb)
- [Lightstep](#lightstep)
- [Instana](#instana)
- [DataDog](#datadog)
- [Elastic APM](#elastic-apm)
- [Splunk](#splunk)

Before we deep dive into each of these distributed tracing tools, let's take a short detour to understand distributed tracing.

## What is distributed tracing?
In the world of microservices, a user request travels through hundreds of services before serving a user what they need. To make a business scalable, engineering teams are responsible for particular services with no insight into how the system performs as a whole. And that's where distributed tracing comes into the picture.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="Microservices architecture"
    height={500}
    src="/img/blog/2021/09/jaeger_vs_zipkin_microservices_architecture.webp"
    title="Microservice architecture of a fictional e-commerce application"
    width={700}
/>

Distributed tracing gives you insight into how a particular service is performing as part of the whole in a distributed software system. There are two essential concepts involved in distributed tracing: **Spans** and **trace context**.

User requests are broken down into spans.

> What are spans?<br></br>
> Spans represent a single operation within a trace. Thus, it represents work done by a single service which can be broken down further depending on the use case.

A **trace context** is passed along when requests travel between services, which tracks a user request across services. Thus, you can see how a user request performs across services and identify what exactly needs your attention without manually shifting through multiple dashboards.

<Screenshot
    alt="Trace context is passed to track user requests across services"
    height={500}
    src="/img/blog/2021/09/opentelemetry_distributed_tracing-min.webp"
    title="A trace context is passed when user requests pass from one service to another"
    width={700}
/>

Below is a snapshot from SigNoz dashboard showing spans from a request as rectangular blocks.

<Screenshot
    alt="SigNoz dashboard showing spans from a request"
    height={500}
    src="/img/blog/2021/09/spans_traces-min.webp"
    title="Spans representing logical operations within a trace as rectangular blocks (Source: SigNoz dashboard)"
    width={700}
/>

## Top 11 distributed tracing tools
Now let's explore the top 11 distributed tracing tools in 2022.

### SigNoz
[SigNoz](https://signoz.io/?utm_source=blog&utm_medium=article) is a full-stack open-source APM and observability tool. It captures both metrics and traces with log management currently in the product roadmap. Logs, metrics, and traces are considered to be the three pillars of observability in modern-day distributed systems.

SigNoz provides a unified UI for metrics and traces so that there is no need to switch between different tools like Jaeger and Prometheus.

Using SigNoz, you can track things like:

- User requests per second
- 50th, 90th, and 99th percentile latencies of microservices in your application
- Error rate of requests to your services
- Slow endpoints in your application
- User requests across different microservices using distributed tracing

An open-source tool with the capabilities of SaaS vendors, SigNoz is a great choice for a distributed tracing tool.

<Screenshot
    alt="Architecture of SigNoz with OpenTelemetry and ClickHouse"
    height={500}
    src="/img/blog/2021/09/SigNoz_architecture_clickhouse.webp"
    title="Architecture of SigNoz with ClickHouse as storage backend and OpenTelemetry for code instrumentatiion"
    width={700}
/>

SigNoz uses OpenTelemetry for code instrumentation. OpenTelemetry provides vendor-agnostic instrumentation libraries and is quietly becoming the world standard for generating and managing telemetry data.

<Screenshot
    alt="SigNoz UI showing the popular RED metrics"
    height={500}
    src="/img/blog/common/signoz_charts_application_metrics.webp"
    title="SigNoz UI showing application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate"
    width={700}
/>

You can also use flamegraphs to visualize spans from your trace data. All of this comes out of the box with SigNoz.

<Screenshot
    alt="Flamegraphs used to visualize spans of distributed tracing in SigNoz UI"
    height={500}
    src="/img/blog/common/signoz_flamegraphs.webp"
    title="Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing"
    width={700}
/>

Gantt charts make it easy to visualize your services and events in a parent-child relationship tree. You can easily figure out which events are causing latency in a request call.

<Screenshot
    alt="Gantt charts on SigNoz dashboard"
    height={500}
    src="/img/blog/2021/09/signoz_gantt_chart-min.webp"
    title="Gantt charts on SigNoz dashboard to visualize your spans in a parent-child relationship"
    width={700}
/>


### Jaeger

<a href = "https://www.jaegertracing.io/" rel="noopener noreferrer nofollow" target="_blank" ><b>Jaeger</b></a> is an open-source APM tool developed at Uber, later donated to Cloud Native Computing Foundation(CNCF). Inspired by Google's Dapper, Jaeger is a distributed tracing system.

It is used for monitoring and troubleshooting microservices-based distributed systems. Some of its key features include:

- Distributed context propagation
- Distributed transaction monitoring
- Root cause analysis
- Service dependency analysis
- Performance / latency optimization

<Screenshot
    alt="Jaeger Architecture"
    height={500}
    src="/img/blog/2021/09/Jaeger_architecture-min.webp"
    title="Architecture of Jaeger"
    width={700}
/>

Jaeger supports two popular open-source NoSQL databases as trace storage backends: Cassandra and Elasticsearch. Jaeger's UI can be used to see individual traces. You can also filter the traces based on service, duration, and tags.

<Screenshot
    alt="Jaeger UI"
    height={500}
    src="/img/blog/2021/08/jaeger_ui-min.webp"
    title="Jaeger UI showing services and corresponding traces"
    width={700}
/>

### Zipkin

<a href = "https://zipkin.io/" rel="noopener noreferrer nofollow" target="_blank" ><b>Zipkin</b></a> is an open-source APM tool used for distributed tracing. Zipkin captures timing data need to troubleshoot latency problems in service architectures.

Zipikin was initially developed at Twitter and drew inspiration from Google's Dapper. Unique identifiers called Trace ID are attached to each request which then identifies that request across services.

Zipkin's architecture includes:

- Reporters to send data to Zipkin
- Collectors which persist trace data to storage
- API to query data
- UI

<Screenshot
    alt="Zipkin architecture"
    height={500}
    src="/img/blog/2021/09/zipkin_architecture-min.webp"
    title="Zipkin architecture (Source: Zipkin website)"
    width={700}
/>

Zipkin's in-built UI is limited, and you can use Grafana or Kibana from the ELK stack for better analytics and visualizations.

<Screenshot
    alt="Zipkin UI"
    height={500}
    src="/img/blog/2021/07/Zipkin_ui-min_o.webp"
    title="Zipkin UI (Source: Zipkin's GitHub repo)"
    width={700}
/>

It also includes a dependency diagram that shows how many user requests went through each service. It can help you to identify error paths and calls to deprecated services.

<Screenshot
    alt="Zipkin dependency diagram"
    height={500}
    src="/img/blog/2021/07/zipkin_dependency_diagram-min_o.webp"
    title="Zipkin dependency diagram (Source: GitHub repo)"
    width={700}
/>

### Dynatrace

<a href = "https://www.dynatrace.com/" rel="noopener noreferrer nofollow" target="_blank" ><b>Dynatrace</b></a> is an extensive SaaS enterprise tool targeting a broad spectrum of monitoring needs of large-scale enterprises. For distributed tracing, it provides a technology called [Purepath](https://www.dynatrace.com/platform/purepath/), which combines distributed tracing with code-level insights. When a user initiates a transaction with the application, PurePath gives the transaction a unique ID.

Some of the key features provided by the Dynatrace distributed tracing tool includes:

- Automatic injection and collection of data
- Code-level visibility across all application tiers for web and mobile apps together
- Always-on code profiling and diagnostics tools for application analysis

<Screenshot
    alt="Dynatrace distributed tracing dashboard"
    height={500}
    src="/img/blog/2021/09/dynatrace_purepath-min.webp"
    title="Distributed tracing by PurePath technology (Source: Dynatrace website)"
    width={700}
/>

<Screenshot
    alt="Code-level insights with Dynatrace PurePath technology"
    height={500}
    src="/img/blog/2021/09/dynatrace_purepath_code_level-min.webp"
    title="Code-level insights shown on Dynatrace dashboard (Source: Dynatrace website)"
    width={700}
/>

### New Relic

<a href = "https://newrelic.com/" rel="noopener noreferrer nofollow" target="_blank" ><b>New Relic</b></a> is one of the oldest companies in the application performance monitoring domain. It offers multiple solutions to enterprises for performance monitoring. For distributed tracing, it offers New Relic Edge, which can observe 100% of an application's traces.

Some of the key features of the New Relic distributed tracing tool includes:

- Distributed tracing and sampling options for a wide range of technology stack
- Support for open-source tracing tools and standards like OpenTelemetry
- Correlation of tracing data with other aspects of application infrastructure and user monitoring
- Fully managed cloud-native experience with on-demand scalability

<Screenshot
    alt="New Relic distributed tracing dashboard"
    height={500}
    src="/img/blog/2021/09/new_relic_distributed_tracing-min_2.webp"
    title="New Relic distributed tracing dashboard (Source: New Relic website)"
    width={700}
/>

### Honeycomb

<a href = "https://www.honeycomb.io/" rel="noopener noreferrer nofollow" target="_blank" ><b>Honeycomb</b></a> is a full-stack cloud-based observability tool with support for events, logs, and traces. Honeycomb provides an easy-to-use distributed tracing solution.

Some of the key features of the Honeycomb distributed tracing tool includes:

- Quickly diagnose bottlenecks and optimize performance with a waterfall view to understand how your system is processing service requests
- Full-text search over trace spans and toggle to collapse and expand sections of trace waterfalls
- Provides Honeycomb beelines to automatically define key pieces of trace data like serviceName, name, timestamp, duration, traceID, etc.

<Screenshot
    alt="Honeycomb tracing dashboard (Source: Honeycomb website)"
    height={500}
    src="/img/blog/2021/09/honeycomb_tracing_dashboard-min.webp"
    title="Honeycomb distributed tracing dashboard (Source: Honeycomb website)"
    width={700}
/>

### Lightstep

<a href = "https://lightstep.com/" rel="noopener noreferrer nofollow" target="_blank" ><b>Lightstep</b></a> is a distributed tracing tool that provides complete visibility to distributed systems based on microservices and multi-cloud environment. It uses open-source friendly data ingestion methods and is built to support applications of any scale.

Some of the key features of the Lightstep distributed tracing tool includes:

- Move seamlessly from a high-level view of dependencies to specific services, operations, traces, or any other signals contributing to issues in production
- Provides full-context root cause analysis with exact logs, metrics, and traces to simplify and solve complex investigations
- Auto-instrumentation libraries powered by OpenTelemetry

<Screenshot
    alt="Lighstep tracing dashboard (Source: thenewstack.io)"
    height={500}
    src="/img/blog/2021/09/lightstep_tracing_dashboard-min.webp"
    title="Lighstep distributed tracing dashboard (Source: thenewstack.io)"
    width={700}
/>

### Instana

<a href = "https://www.instana.com/" rel="noopener noreferrer nofollow" target="_blank" ><b>Instana</b></a> is a distributed tracing tool aimed at microservice applications. The Instana platform offers website monitoring, cloud & infrastructure monitoring, observability platform apart from distributed tracing of microservice applications.

Some of the key features of the Instana distributed tracing tool includes:

- A single, lightweight agent per host to continually discover and monitor all components of the technology stack
- Dependency Map to continuously model application services and infrastructure
- Enriched trace data with information about the underlying service, application, and system infrastructure
- Root cause analysis with a correlated sequence of events and issues identifying the exact source of the problem

<Screenshot
    alt="Instana distributed tracing dashboard"
    height={500}
    src="/img/blog/2021/09/instana_distributed_tracing_dashboard-min.webp"
    title="Instana distributed tracing dashboard (Source: Instana website)"
    width={700}
/>

### DataDog

<a href = "https://www.datadoghq.com/" rel="noopener noreferrer nofollow" target="_blank" ><b>DataDog</b></a>  is an enterprise APM tool that provides monitoring products ranging from infrastructure monitoring, log management, network monitoring to security monitoring. Its application performance monitoring tool has distributed tracing capabilities.

Some of the key features of DataDog APM, which provides distributed tracing capabilities, includes:

- Out of box performance dashboards for web services, queues, and databases to monitor requests, errors, and latency
- Correlation of distributed tracing to browser sessions, logs, profiles, network, processes, and infrastructure metrics
- Can ingest 50 traces per second per APM host
- Service maps to understand service dependencies

<Screenshot
    alt="DataDog distributed tracing dashboard"
    height={500}
    src="/img/blog/2021/09/datadog_distributed_tracing_dashboard-min.webp"
    title="DataDog distributed tracing dashboard (Source: DataDog website)"
    width={700}
/>


### Elastic APM

<a href = "https://www.elastic.co/" rel="noopener noreferrer nofollow" target="_blank" ><b>Elastic APM</b></a> is an Application Performance Monitoring system built on the Elastic Stack - ElasticSearch, Logstash, and Kibana. It consists of four components:

- Elasticsearch - For data storage and indexing
- Kibana - For analyzing and visualizing the data
- APM agents - Collects the data to send to the APM server
- APM server - Receives data from APM agents and process it for storing in Elasticsearch

<Screenshot
    alt="Elastic APM distributed tracing dashboard"
    height={500}
    src="/img/blog/2021/09/elastic_apm_distributed_tracing_dashboard-min.webp"
    title="Elastic APM distributed tracing dashboard (Source: DataDog website)"
    width={700}
/>

### Splunk

<a href = "https://www.splunk.com/" rel="noopener noreferrer nofollow" target="_blank" ><b>Splunk</b></a> provides a distributed tracing tool that can ingest all application data for a high-fidelity analysis. It stores all trace data in Splunk Cloud's offering.

Some of the key features of the Splunk distributed tracing tool includes:

- No sample full fidelity trace data ingestion<br></br>
With Splunk, you can capture all trace data to ensure your cloud-native application work the way it is supposed to.
- Full-stack observability<br></br>
Splunk APM provides a seamless correlation between infrastructure metrics and application performance metrics.
- AI-Driven troubleshooting<br></br>
Splunk APM provides uses an AI-driven approach to identify error-prone microservices.

<Screenshot
    alt="Splunk distributed tracing dashboard"
    height={500}
    src="/img/blog/2021/09/splunk_distributed_tracing_dashboard-min.webp"
    title="Splunk distributed tracing dashboard (Source: DataDog website)"
    width={700}
/>

## How to choose the right distributed tracing tool?

Tracing user requests is now critical for maintaining an exemplary user experience. Yes, distributed tracing directly impacts end-user experience as it gives your teams the right insights in the right amount of time to act on issues affecting application performance.

In our view, distributed tracing tools should be developer first tools. As developers directly utilize these tools in critical situations, the codebase of the tools should be open-source. Open-source is the future of all software tools.

Transparency and collaboration are some key benefits of open-source software tools. Developers want to see the code first hand, and if there are issues they want to address, they prefer to reach out to an active developer community than a customer support team.

At the same time, most open-source tools don't provide the same user experience as provided by SaaS vendors. But it doesn't have to be that way. With that objective, we created SigNoz.

SigNoz is a full-stack open-source application performance monitoring and observability tool. It provides a unified UI for both metrics and traces. Log management is also in the product roadmap and will be launched seen.

## Getting started with SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=distributed_tracing_tools)

You can check out SigNoz's GitHub repo here 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

___

#### **Related Content**

**[Top 9 observability tools](https://signoz.io/blog/observability-tools/)**<br></br>
**[Top 21 APM tools](https://signoz.io/blog/apm-tools/)**<br></br>


