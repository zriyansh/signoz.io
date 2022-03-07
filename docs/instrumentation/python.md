---
id: python
title: OpenTelemetry Python Instrumentation
description: Send events from your Python application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>


Get up and running with OpenTelemetry in just a few quick steps! 

The setup process consists of two phases:
- Getting OpenTelemetry installed and configured
- Validating that configuration to ensure that data is being sent as expected. 

This guide explains how to download, install, and run OpenTelemetry in Python.

### Requirements

- Python 3.4 or newer
- An app to add OpenTelemetry to

We follow [OpenTelemetry python instrumentation library](https://github.com/open-telemetry/opentelemetry-python). **We shall be exporting data in Jaeger Thrift protocol.**

```bash
pip3 install opentelemetry-distro
pip3 install opentelemetry-instrumentation
pip3 install opentelemetry-exporter-otlp
```

If it hangs while installing `grpcio` during **pip3 install opentelemetry-exporter-otlp** then follow below steps as suggested in **[this stackoverflow link](https://stackoverflow.com/a/62500932/3243212)**

- pip3 install --upgrade pip
- python3 -m pip install --upgrade setuptools
- pip3 install --no-cache-dir --force-reinstall -Iv grpcio

Retry installing `opentelemetry-exporter-otlp` by doing
- pip3 install opentelemetry-exporter-otlp


The below command inspects the Python dependencies of your application and installs the instrumentation packages relevant for your Python application.

```bash
opentelemetry-bootstrap --action=install
```

:::note
If it says cannot find command `opentelemetry-bootstrap` then you need to specify the path of the file. In ubuntu, it is at `/home/ubuntu/.local/bin/opentelemetry-bootstrap`. So your command becomes,
`/home/ubuntu/.local/bin/opentelemetry-bootstrap --action=install`
:::


<p>&nbsp;</p>

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

Finally, to start sending data to SigNoz, use the following command:

```bash
OTEL_METRICS_EXPORTER=none OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz Backend>:4317"  opentelemetry-instrument <your run command>
```

_<service_name>_ is the name of service you want

_<your_run_command>_ can be `python3 app.py` or `flask run`


:::note

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

<p>&nbsp;</p>

### Instrumenting a sample Flask application

We have included a sample flask application with `README.md` at https://github.com/SigNoz/sample-flask-app.

Feel free to use this repo to test out OpenTelemetry instrumentation and how to send telemetry data to SigNoz.

<p>&nbsp;</p>

### Instrumenting Django Applications

For instrumenting Django applications, the instructions are same as for a Flask app as mentioned above. 

Though for Django, you must define `DJANGO_SETTINGS_MODULE` correctly. If your project is called `mysite`, somwthing like following should work

```
export DJANGO_SETTINGS_MODULE=mysite.settings
```

Please refer the official [Django docs](https://docs.djangoproject.com/en/1.10/topics/settings/#designating-the-settings) for more details

<p>&nbsp;</p>

### Running applications with Gunicorn, uWSGI

For application servers which are based on pre fork model like Gunicorn, uWSGI you have to add a `post_fork` hook or a `postfork decorator` in your configuration. 

Check this [documentation](https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html) from OpenTelemetry om how to set it up. 

[Here's](https://github.com/SigNoz/opentelemetry-python/tree/main/docs/examples/fork-process-model) a working example where we have configured a gunicorn server with `post_fork` hook.
  
<p>&nbsp;</p>

:::note

`psycopg2-binary` is not supported by opentelemetry auto instrumentation libraries as it is not recommended for production use. Please use `psycopg2` to see DB calls also in your trace data in SigNoz

:::


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

<p>&nbsp;</p>
