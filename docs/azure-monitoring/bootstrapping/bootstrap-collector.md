---
id: collector-setup
title: Central Collector Setup
---

## Overview

Setting up a centralised OpenTelemetry Collector offers several benefits for managing observability data in Azure environments. It allows for a clear separation between platform and application teams, reduces configuration overhead for application teams, and enables the collection of system metrics from Azure Monitor and observability data from Azure Event Hub.

 This guide will walk you through the process of creating a centralized OpenTelemetry Collector using Azure Kubernetes Service (AKS) or an Azure Virtual Machine (VM). 

<!-- To learn more about the general strategy for monitoring Azure resources, see [this documentation](../strategy). -->

## Prerequisites

Before proceeding with the setup, ensure you have the following prerequisites:

1. An active Azure subscription
2. Azure CLI installed on your local machine
3. A SigNoz account for observability data visualization and analysis

## Setting Up the OpenTelemetry Collector

Deploying the OpenTelemetry Collector can be approached in two distinct ways, depending on your infrastructure:

1. **Utilizing OpenTelemetry Helm Charts:** Ideal for those with an existing Kubernetes infrastructure.
2. **Running the Collector on a Virtual Machine:** For users not using Kubernetes and relying on serverless environments for their workloads.

## Setup

### Installing with OpenTelemetry Helm Charts

Prior to installation, you must ensure your Kubernetes cluster is ready and that you have the necessary permissions to deploy applications. Follow these steps to use Helm for setting up the Collector:

1. **Add the OpenTelemetry Helm repository:**

```bash
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
```

1. **Prepare the `otel-collector-values.yaml` Configuration**

Your configuration file should include the necessary details for your setup. This includes updating placeholers such as `<ingestion-key>`, `<region>`, and connection-specific credentials for your observability backend. 

