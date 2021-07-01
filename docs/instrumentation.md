---
id: instrumentation
title: Instrumenting your applications for SigNoz
---

**OpenTelemetry** is a single, vendor-agnostic instrumentation library per language with support for both automatic and manual instrumentation. It provides open-standard semantic conventions to ensure vendor-agnostic data collection.

Follow instrumentation using OpenTelemetry at https://opentelemetry.io/docs/concepts/instrumenting.
Also, extend OpenTelemetry using various plugins, libraries and integrations avaiable at https://opentelemetry.io/registry/

\*_You can instrument using any open-standard library and SigNoz will be your best Observability backend to ingest, analyse and visualize data_

#### Sample manual instrumentation using OpenTelemetry

As owners of applications we like to know where our application spends time whenever another application calls our service. We would like to know atleast below basic details about our API calls

- HTTP responses from web services
- HTTP requests from clients
- Database calls

As an example we would see how we can instrument a simple flask application which hosts an API endpoint `/` and whenever that endpoint is called it shall make an external call to `https://signoz.io` and respond back to client. Below is the code:

```python
# flask_example.py

import flask
import requests

from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    ConsoleSpanExporter,
    SimpleExportSpanProcessor,
)

trace.set_tracer_provider(TracerProvider())
trace.get_tracer_provider().add_span_processor(
    SimpleExportSpanProcessor(ConsoleSpanExporter())
)

app = flask.Flask(__name__)
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()


@app.route("/")
def hello():
    tracer = trace.get_tracer(__name__)
    with tracer.start_as_current_span("signoz-request"):
        requests.get("https://signoz.io/")
    return "Got response from SigNoz"


app.run(debug=True, port=5000)
```

### Before running the above code you need to:

- pip install flask
- pip install opentelemetry-instrumentation-flask
- pip install opentelemetry-instrumentation-requests

To run: `python flask_example.py`
These packages will auto instrument the requests being handled by this flask application. We have used **ConsoleSpanExporter** which will print the spans to the console. We can also send those spans to other tracing backends like **Jaeger** or **SigNoz**.

Below are the 3 spans created by visiting `http://localhost:5000`

```
{
    "name": "HTTP GET",
    "context": {
        "trace_id": "0xc98a33c28b2d64a67a4d4e192a24a01b",
        "span_id": "0xec9d9935b0316b7b",
        "trace_state": "{}"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xf8d6190104679a71",
    "start_time": "2021-01-04T11:26:46.521343Z",
    "end_time": "2021-01-04T11:26:47.793410Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "component": "http",
        "http.method": "GET",
        "http.url": "https://signoz.io/",
        "http.status_code": 200,
        "http.status_text": "OK"
    },
    "events": [],
    "links": [],
    "resource": {
        "telemetry.sdk.language": "python",
        "telemetry.sdk.name": "opentelemetry",
        "telemetry.sdk.version": "0.16b1"
    }
}
{
    "name": "signoz-request",
    "context": {
        "trace_id": "0xc98a33c28b2d64a67a4d4e192a24a01b",
        "span_id": "0xf8d6190104679a71",
        "trace_state": "{}"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x978600fdd3d9ac76",
    "start_time": "2021-01-04T11:26:46.520941Z",
    "end_time": "2021-01-04T11:26:47.796244Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {},
    "events": [],
    "links": [],
    "resource": {
        "telemetry.sdk.language": "python",
        "telemetry.sdk.name": "opentelemetry",
        "telemetry.sdk.version": "0.16b1"
    }
}
{
    "name": "/",
    "context": {
        "trace_id": "0xc98a33c28b2d64a67a4d4e192a24a01b",
        "span_id": "0x978600fdd3d9ac76",
        "trace_state": "{}"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2021-01-04T11:26:46.507720Z",
    "end_time": "2021-01-04T11:26:47.796764Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "component": "http",
        "http.method": "GET",
        "http.server_name": "127.0.0.1",
        "http.scheme": "http",
        "host.port": 5000,
        "http.host": "localhost:5000",
        "http.target": "/",
        "net.peer.ip": "127.0.0.1",
        "http.user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "net.peer.port": 55622,
        "http.flavor": "1.1",
        "http.route": "/",
        "http.status_text": "OK",
        "http.status_code": 200
    },
    "events": [],
    "links": [],
    "resource": {
        "telemetry.sdk.language": "python",
        "telemetry.sdk.name": "opentelemetry",
        "telemetry.sdk.version": "0.16b1"
    }
}
```
