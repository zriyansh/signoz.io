---
id: installation
title: Installation Instructions
---

## Install using Helm Charts

The easiest way to get started with SigNoz is to install using helm charts, this will install

- Kafka
- Druid
- Flattener Processor (Streaming data processor)
- Query Service
- Web UI

### Steps to Deploy SigNoz

```console
git clone -b main https://github.com/SigNoz/signoz.git && cd signoz

helm dependency update deploy/kubernetes/platform

kubectl create ns platform

helm -n platform install signoz deploy/kubernetes/platform

kubectl -n platform apply -Rf deploy/kubernetes/jobs

kubectl -n platform apply -f deploy/kubernetes/otel-collector
```

\*_If you choose a different namespace, you need to point your applications to correct address to send traces. In our sample application just change the `JAEGER_ENDPOINT` environment variable in `sample-apps/hotrod/deployment.yaml`_

### Test HotROD application with SigNoz

```console
kubectl create ns sample-application

kubectl -n sample-application apply -Rf sample-apps/hotrod/
```

### How to generate load

```console
kubectl -n sample-application run strzal --image=djbingham/curl \
--restart='OnFailure' -i --tty --rm --command -- curl -X POST -F \
'locust_count=6' -F 'hatch_rate=2' http://locust-master:8089/swarm
```

### See UI

```console
kubectl -n platform port-forward svc/signoz-frontend 3301:3301
```

### How to stop load

```console
kubectl -n sample-application run strzal --image=djbingham/curl \
 --restart='OnFailure' -i --tty --rm --command -- curl \
 http://locust-master:8089/stop
```

### How to instrument your own applications

[Checkout Instrumentation Section](/docs/instrumentation/overview)

<!-- Supported Markdown languages - Highlight.js https://github.com/highlightjs/highlight.js/blob/master/SUPPORTED_LANGUAGES.md -->