Make sure to replace the placeholders with actual data corresponding to your setup. For Azure Monitor, set up a [service principal](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal) or utilize a [pod-managed identity](https://learn.microsoft.com/en-us/azure/aks/use-azure-ad-pod-identity) with `Read` permissions to  your Azure subscription.

Below is an example targeting the SigNoz backend with Azure Monitor receivers configured:

```yaml
service:
  pipelines:
    metrics/am:
      receivers: [azuremonitor]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    logs:
      receivers: [otlp, azureeventhub]
      processors: [batch]
      exporters: [otlp]
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  azureeventhub:
    connection: Endpoint=sb://namespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=superSecret1234=;EntityPath=hubName
    format: "azure"
  azuremonitor:
    subscription_id: "<Subscription ID>"
    tenant_id: "<AD Tenant ID>"
    client_id: "<Client ID>"
    client_secret: "<Client Secret>"
    resource_groups: ["<rg-1>"]
    collection_interval: 60s
processors:
  batch: {}
exporters:
  otlp:
    endpoint: "ingest.<region>.signoz.cloud:443"
    tls:
      insecure: false
    headers:
      "signoz-access-token": "<ingestion-key>"
```

1. **Deploy the OpenTelemetry Collector to your Kubernetes cluster:**

You'll need to prepare a custom configuration file, say `otel-collector-values.yaml`, that matches your environment's specific needs. Replace `<namespace>` with the Kubernetes namespace where you wish to install the Collector.

```bash
helm install -n <namespace> --create-namespace otel-collector open-telemetry/opentelemetry-collector -f otel-collector-values.yaml

```

For more detail, refer to the [official OpenTelemetry Helm Chart documentation](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector), which offers comprehensive installation instructions and configuration options tailored to your environment's requirements.

### Running the Collector on a Virtual Machine

If you're not using Kubernetes, setting up the OpenTelemetry Collector on a Virtual Machine (VM) is a straightforward alternative. This setup is compatible with cloud VM instances, your own data center, or even a local VM on your development machine. Here's how to do it:

1. **Download and Install the OpenTelemetry Collector Binary:**
    
    Please visit [Documentation For VM](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/) which  provides further guidance on a VM installation. 
    
    It's prudent to check available resources to ensure you're following the latest practices and utilizing updated features offered by OpenTelemetry. 
    Follow the documentation to setup your collector and test the setup.
    
2. **Configure the OpenTelemetry Collector:**
    
    The Collector requires configuration before it can start receiving Azure Monitor data. Create a file named `otel-collector-config.yaml` and populate it with the necessary configuration details. This file should be configured to fit your specific environment's requirements. For instance, you may want to setup receivers for the telemetry data you expect to collect and processors to handle that data appropriately, as well as exporters to send the data to your desired backend, like SigNoz, Jaeger, or Prometheus.
    
    Below is a basic configuration example:
    
    ```yaml
    service:
      pipelines:
        metrics/am:
          receivers: [azuremonitor]
          exporters: [otlp]
        traces:
          receivers: [otlp]
          processors: [batch]
          exporters: [otlp]
        metrics:
          receivers: [otlp]
          processors: [batch]
          exporters: [otlp]
        logs:
          receivers: [otlp, azureeventhub]
          processors: [batch]
          exporters: [otlp]
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: 0.0.0.0:4317
            http:
              endpoint: 0.0.0.0:4318
        azureeventhub:
          connection: Endpoint=sb://namespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=superSecret1234=;EntityPath=hubName
          format: "azure"
        azuremonitor:
          subscription_id: "<Subscription ID>"
          tenant_id: "<AD Tenant ID>"
          client_id: "<Client ID>"
          client_secret: "<Client Secret>"
          resource_groups: ["<rg-1>"]
          collection_interval: 60s
      processors:
        batch: {}
      exporters:
        otlp:
          endpoint: "ingest.<region>.signoz.cloud:443"
          tls:
            insecure: false
          headers:
            "signoz-access-token": "<ingestion-key>"
    ```
    
    Ensure you replace the placeholders `<region>` and `<ingestion-key>` with the appropriate values for your observability backend.
    
3. **Run the Collector:**
    
    With your configuration file ready, you can now start the Collector using the following command:
    
    ```bash
    # Runs in background with the configuration we just created
    ./otelcol-contrib --config ./otel-collector-config.yaml &> otelcol-output.log & echo "$!" > otel-pid 
    
    ```
4. **Open Ports:**
    
    You will need to open the following ports on your Azure VM:
    - 4317 for gRPC
    - 4318 for HTTP

    You can do this by navigating to the Azure VM's Networking section and adding a new inbound rule for the ports.
    
5. **Validating the Deployment:**
    
    Once the Collector is running, ensure that telemetry data is being successfully sent and received. Use the logging exporter as defined in your configuration file, or check the logs for any startup errors.


## Configure DNS label For Collector

To the IP address of the collector, you can add a DNS label to the Public IP address. This will make it easier to refer to the centralized collector from other services. You can do this by following these steps:

1. Go to the Public IP address of the collector. This would be the IP address of the VM or Load Balancer in case of Kubernetes or Load Balanced collector.
2. Click on the "Configuration" tab.
3. Enter the DNS label you want to use for the collector.
4. Click on "Save".

<figure data-zoomable align="center">
    <img
        src="/img/docs/azure-monitoring/ip-address-dns-label.webp"
        alt="DNS label for collector"
    />
    <figcaption>
        <i>
          DNS label for collector
        </i>
    </figcaption>
</figure>

:::note
Please take note of the DNS label you have entered. You will need to configure this for your other services as well.
In this example, the *Central Collector DNS Name* is `signoz-demo-central-collector.eastus.cloudapp.azure.com`.
:::


If you're using kubernetes, you probably have ExternalDNS configured and you can use that to set up DNS name for your collector as well.


## Troubleshooting

If you encounter any issues during the setup or data collection process, consider the following troubleshooting steps:

1. Verify that the OpenTelemetry Collector is running and accessible from the Azure compute services and applications.
2. Check the OpenTelemetry Collector logs for any error messages or warnings.
3. Ensure that the necessary ports and firewall rules are configured correctly to allow incoming connections to the Collector.
4. Verify that the Azure compute services and applications are properly instrumented and configured to send observability data to the Collector endpoint.
5. Confirm that the OpenTelemetry Collector is configured to export data to your SigNoz account and that the SigNoz account is accessible.