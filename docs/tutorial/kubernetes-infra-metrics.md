---
id: kubernetes-infra-metrics
title: Kubernetes Infrastructure
description: View Kubernetes infrastructure metrics in SigNoz
---

### Overview
To export k8s metrics, you can enable different receivers in OpenTelemetry collector which will send metrics about your Kubernetes infrastructure to SigNoz. These OpenTelemetry collectors will act as agents which send metrics about K8s to SigNoz.

Based on where you are running SigNoz ( e.g. in an independent VM or k8s cluster), you have to provide the address to send data from the above receivers.

### Steps to export k8s metrics to SigNoz

1. **Clone Otel collector repo**

   ```jsx
   git clone https://github.com/SigNoz/otel-collector-k8s.git && cd otel-collector-k8s
   ```

2. **Set up the address to SigNoz in your OTel collectors**<br></br>
   You need to set up the address to SigNoz in your OTel collector which is collecting the k8s metrics.

   a. If you are running SigNoz in an independent VM, you need to change the placeholder IPs in the following files with the IP of machine where you are hosting signoz.
   
-  [agent/infra-metrics.yaml](https://github.com/SigNoz/otel-collector-k8s/blob/main/agent/infra-metrics.yaml#L47) 
-  [deployment/all-in-one.yaml](https://github.com/SigNoz/otel-collector-k8s/blob/main/deployment/all-in-one.yaml#L19)  

You need to update the below section.
   
   ```jsx
   exporters:
      otlp:
        endpoint: "<IP of machine hosting SigNoz>:4317"
        insecure: true
   ```

   b. If you are running SigNoz in the same Kubernetes cluster where your applications are, you have to replace the above endpoint in [agent/infra-metrics.yaml](https://github.com/SigNoz/otel-collector-k8s/blob/main/agent/infra-metrics.yaml#L47) and [deployment/all-in-one.yaml](https://github.com/SigNoz/otel-collector-k8s/blob/main/deployment/all-in-one.yaml#L19) by

   ```jsx
   <helm_release_name>-signoz-otel-collector.<namespace_hosting_signoz>.svc.cluster.local:4317
   ```

2. **Install OTel collectors and enable specific receivers to send metrics to SigNoz**
   

   To access metrics from kubeletstats receivers you have to:

   ```jsx
   kubectl create ns signoz-infra-metrics
   kubectl -n signoz-infra-metrics apply -Rf agent
   kubectl -n signoz-infra-metrics apply -Rf deployment
   kubectl -n signoz-infra-metrics get pods
   ```

   [List of metrics from Kubernetes receiver](#list-of-metrics-from-kubernetes-receiver)

3. **Plot Metrics in SigNoz UI**<br></br>
   To plot these metrics, follow the instructions given in the docs [here](https://signoz.io/docs/userguide/metrics-dashboard/)


---

### List of metrics from Kubernetes receiver

```jsx
k8s_container_cpu_limit
k8s_container_cpu_request
k8s_container_memory_limit
k8s_container_memory_request
k8s_container_ready
k8s_container_restarts
k8s_daemonset_current_scheduled_nodes
k8s_daemonset_desired_scheduled_nodes
k8s_daemonset_misscheduled_nodes
k8s_daemonset_ready_nodes
k8s_deployment_available
k8s_deployment_desired
k8s_namespace_phase
k8s_node_condition_memory_pressure
k8s_node_condition_ready
k8s_pod_phase
k8s_replicaset_available
k8s_replicaset_desired
k8s_statefulset_current_pods
k8s_statefulset_desired_pods
k8s_statefulset_ready_pods
k8s_statefulset_updated_pods
```

