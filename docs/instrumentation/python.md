---
id: python
title: OpenTelemetry Python Instrumentation
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Get up and running with OpenTelemetry in just a few quick steps! The setup process consists of two phases--getting OpenTelemetry installed and configured, and then validating that configuration to ensure that data is being sent as expected. This guide explains how to download, install, and run OpenTelemetry in Python.

**Requirements**

- Python 3.4 or newer
- An app to add OpenTelemetry to

We follow [OpenTelemetry python instrumentation library](https://github.com/open-telemetry/opentelemetry-python/tree/master/opentelemetry-instrumentation). **We shall be exporting data in Jaeger Thrift protocol.**

```bash
pip3 install opentelemetry-distro
pip3 install opentelemetry-instrumentation
pip3 install opentelemetry-exporter-otlp
```

:::caution
If it hangs while installing `grpcio` during **pip3 install opentelemetry-exporter-otlp** then follow below steps as suggested in **[this stackoverflow link](https://stackoverflow.com/a/62500932/3243212)**

- pip3 install --upgrade pip
- python3 -m pip install --upgrade setuptools
- pip3 install --no-cache-dir --force-reinstall -Iv grpcio

Retry installing `opentelemetry-exporter-otlp` by doing
- pip3 install opentelemetry-exporter-otlp

:::

```bash
opentelemetry-bootstrap --action=install
```

The above command inspects the active Python site-packages and figures out which instrumentation packages the user might want to install and installs them for you.

:::caution
If it says cannot find command `opentelemetry-bootstrap` then you need to specify the path of the file. In ubuntu, it is at `/home/ubuntu/.local/bin/opentelemetry-bootstrap`. So your command becomes,
`/home/ubuntu/.local/bin/opentelemetry-bootstrap --action=install`
:::

#### Run Command

<!-- <Tabs
  defaultValue="self-hosted"
  groupId="hosting-options"
  values={[
    { label: "Self Hosted", value: "self-hosted" },
    { label: "Cloud", value: "cloud" },
  ]}
>
<TabItem value="self-hosted"> -->

```bash
OTEL_METRICS_EXPORTER=none OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz Backend>:4317"  opentelemetry-instrument <your run command>
```

_<service_name>_ is the name of service you want

_<your_run_command>_ can be `python3 app.py` or `flask run`

:::caution

- If _opentelemetry-instrument_ command is not found then use full path of executable. In ubuntu it is at _/home/ubuntu/.local/bin/opentelemetry-instrument_
- Remember to allow incoming requests to port **4317** of machine where SigNoz backend is hosted

:::

<!-- </TabItem> -->
<!-- <TabItem value="cloud">

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="ingest.signoz.io:443" OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=<access_token>" opentelemetry-instrument <your_run_command>
```

_<service_name>_ is the name of service you want

_<your_run_command>_ can be `python3 app.py` or `flask run`

_<access_token>_ can be found in your settings page as shown in below image

![access_token_settings_page](../../static/img/access_token_settings_page.png)

:::caution

- If _opentelemetry-instrument_ command is not found then use full path of executable. In ubuntu it is at _/home/ubuntu/.local/bin/opentelemetry-instrument_

:::

</TabItem>

</Tabs> -->

### Instrumentation of a sample Flask application

We have included a sample flask application with `README.md` at https://github.com/SigNoz/sample-flask-app.

Feel free to use this repo to test out OpenTelemetry instrumentation and how to send telemetry data to SigNoz.

### Troubleshooting your installation

If spans are not being reported to SigNoz, try running in debug mode by setting `OTEL_LOG_LEVEL=debug`:

The debug log level will print out the configuration information. It will also emit every span to the console, which should look something like:

```bash
Span {
  attributes: {},
  links: [],
  events: [],
  status: { code: 0 },
  endTime: [ 1597810686, 885498645 ],
  _ended: true,
  _duration: [ 0, 43333 ],
  name: 'bar',
  spanContext: {
    traceId: 'eca3cc297720bd705e734f4941bca45a',
    spanId: '891016e5f8c134ad',
    traceFlags: 1,
    traceState: undefined
  },
  parentSpanId: 'cff3a2c6bfd4bbef',
  kind: 0,
  startTime: [ 1597810686, 885455312 ],
  resource: Resource { labels: [Object] },
  instrumentationLibrary: { name: 'example', version: '*' },
  _logger: ConsoleLogger {
    debug: [Function],
    info: [Function],
    warn: [Function],
    error: [Function]
  },
  _traceParams: {
    numberOfAttributesPerSpan: 32,
    numberOfLinksPerSpan: 32,
    numberOfEventsPerSpan: 128
  },
  _spanProcessor: MultiSpanProcessor { _spanProcessors: [Array] }
},
```
