---
title: SigNoz - Open-Source Alternative to DataDog
slug: open-source-datadog-alternative
date: 2024-01-29
tags: [SigNoz, Open Source]
authors: pranay
description: DataDog is a popular APM tool. But it is very expensive and opaque about its billing practices. What if you could get a SaaS like experience from an open-source APM tool....
image: /img/blog/2024/01/open-source-datadog-alternative-cover.webp
keywords:
  - datadog
  - open source
  - datadog alternative
  - application monitoring
  - apm tools
  - signoz
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/open-source-datadog-alternative/"/>
</head>

import SignUps from '../docs/shared/sign-ups.md'
import GetStartedSigNoz from '../docs/shared/get-started-signoz.md';

More and more companies are now shifting to a cloud-native & microservices-based architecture. Having an application monitoring tool is critical in this world because you can’t just log into a machine and figure out what’s going wrong.

<!--truncate-->

![cover image](/img/blog/2024/01/open-source-datadog-alternative-cover.webp)

We have spent years learning about application monitoring & observability. What are the key features an observability tool should have to enable fast resolution of issues.

In our opinion, good observability tools should have

- Out of the box application metrics
- Way to go from metrics to traces to find why some issues are happening
- Seamless flow between metrics, traces & logs — [the three pillars of observability](https://signoz.io/blog/three-pillars-of-observability/)
- Filtering of traces based on different tags and filters
- Ability to set dynamic thresholds for alerts
- Transparency in pricing


## User experience not great in current open-source tools

We found that though there are open-source tools like Prometheus & Jaeger, they don’t provide a great user experience as SaaS products do. It takes lots of time and effort to get them working, figuring out the long-term storage, etc. And if you want metrics and traces, it’s not possible as Prometheus metrics & [Jaeger traces](https://signoz.io/blog/distributed-tracing-jaeger/) have different formats.

SaaS tools like DataDog and NewRelic do a much better job at many of these aspects:

- They are easy to setup & get started
- Provide out-of-box application metrics
- Provides correlation between metrics & traces

But it has the following issues:

- Crazy node-based pricing, which doesn’t make sense in today’s micro-services architecture. Any node which is live for more than 8hrs in a month is charged. So, unsuitable for spiky workloads
- Very costly. They charge custom metrics for $5/100 metrics
- It is cloud-only, so not suitable for companies that have concerns with sending data outside their infra
- For any small feature, you are dependent on their roadmap. We think this is an unnecessary restriction for a product which developers use. A product used by developers should be extendible

---

To fill this gap we built [SigNoz](https://signoz.io/), an open-source alternative to DataDog.

## Key Features of SigNoz - a DataDog alternative

Some of our key features which makes SigNoz vastly superior to current open-source products and a great alternative to DataDog are:

- Metrics, traces, and logs under a [single pane of glass](https://signoz.io/blog/single-pane-of-glass-monitoring/)
- Correlation of telemetry signals
- Out of the box application metrics
- Seamless flow between metrics, traces & logs
- Filtering based on tags
- Custom aggregates on filtered traces
- Detailed [Flamegraphs & Gantt charts](https://signoz.io/blog/flamegraphs/)
- Infrastructure dashboards
- Exceptions monitoring
- Transparent usage data & pricing
- OpenTelemetry-native

### Application metrics

Get out of the box p90, p99 latencies, RPS, Error rates and top endpoints for a service out of the box.

<figure data-zoomable>
    <img className="box-shadowed-image" src="/img/blog/common/signoz_charts_application_metrics.webp" alt="SigNoz dashboard showing popular RED metrics"/>
    <figcaption><i>SigNoz UI showing application overview metrics like 50th/90th/99th Percentile latencies, request rate and Apdex</i></figcaption>
</figure>

### Seamless flow between metrics & traces

Found something suspicious in a metric, just click that point in the graph & get details of traces which may be causing the issues. Seamless, Intuitive.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/common/application_metrics_to_traces.webp" alt="Seamless flow between metrics and traces"/>
    <figcaption><i>Move from metrics to traces at any point of time which needs more analysis</i></figcaption>
</figure>

### Advanced filters on trace data

Under our traces tab, you can analyze the traces data using filters based on tags, status codes, service names, operation, etc.

Using tags, you can find latency experienced by customers who have customer_type set as `premium`.

<figure data-zoomable align='center'>
    <img  className="box-shadowed-image" src="/img/blog/common/filters_trace_data.webp" alt="Filters on trace data"/>
    <figcaption><i>Use advanced filters to analyze your trace data</i></figcaption>
</figure>

### Custom aggregates 

Create custom metrics from filtered traces to find metrics of any type of request. Want to find p99 latency of `customer_type: premium` who are seeing `status_code:400`. Just set the filters, and you have the graph. Boom!

<figure data-zoomable align='center'>
    <img src="/img/blog/common/traces_custom_aggregates.webp" alt="Custom aggregates on filtered traces"/>
    <figcaption><i>Find custom aggregates on filtered traces</i></figcaption>
</figure>



### Flamegraphs & Gantt charts

Detailed flamegraph & Gantt charts to find the exact cause of the issue and which underlying requests are causing the problem. Is it a SQL query gone rogue or a Redis operation is causing an issue? Get more context on your spans with tags and events.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/common/signoz_flamegraphs.webp" alt="Detailed Flamegraphs & Gantt charts"/>
    <figcaption><i>Spans of a trace visualized with the help of flamegraphs and gantt charts in SigNoz dashboard</i></figcaption>
</figure>

### Logs Management

SigNoz provides Logs management with advanced log query builder. You can also monitor your logs in real-time using live tailing. SigNoz uses a columnar database ClickHouse to store logs, which is [very efficient at ingesting and storing logs data](https://signoz.io/blog/logs-performance-benchmark/). Columnar databases like ClickHouse are very effective in storing log data and making it available for analysis.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Logs tab in SigNoz"/>
    <figcaption><i>Logs tab in SigNoz comes equipped with advanced logs query builder and live tailing</i></figcaption>
</figure>


### Transparent usage Data

You can drill down details of how many events is each application sending or at what granularity, so that you can adjust your sampling rate as needed and not get a shock at the end of the month ( case with SaaS vendors many a times)

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/common/signoz_usage_explorer.webp" alt="Transparent usage data"/>
    <figcaption><i>SigNoz provides usage explorer so that you are always informed about your usage</i></figcaption>
</figure>

---

## Getting started with SigNoz

<GetStartedSigNoz />

---

#### **Related Content**

**[SigNoz vs Datadog](https://signoz.io/comparisons/signoz-vs-datadog/)**<br></br>
**[Beware these surprises in Datadog pricing](https://signoz.io/blog/datadog-pricing/)**<br></br>
