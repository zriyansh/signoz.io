---
id: introduction
title: Introduction
slug: /
---

## What is SigNoz?

SigNoz is an open-source Application Performance Monitoring(APM) tool which helps you monitor your applications and troubleshoot problems. SigNoz uses distributed tracing to gain visibility into your software stack.

With SigNoz, you can:
- Collect metrics like p99 latency, error rates for your services, external API calls, and individual endpoints.
- Find the root cause of the problem by identifying the exact traces causing problems in your application
- See detailed flame graphs of individual request traces.
- Run aggregates on trace data to get business-relevant metrics
- Identify the slowest endpoints in your application
- See exact request trace to figure out issues in downstream services, slow database queries, calls to third-party services like payment gateways.
- Filter traces by service name, operation, latency, error, tags/annotations.
- Run aggregates on trace data (events/spans) to get business relevant metrics.
- Use a unified UI for metrics and traces. No need to switch from Prometheus to Jaeger to debug issues.

## Get Started with SigNoz

- [Install SigNoz](/docs/install)
- [Troubleshoot Your Installation](/docs/troubleshooting)
- [Instrument Your Application](/docs/instrumentation/overview)

## User Guides

- [Overview](/docs/userguide/overview/)
- [Metrics Dashboard](/docs/userguide/metrics-dashboard/)
- [Prometheus Metrics](/docs/userguide/prometheus-metrics/)
- [Setting Alert Rules](/docs/userguide/alerts-management/)
- [Customize the Retention Period](/docs/userguide/retention-period/)
- [Using Service Maps](/userguide/service-map/)
- [Trace Details](/docs/userguide/trace-details/)

## Tutorials

- [Monitoring Spring Boot JVM Metrics](/docs/tutorial/jvm-metrics/)
- [Monitoring Kubernetes Infrastructure Metrics](/docs/tutorial/kubernetes-infra-metrics/)

## Reference

- [Technical Architecture](/docs/architecture/)
