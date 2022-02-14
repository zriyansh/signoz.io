---
id: kubernetes
title: Kubernetes
description: Learn how to install SigNoz on Kubernetes with Helm
---

import UpdateJaegerEndpoint from '../shared/install-on-kubernetes-update-jaeger-endpoint.md'


Follow the steps on this page to install SigNoz on Kubernetes with Helm. 

The SigNoz Helm chart will install the following components into your Kubernetes cluster:

- Query Service (backend service)
- Web UI (Frontend)
- ClickHouse (datastore)
- OpenTelemetry collector
- Alert Manager

<!-- TODO: Flesh out the Architecture section and link out to it.-->
## Prerequisites

<!-- Need a comprehensive list of requirements. Example:
- TBC worker nodes
- TBC CPU cores
- TBC GB of memory
- A minimum of TBC disk with 100 GB, ideally 2 disks on each node with at least 100 GB each
- Kubernetes version TBC
-->

- You must have a Kubernetes cluster.
- You must have `kubectl` access to your cluster.


## Install SigNoz on Kubernetes with Helm

1. Add the SigNoz Helm repository to your client with name `signoz` by running the following command:

  ```bash
helm repo add signoz https://charts.signoz.io
  ```

2. Verify that the repository is accessible to the Helm CLI by entering the following command:
  
  ```bash
helm repo list
  ```

3. Use the `kubectl create ns` command to create a new namespace. SigNoz recommends you use `platform` for your new namespace:

  ```bash
kubectl create ns platform
  ```

4. Run the following command to install the chart with the release name `my-release` and namespace `platform`:

  ```bash
helm --namespace platform install my-release signoz/signoz
  ```

  Note that the above command installs the latest stable version of SigNoz. To install a different version, you can use the `--set` flag to specify the version you wish to install. The following example command installs SigNoz version `0.5.4`:
  
  ```bash
  helm --namespace platform install my-release signoz/signoz \
  --set frontend.image.tag="0.5.4"\
  --set queryService.image.tag="0.5.4"
  ```

:::info
   - If you use the `--set` flag, ensure that you specify the same versions for the `frontend` and `queryService` images. Specifying different versions could lead the SigNoz cluster to behave abnormally.
   - Do not use the `latest` or `master` tags in a production environment. Specifying these tags could install different versions of SigNoz on your cluster and could lead to data loss.
:::

5. You can access SigNoz by setting up port forwarding and browsing to the specified port. The following `kubectl port-forward` example command forwards all connections made to `localhost:3301` to `<release>-signoz-frontend:3301`:

  ```bash
kubectl --namespace platform port-forward svc/my-release-signoz-frontend 3301:3301
  ```

## Verify the Installation

Using the `kubectl -n platform get pods` command, monitor the SigNoz deployment process. Wait for all the pods to be in running state:

```bash
kubectl -n platform get pods
```

<!-- Need to add an example output once I install SigNoz on Kubernetes.-->
### (Optional) Install a Sample Application and Generate Tracing Data

<!-- This whole section needs more details and it could be moved somewhere else -->

Follow the steps in this section to install a sample application named [HotR.O.D](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod), and generate tracing data.

1. Use the `kubectl create ns` command to create a new namespace. SigNoz recommends you use `sample-application` for your new namespace:

  ```bash
kubectl create ns sample-application
  ```
2. <UpdateJaegerEndpoint />

3. Use the following command to generate load, replacing namespace with your namespace:

  ```bash
kubectl --namespace sample-application run strzal --image=djbingham/curl \
--restart='OnFailure' -i --tty --rm --command -- curl -X POST -F \
'locust_count=6' -F 'hatch_rate=2' http://locust-master:8089/swarm
  ```

4. Browse to `http://localhost:3301` and see the metrics and traces for your sample application. <!--This step needs more details including a screenshot but I wasn't able to install SigNoz on Kubernetes yet -->

5. Stop the pod that generates load:

  ```bash
kubectl -n sample-application run strzal --image=djbingham/curl \
 --restart='OnFailure' -i --tty --rm --command -- curl \
 http://locust-master:8089/stop
 ```

## Install specific version of SigNoz

1. List the available SigNoz Helm charts with their version and supported app version.
  ```bash
helm search repo signoz --versions
  ```
  The output should look similar to the following:
  ```output
NAME               	CHART VERSION	APP VERSION	DESCRIPTION                                
signoz/signoz      	0.0.6        	0.6.1      	SigNoz Observability Platform Helm Chart   
signoz/signoz      	0.0.5        	0.6.0      	SigNoz Observability Platform Helm Chart   
signoz/signoz      	0.0.4        	0.5.4      	SigNoz Observability Platform Helm Chart   
signoz/signoz      	0.0.3        	0.5.4      	SigNoz Observability Platform Helm Chart   
signoz/signoz      	0.0.2        	0.5.4      	SigNoz Observability Platform Helm Chart   
signoz/alertmanager	0.5.1        	0.5.0      	The Alertmanager handles alerts for SigNoz.
signoz/alertmanager	0.5.0        	0.5.0      	The Alertmanager handles alerts for SigNoz.
signoz/clickhouse  	9.1.0        	21.7       	A Helm chart for ClickHouse
  ```

2. Run the following command to install the chart version `0.0.4` running SigNoz version `0.5.4` with the release name `my-release` and namespace `platform`:
  ```bash
helm --namespace platform install my-release signoz/signoz --version 0.0.4
  ```

## Next Steps

- [Instrument Your Application](/docs/instrumentation/overview)
- [User Guides](/docs/userguide/overview/)
- [Tutorials](/docs/tutorials/)
