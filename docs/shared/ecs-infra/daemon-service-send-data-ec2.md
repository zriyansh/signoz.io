**Method 1: Updating entrypoint in task definition**

```json
{
      ...,
      "entryPoint": [
        "sh",
        "-c",
        "export OTEL_EXPORTER_OTLP_ENDPOINT=\"http://$(curl http://169.254.169.254/latest/meta-data/local-ipv4):4317\"; <Application Startup Commands>"
      ],
			"command": [],
			...
}
```