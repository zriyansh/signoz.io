---
id: overview
title: Instrumentation Overview
---

SigNoz supports [OpenTelemetry](https://opentelemetry.io/) as the primary way for users to instrument their application.

**OpenTelemetry** is a single, vendor-agnostic instrumentation library per language with support for both automatic and manual instrumentation. It provides open-standard semantic conventions to ensure vendor-agnostic data collection.

This [guide](https://opentelemetry.io/docs/concepts/instrumenting) introduces the basic concepts of instrumentation using OpenTelemetry. OpenTelemetry also has an ecosystem of libraries, plugins, integrations, and other useful tools which extend it. You can find these resources at Otel Registry [here](https://opentelemetry.io/registry/).

_You can instrument using any open-standard library and SigNoz will be your best observability backend to ingest, analyse and visualize data._

For instrumenting your code, you can use the instruction provided by OpenTelemetry for specific langauges.

SigNoz currently provides simple ways to instrument NodeJS, Java, Python and Golang applications using OpenTelemetry. Please follow the below guides.

1. [OpenTelemetry Python Instrumentation](/docs/instrumentation/python)
2. [OpenTelemetry NodeJS Instrumentation](/docs/instrumentation/nodejs)
3. [OpenTelemetry Java Instrumentation](/docs/instrumentation/java)
4. [OpenTelemetry Go Instrumentation](/docs/instrumentation/golang)
5. [OpenTelemetry .NET Instrumentation](/docs/instrumentation/dotnet)


<!-- If you need assistance instrumenting applications in other languages, please write to us at [support@signoz.io](mailto:support@signoz.io) or reach out to us on [Slack Community](https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA) -->

If you have any questions or need any help in setting things up, join our slack community and ping us in `#help` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://bit.ly/signoz-slack)

