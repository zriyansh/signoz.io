---
id: helm_chart
title: Deploy with Helm Charts
---
### Steps:
1. Install SigNoz backend as instructed in this page
2. Instrument your application as instructed in [Instructions Page](/docs/instrumentation/overview)

### Getting Started
The easiest way to get started with SigNoz on Kubernetes is to install using helm charts, this will install

- Query Service (Backend service)
- Web UI (Frontend)
- ClickHouse instance (Datastore)
- OpenTelemetry collector
- Alert Manager

### Steps to Deploy SigNoz

```console
helm repo add signoz https://charts.signoz.io

kubectl create ns platform

helm -n platform install my-release signoz/signoz
```

The above command will install a recent version of the SigNoz.
To use an explicit version of SigNoz:

```console
helm install my-release signoz/signoz \
 --set frontend.image.tag="0.5.3"\
 --set queryService.image.tag="0.5.3"
```

\*_Note: When configuring the SigNoz image tag, be careful not to use `latest` or `master`
in a production environment. These tags may have the SigNoz version change, causing
a mixed-version SigNoz cluster that can lead to an outage and potential data loss._

### Test HotROD application with SigNoz

```console
kubectl create ns sample-application

kubectl -n sample-application apply -f https://raw.githubusercontent.com/SigNoz/signoz/main/sample-apps/hotrod/hotrod.yaml
```

\*_If you choose a namespace other than `platform` for SigNoz, you will need to
point the sample application to the correct address to send traces. In our
sample application just change the `JAEGER_ENDPOINT` environment variable in
[sample-apps/hotrod/hotrod.yaml](https://github.com/SigNoz/signoz/blob/main/sample-apps/hotrod/hotrod.yaml)_

### How to generate load

```console
kubectl -n sample-application run strzal --image=djbingham/curl \
--restart='OnFailure' -i --tty --rm --command -- curl -X POST -F \
'locust_count=6' -F 'hatch_rate=2' http://locust-master:8089/swarm
```

### See UI

To access the UI, you can `port-forward` the frontend service:

```console
kubectl -n platform port-forward svc/my-release-frontend 3000:3000
```

You can open http://localhost:3000 in your favourite browser.

### How to stop load

```console
kubectl -n sample-application run strzal --image=djbingham/curl \
 --restart='OnFailure' -i --tty --rm --command -- curl \
 http://locust-master:8089/stop
```

### How to instrument your own applications

[Checkout Instrumentation Section](/docs/instrumentation/overview)

### Increase ClickHouse persistent volume size in EKS/GKE

Use the command below to increase PV size from default `20Gi` to `25Gi`:

```console
helm -n platform upgrade my-release signoz/signoz --set clickhouseOperator.storage=25Gi
```

\*_The above Helm upgrade command overrides the default values from `values.yaml`
with the ones set using `--set` flag. Alternatively, you can pass updated values
`override-values.yaml` file using `-f` flag._


<!-- Supported Markdown languages - Highlight.js https://github.com/highlightjs/highlight.js/blob/master/SUPPORTED_LANGUAGES.md -->
