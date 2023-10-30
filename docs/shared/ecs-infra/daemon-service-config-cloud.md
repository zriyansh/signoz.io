```yaml
extensions:
  health_check:

receivers:
  awscontainerinsightreceiver:
    collection_interval: 30s
    container_orchestrator: ecs
  filelog:
    start_at: beginning
    include_file_path: true
    include:
      - /rootfs/var/log/dmesg
      - /rootfs/var/log/messages
      - /rootfs/var/log/*.log
      - /rootfs/var/lib/docker/containers/*/*.log
  hostmetrics:
    root_path: /rootfs
    collection_interval: 30s
    scrapers:
      cpu: {}
      load: {}
      memory: {}
      disk: {}
      filesystem: {}
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 10s
  batch/aws:
    timeout: 60s
  resource/aws:
    attributes:
      - key: Timestamp
        action: delete
  resourcedetection:
    detectors:
      - env
      - ec2
      - ecs
      - docker
      - system
    timeout: 2s
    override: false

exporters:
  otlp:
    endpoint: "ingest.{region}.signoz.cloud:443"
    tls:
      insecure: false
    headers:
      signoz-access-token: "<SIGNOZ_INGESTION_KEY>"
  logging:
    verbosity: normal

service:
  pipelines:
    metrics/aws:
      receivers: [awscontainerinsightreceiver]
      processors: [resource/aws, batch/aws]
      exporters: [otlp]
    metrics/host:
      receivers: [hostmetrics]
      processors: [resourcedetection, batch]
      exporters: [otlp]
    logs/host:
      receivers: [filelog]
      processors: [resourcedetection, batch]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp, logging]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp, logging]
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp, logging]
  extensions: [health_check]
```

***Notes:***

- Depending on the choice of your region for SigNoz cloud, the OTLP endpoint
  will vary according to this table.

  | Region	| Endpoint |
  | --- | --- |
  | US | ingest.us.signoz.cloud:443 |
  | IN | ingest.in.signoz.cloud:443 |
  | EU | ingest.eu.signoz.cloud:443 |
- Include SigNoz ingestion key in place of `<signoz-ingestion-token>`
- Replace `SIGNOZ_INGESTION_KEY` with the ingestion token of your SigNoz Cloud account
- After successful set up, feel free to remove `logging` exporter if it gets too noisy.
