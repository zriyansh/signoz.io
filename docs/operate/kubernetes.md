---
id: kubernetes
title: Kubernetes
description: Learn how to operate SigNoz on Kubernetes.
---

Once you have successfully installed SigNoz on Kubernetes, the following sections provide an overview of the activities that are required to successfully operate SigNoz.


<!-- Not sure the next section fits here, as all our instructions are related to on-prem installs-->
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
