---
id: kubernetes
title: Kubernetes
description: Learn how to operate SigNoz on Kubernetes.
---

Once you have successfully installed SigNoz on Kubernetes, the following sections provide an overview of the activities that are required to successfully operate SigNoz.

## Stop/Start

To stop the running SigNoz cluster:

```bash
helm -n platform uninstall "my-release"
```

To start/resume the running SigNoz cluster:

```bash
helm -n platform install "my-release"
```

_*Note: The newly created release aka SigNoz cluster should mount to the existing persistent volume as long as the *namespace* and the *release name* matches to the old one._

## Upgrade/Downgrade

Here are the instructions to upgrade/downgrade the SigNoz cluster:

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

## Uninstall

To uninstall/delete the `my-release` resources:

```bash
helm -n platform uninstall "my-release"
```

See the [Helm docs](https://helm.sh/docs/helm/helm_uninstall/) for documentation on the helm uninstall command.

The command above removes all the Kubernetes components associated
with the chart and deletes the release.

Deletion of the StatefulSet doesn't cascade to deleting associated PVCs. To delete them:

```bash
kubectl -n platform delete pvc --selector app.kubernetes.io/instance=my-release
```

Sometimes everything doesn't get properly removed. If that happens try deleting the namespace:

```bash
kubectl delete namespace platform
```

## Stop Load Generation using Sample Application

```bash
kubectl -n sample-application run strzal --image=djbingham/curl \
  --restart='OnFailure' -i --tty --rm --command -- curl \
  http://locust-master:8089/stop
```

## Remove the Sample Application

```bash
curl -sL https://github.com/SigNoz/signoz/raw/main/sample-apps/hotrod/hotrod-delete.sh \
  | HOTROD_NAMESPACE=sample-application bash
```

##  Increase the ClickHouse Persistent Volume Size on EKS/GKE

You can use the following `helm upgrade` command to increase the size of the persistent volume used by SigNoz on EKS/GKE, replacing the following values to match your environment:

- Your namespace (this example uses `platform`)
- Your release (this example uses `my-release`)
- Your chart (this example uses `signoz/signoz`)
- The new size of the persistent volume (this example uses `25Gi`)

```bash
helm -n platform upgrade my-release signoz/signoz --set clickhouseOperator.storage=25Gi
```

:::info
To override values in a Helm chart, you can also use the `values`/`-f` flag. See the [Helm Upgrade](https://helm.sh/docs/helm/helm_upgrade/) page of the Helm documentation for more details.
:::
