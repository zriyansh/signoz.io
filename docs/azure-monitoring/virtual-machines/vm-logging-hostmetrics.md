---
id: vm-metrics
title: VM Host Metrics & Logging
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Quickstart

To quickly get started, run the following commands on your Azure VM:

### Install Collector

<Tabs>
<TabItem value="debian" label="Debian" default>

```bash
sudo apt update && sudo apt -y install wget systemctl
curl -o /tmp/otel.deb -L https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.96.0/otelcol-contrib_0.96.0_linux_amd64.deb && sudo dpkg -i /tmp/otel.deb
```
</TabItem>
<TabItem value="rhel" label="Red Hat, CentOS">

```bash
sudo yum update
sudo yum -y install wget systemctl
curl -o /tmp/otel.rpm -L https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.96.0/otelcol-contrib_0.96.0_linux_amd64.rpm && sudo rpm -ivh /tmp/otel.rpm
```
</TabItem>
<TabItem value="fedora" label="Fedora">

```bash
sudo dnf update
sudo dnf -y install wget systemctl
curl -o /tmp/otel.rpm -L https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.96.0/otelcol-contrib_0.96.0_linux_amd64.rpm && sudo rpm -ivh /tmp/otel.rpm
```

</TabItem>
<TabItem value="alpine" label="Alpine">

```bash
apk update && apk add wget shadow
curl -o /tmp/otel.apk -L https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.96.0/otelcol-contrib_0.96.0_linux_amd64.apk && apk add --allow-untrusted /tmp/otel.apk
```
</TabItem>
</Tabs>

These commands update the package list, install necessary dependencies, download the OpenTelemetry Collector binary, and install it on your system.

For more platforms like ARM64 or i386, read the official [OpenTelemetry installation guide](https://opentelemetry.io/docs/collector/installation/)

### Configure Collector

```bash

cat > /etc/otelcol-contrib/config.yaml << EOF
receivers:
  filelog:
    include: [ <file paths> ] # /var/log/myservice/*.json 
    operators:
      - type: json_parser
        timestamp:
          parse_from: attributes.time
          layout: '%Y-%m-%d %H:%M:%S'
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  hostmetrics:
    collection_interval: 60s
    scrapers:
      cpu: {}
      disk: {}
      load: {}
      filesystem: {}
      memory: {}
      network: {}
      paging: {}
      process:
        mute_process_name_error: true
        mute_process_exe_error: true
        mute_process_io_error: true
      processes: {}
  prometheus:
    config:
      global:
        scrape_interval: 60s
      scrape_configs:
        - job_name: otel-collector-binary
          static_configs:
            - targets:
              # - localhost:8888
processors:
  batch:
    send_batch_size: 1000
    timeout: 10s
  # Ref: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
  resourcedetection:
    detectors: [env, azure, system] 
    # Using OTEL_RESOURCE_ATTRIBUTES envvar, env detector adds custom labels.
    timeout: 2s
    system:
      hostname_sources: [dns, os] 
extensions:
  health_check: {}
  zpages: {}
exporters:
  otlp:
    endpoint: "<Central Collector DNS Name>:4318"
  logging:
    verbosity: normal
service:
  telemetry:
    metrics:
      address: 0.0.0.0:8888
  extensions: [health_check, zpages]
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    metrics/internal:
      receivers: [prometheus, hostmetrics]
      processors: [resourcedetection, batch]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [otlp]
EOF
```

# Overview

In this guide, we'll walk you through the process of setting up an Azure Virtual Machine to send  logs, traces and metrics to SigNoz, an open-source observability platform. By following these steps, you'll be able to monitor your Azure VM's performance and troubleshoot issues using SigNoz.

# Prerequisites

Before you begin, ensure that you have the following:

1. [SigNoz Cloud Account](https://signoz.io/teams/)
2. An Azure subscription with permissions to create and manage Virtual Machines.
3. Azure VM with SSH access enabled.  Azure Docs 

# Setup

Follow these steps to set up your Azure VM to send logs, traces and metrics to SigNoz:

1. Create an Azure Virtual Machine if you don't have one already.  [Azure Docs](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu#create-virtual-machine) has steps on creating a VM via Portal, CLI or PowerShell.
2. Ensure SSH port 22 is open in the network security group.
3. SSH into your Azure VM: 
`ssh -i ~/.ssh/id_rsa azureuser@<public-ip>` 
4. Download and install the OpenTelemetry Collector in Quick Start
5. Configure the OpenTelemetry Collector: There is a sample config in Quick Start. Also, the file paths are configured with all the necessary logs that need to be streamed to SigNoz.
6. Verify that the OpenTelemetry Collector is running:You should see the service status as "active (running)".
    
    ```bash
    sudo systemctl status otelcol
    ```
    
7. Log in to your SigNoz Cloud account and navigate to the Dashboards section. You should start seeing metrics, traces, and logs from your Azure VM.

## Troubleshooting

If you encounter any issues during the setup process, here are a few troubleshooting steps:

- Ensure that you have replaced `{region}` and `<SIGNOZ_INGESTION_KEY>` with the correct values in the Central Collector configuration.
- Check the OpenTelemetry Collector logs for any errors:
    
    ```bash
    sudo journalctl -u otelcol-contrib
    ```
    
- Verify that the necessary ports (4317 for gRPC, 4318 for HTTP) are open in the Azure VM's network security group.
- Double-check that you have the correct permissions to create and manage Azure Virtual Machines.

That's it! You have now successfully set up your Azure Virtual Machine to send logs, traces, and metrics to SigNoz. You can start monitoring your VM's performance and troubleshooting any issues using the SigNoz dashboard.
