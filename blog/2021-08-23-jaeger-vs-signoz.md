---
title: Jaeger vs SigNoz - Taking distributed tracing to the next level
slug: jaeger-vs-signoz
date: 2021-08-23
tags: [jaeger, apm-tools, distributed-tracing]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: Thinking of using Jaeger for distributed tracing? But wait, there is a much better alternative. SigNoz provides advanced capabilities for distributed tracing along with metrics and ...
image: /img/blog/2021/08/jaeger_vs_signoz_cover.webp
hide_table_of_contents: true
keywords:
  - jaeger
  - signoz
  - distributed tracing
  - observability
  - jaegertracing
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/jaeger-vs-signoz/"/>
</head>

Are you thinking of using Jaeger as a distributed tracing tool? What if there is a better alternative that does both traces and metrics so that your engineering team does not have to use multiple tools.

<!--truncate-->

![Cover Image](/img/blog/2021/08/jaeger_vs_signoz_cover.webp)

In this article, we will explore how SigNoz is a better alternative than Jaeger as an observability tool. Jaeger is famous as an end-to-end distributed tracing tool. Jaeger was originally built by teams at Uber and then open-sourced. Distributed tracing is a mechanism to track transactions across services. When you have a distributed system based on microservices, tracing your transactions across services is a necessity. With distributed tracing, engineering teams can quickly identify issues instead of wasting time checking multiple logs and dashboards.

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

SigNoz is an excellent open-source distributed tracing tool. But it goes beyond. It is a full-stack APM and observability tool with a unified UI for metrics and traces. So you don't have to switch between tools like Prometheus(metrics) and Jaeger(traces) to debug issues. The product roadmap of SigNoz also has log management in its pipeline.

## How is SigNoz better than Jaeger as an observability tool?

SigNoz can be your one-stop solution for application performance monitoring and observability needs. While Jaeger can be a good solution for distributed tracing, engineering teams often need access to metrics and traces for robust monitoring and quick debugging. The biggest advantage of SigNoz over Jaeger is that it does both metrics and traces. And that's only one of the reasons.

**List of reasons why you should choose SigNoz over Jaeger:**

