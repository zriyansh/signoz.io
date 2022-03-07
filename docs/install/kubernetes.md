---
id: kubernetes
title: Kubernetes
description: Learn how to install SigNoz on Kubernetes with Helm
---

Follow the steps on this page to install SigNoz on Kubernetes with Helm. 

The SigNoz Helm chart will install the following components into your Kubernetes cluster:

- Query Service (backend service)
- Web UI (Frontend)
- ClickHouse (datastore)
- OpenTelemetry collector
- Alert Manager

<!-- TODO: Flesh out the Architecture section and link out to it.-->
## Prerequisites

- You must have a Kubernetes cluster.
- You must have `kubectl` access to your cluster.
- The following table describes the hardware requirements that are needed to install SigNoz on Kubernetes:

  | Component   | Minimal Requirements | Recommended |
  | ----------- | ---------------------| ----------- |
  | Memory      | 4 GB                 | 16 GB       |
  | CPU         | 2 cores              | 4 cores     |
  | Storage     | 10 GB                | 50 GB       |

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

  Note that the above command installs the latest stable version of SigNoz. To install a different version, you can use the `--set` flag to specify the version you wish to install. The following example command installs SigNoz version `0.7.1`:
  
```bash
  helm --namespace platform install my-release signoz/signoz \
  --set frontend.image.tag="0.7.1" \
  --set queryService.image.tag="0.7.1"
```

:::info
   - If you use the `--set` flag, ensure that you specify the same versions for the `frontend` and `queryService` images. Specifying different versions could lead the SigNoz cluster to behave abnormally.
   - Do not use the `latest` or `master` tags in a production environment. Specifying these tags could install different versions of SigNoz on your cluster and could lead to data loss.
:::

5. You can access SigNoz by setting up port forwarding and browsing to the specified port. The following `kubectl port-forward` example command forwards all connections made to `localhost:3301` to `<signoz-frontend-service>:3301`:

```bash
export SERVICE_NAME=$(kubectl get svc --namespace platform -l "app.kubernetes.io/component=frontend" -o jsonpath="{.items[0].metadata.name}")

kubectl --namespace platform port-forward svc/$SERVICE_NAME 3301:3301
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

1. Use the HotROD install script below to create a `sample-application` namespace and run HotROD application on it:

```bash
curl -sL https://github.com/SigNoz/signoz/raw/main/sample-apps/hotrod/hotrod-install.sh \
  | HELM_RELEASE=my-release SIGNOZ_NAMESPACE=platform bash
```

2. Use the following command to generate load:

```bash
kubectl --namespace sample-application run strzal --image=djbingham/curl \
  --restart='OnFailure' -i --tty --rm --command -- curl -X POST -F \
  'locust_count=6' -F 'hatch_rate=2' http://locust-master:8089/swarm
```

3. Browse to `http://localhost:3301` and see the metrics and traces for your sample application. <!--This step needs more details including a screenshot but I wasn't able to install SigNoz on Kubernetes yet -->

Go to [Kubernetes Operate](/docs/operate/kubernetes) section for detailed instructions.

## Next Steps

- [Instrument Your Application](/docs/instrumentation/overview)
- [User Guides](/docs/userguide/overview/)
- [Tutorials](/docs/tutorials/)
