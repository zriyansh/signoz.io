---
id: aks
title: AKS Metrics & Logging
---

## Overview

AKS (Azure Kubernetes Service) is a managed Kubernetes service provided by Microsoft Azure that simplifies the deployment, management, and operations of Kubernetes clusters.

### Logging

In Kubernetes, all containers are given two output streams: stdout and stderr. This guide helps you forward all logs streamed to stdout and stderr to SigNoz using the OpenTelemetry Collector.

### Container Level Metrics

Container Level Metrics are the most granular. They offer insights into specific containers of a pod by monitoring their CPU, memory utilization, and more.

### Pod Level Metrics

A Pod consists of one or more containers. Pod-level metrics are aggregated container metrics on pod-name.

Pod Level Metrics give insights into the performance and state of the individual pods that are running on the AKS cluster. These include CPU and memory utilization, disk I/O, network traffic, and more.

### Node Level Metrics

A Node can contain one or more pods. These are aggregated container metrics on node-name.

Node Level Metrics offer a broader view, focusing on the AKS cluster nodes themselves. These metrics are crucial for understanding the overall health and capacity of the cluster. They encompass node-specific data such as CPU and memory usage, disk capacity, and network I/O.

## Prerequisites

- AKS cluster
- `kubectl` installed and logged in to the AKS cluster
- Helm

## Quick Start

This setup is similar to the central collector but with a different function.

```bash
helm repo add signoz <https://charts.signoz.io>
helm install -n signoz  --create-namespace kubelet-otel signoz/k8s-infra \\
--set signozApiKey=<ingestionKey> --set otelCollectorEndpoint="ingest.<region>.signoz.cloud:443" --set otelInsecure=false

```

## Troubleshooting

If you encounter any issues while setting up logging and metrics for your AKS cluster, follow these troubleshooting steps:

1. Check the logs of the OpenTelemetry Collector:
    
    ```bash
    kubectl logs -f -n signoz -l app.kubernetes.io/component=otel-agent
    
    ```
    
    Review the logs for any error messages or indications of misconfiguration.
    
2. Verify the rendered configuration:
    
    ```bash
    kubectl get cm/kubelet-otel-k8s-infra-otel-agent -n signoz -o yaml
    
    ```
    
    Ensure that the configuration matches your expected settings, including the SigNoz API key and the OpenTelemetry Collector endpoint.
    
3. Confirm that the necessary Kubernetes resources are created:
    
    ```bash
    kubectl get pods,services,configmaps -n signoz
    
    ```
    
    Check if the required pods, services, and config maps are running and in a healthy state.
    
4. Verify network connectivity:
    - Ensure that the AKS cluster has network access to the SigNoz ingestion endpoint (`ingest.<region>.signoz.cloud:443`).
    - Check if there are any network security groups or firewalls blocking the required ports.
5. Double-check the SigNoz API key:
    - Confirm that the provided `signozApiKey` is correct and has the necessary permissions to ingest data.