- [SigNoz provides unified UI for both **metrics and traces**](#signoz-provides-unified-ui-for-both-metrics-and-traces)
- [**See metrics** like latency, error rate etc. **on traces for specific user groups**](#see-metrics-like-latency-error-rate-etc-on-traces-for-specific-user-groups)
- [Backend storage options of **ClickHouse** or **Kafka+Druid**](#backend-storage-option-of-clickhouse-or-kafkadruid)
- [Better user experience with **out of box charts** & visualization](#out-of-box-charts-and-visualization-with-signoz)
- [**Role-based access control** for better team management(in roadmap)](#role-based-access-control-for-better-team-managementin-roadmap)

Let's explore in detail how these features of SigNoz make it a better choice than Jaeger for your engineering team's productivity.

### SigNoz provides unified UI for both metrics and traces

Metrics are usually captured as time-series data and show statistics about the performance of specific services over a period of time. The statistics help developers understand the behavior of these services and how they are being used. Therefore, metrics monitoring is critical to keep your system uptimes high. A good practice is to aggregate and visualize metrics within at most one minute.

Jaeger is a distributed tracing tool and does not provide metrics.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="Jaeger UI for showing traces"
    height={500}
    src="/img/blog/2021/08/jaeger_ui-min.webp"
    title="Jaeger UI showing services and corresponding traces"
    width={700}
/>

SigNoz, on the other hand, provides application metrics like the popular RED metrics:

- Requests per sec
- Error rate (%)
- Application latency like p50, p95, and p99

SigNoz also provides an easy way to track the top endpoints of your application, as shown in the dashboard below. You can see that SigNoz has a dedicated tab for metrics visualization. You can also track metrics for external calls and database calls.

<Screenshot
    alt="SigNoz UI"
    height={500}
    src="/img/blog/2021/08/signoz_ui-min.webp"
    title="SigNoz UI showing application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate"
    width={700}
/>

### See metrics like latency, error rate etc on traces for specific user groups

A single trace tells you how a user request performed across services to serve the user what they wanted. And aggregated traces can help you identify which service or database is causing the latency affecting user's requests. And what if we told you, with SigNoz, you can see metrics for aggregated trace data related to particular attributes.

Let's break down what it means. Suppose you have a user category marked `gold` for customers in a particular segment for your application. Seeing how requests from a specific segment of users perform in your application can be critical to business metrics like growth or revenue. SigNoz allows you to filter traces with the help of tags. For example, you can filter traces where the customer type tag is set to `gold`.

<Screenshot
    alt="SigNoz trace filters"
    height={500}
    src="/img/blog/2021/08/signoz_trace_filters-min.webp"
    title="You can filter traces with tags in SigNoz traces dashboard"
    width={700}
/>

After filtering the traces, you can choose to visualize metrics like calls, duration, and error rate on the filtered traces. This insight can help you improve app's performance for specific user segments and use-cases. Jaeger does not provide such capabilities.

<Screenshot
    alt="See metrics of filtered traces"
    height={500}
    src="/img/blog/2021/08/sigNoz_metrics_for_traces-min.webp"
    title="See metrics like number of calls, duration and error on filtered traces"
    width={700}
/>

### Backend storage option of ClickHouse or Kafka+Druid

While installing SigNoz, you will have the option to choose between ClickHouse or Kafka+Druid as your storage backend. You can select any of the two depending on your preference.

<Screenshot
    alt="Technical architecture of SigNoz with ClickHouse setup"
    height={500}
    src= "/img/blog/2021/08/SigNoz_architecture-min.webp"
    title="Technical architecture of SigNoz with ClickHouse setup"
    width={700}
/>

ClickHouse is designed to be a <a href = "https://clickhouse.tech/docs/en/faq/general/why-clickhouse-is-so-fast/" rel="noopener noreferrer nofollow" target="_blank" >very fast</a> OLAP database. It is also low resource-intensive. Kafka+Druid is an industry-proven combo to power highly scalable data ingestion and real-time data analysis.

For Jaeger, Cassandra and Elasticsearch are the primary supported storage backends. But users have requested ClickHouse support for Jaeger too due to its popularity. Check out this GitHub issue 👇

[![Jaeger GitHub issues](/img/blog/2021/08/jaeger_clickhouse_issue-min.webp)](https://github.com/jaegertracing/jaeger/issues/1438)

### Out of box charts and visualization with SigNoz

SigNoz is an open-source tool, but its genesis lies in the absence of a great user experience of current popular open-source alternatives. It can be easily compared to SaaS vendors like DataDog when it comes to UX and data visualization.

Below you can see how spans in a trace are visualized with flamegraphs and Gantt charts. A good visualization dashboard is designed with the intent to drive actionable insights fast. With a single-pane view of spans and details for selected spans, it's much easier for teams to identify issues in selected spans.

<Screenshot
    alt="SigNoz flamegraphs"
    height={500}
    src= "/img/blog/2021/08/signoz_flamegraphs_gantt_charts-min.webp"
    title="Spans of a trace visualized with the help of flamegraphs and gantt charts in SigNoz dashboard"
    width={700}
/>

Jaeger does not provide Flamegraphs, and to view details of a span, you need to drill down on a selected span.

<Screenshot
    alt="Jaeger gantt charts"
    height={500}
    src= "/img/blog/2021/08/jaeger_gantt_charts-min.webp"
    title="Jaeger's UI showing  spans for selected traces"
    width={700}
/>

SigNoz also provides interactive service maps which can automatically identify the dependency between your services. The size of each circle is proportional to the number of requests it is serving. The dots connecting the services are synced with the flow of requests between the services.

<Screenshot
    alt="SigNoz service maps"
    height={500}
    src= "/img/blog/2021/08/signoz_service_maps-min.webp"
    title="Interactive Service Maps shown on SigNoz dashboard"
    width={700}
/>

<Screenshot
    alt="Jaeger's dependency graph"
    height={500}
    src= "/img/blog/2021/08/jaeger_dependency_graph-min.webp"
    title="Jaeger's dependency graph"
    width={700}
/>

### Role based access control for better team management(in roadmap)

SigNoz plans to implement role-based access controls for its dashboards. Collaboration is one of the key focus areas of SigNoz. In today's cross-functioning teams, it's important that tools enable such collaboration. With SigNoz's RBAC features, you can share dashboards across teams with different permission levels. Jaeger does not support any such feature.

---

Now that you have an idea of why you should choose SigNoz if you're considering Jaeger as a distributed tracing tool, let's see in brief two important things about SigNoz:

- How does SigNoz collects data?
- How to install and get started with SigNoz?

## How does SigNoz collects data?

SigNoz uses <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> for code instrumentation. Instrumentation is the technique of generating telemetry data(logs, metrics, and traces). OpenTelemetry is becoming the world standard for generating vendor-agnostic telemetry data. As SigNoz uses OpenTelemetry, you will never be locked in with your data. You can always shift to any analysis backend tool as most of the tools have started supporting OpenTelemetry formats of telemetry data.

## How to install and get started with SigNoz?

If you have docker installed, getting started with SigNoz just takes three easy steps at the command line:

```
git clone https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can read more about deploying SigNoz from its [documentation](https://signoz.io/docs/deployment/docker/).

If you face any issues while trying out SigNoz, feel free to write to us at: support@signoz.io

You can check out SigNoz's GitHub repo here 👇
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you want to read more about SigNoz 👇

[Monitor Spring Boot application with OpenTelemetry and SigNoz](https://signoz.io/blog/opentelemetry-spring-boot/)

[Monitor your Nodejs application with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/nodejs/)
