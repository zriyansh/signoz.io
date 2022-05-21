---
id: kubernetes
title: Kubernetes
description: Learn how to operate SigNoz on Kubernetes.
---

import UpgradeInfo from '../shared/helm-upgrade-info.md'
import UpgradeWarning from '../shared/upgrade-warning.md'

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

## Upgrade

Use the steps below to upgrade to the latest:

1. Fetch the latest chart information from the Helm repositories
```bash
helm repo update
```

2. Upgrade to the latest available version of the chart
```bash
helm -n platform upgrade my-release signoz/signoz
```

<UpgradeInfo/>

In case you wish to upgrade the SigNoz cluster to a specific version, follow the steps below:

1. List the available SigNoz Helm charts with their version and supported app version.
```bash
helm search repo signoz --versions
```

The output should look similar to the following:
```output
NAME               	CHART VERSION	APP VERSION	DESCRIPTION
signoz/signoz      	0.0.9        	0.7.1      	SigNoz Observability Platform Helm Chart
signoz/signoz      	0.0.8        	0.6.2      	SigNoz Observability Platform Helm Chart
signoz/signoz      	0.0.7        	0.6.1      	SigNoz Observability Platform Helm Chart
signoz/signoz      	0.0.6        	0.6.1      	SigNoz Observability Platform Helm Chart
signoz/alertmanager	0.5.2        	0.5.0      	The Alertmanager handles alerts for SigNoz.
signoz/clickhouse  	16.0.2       	21.12.3.32 	A Helm chart for ClickHouse
```

2. Run the following command to install the chart version `0.0.8` running SigNoz version `0.6.2` with the release name `my-release` and namespace `platform`:

```bash
helm -n platform upgrade my-release signoz/signoz --version 0.0.8
```

<UpgradeWarning/>

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

## Remove the Sample Application

Use the command below to remove the sample application:

```bash
curl -sL https://github.com/SigNoz/signoz/raw/main/sample-apps/hotrod/hotrod-delete.sh \
  | HOTROD_NAMESPACE=sample-application bash
```
