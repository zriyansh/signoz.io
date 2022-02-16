---
id: troubleshooting
title: Troubleshooting
description: Instructions that should resolve most installation issues
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";


<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>

This troubleshooting guide includes step-by-step instructions that should resolve most installation issues.


## Using Troubleshooting repository

You can use the [SigNoz troubleshoot](https://github.com/SigNoz/troubleshoot) to test if SigNoz otel collector
is accessible from where you are running your applications.

### Binary installation

You can run the one liner script below to download the troubleshoot binary:

```bash
curl -sL https://github.com/SigNoz/troubleshoot/raw/main/scripts/install.sh | bash
```

### Troubleshoot usage

Here is the syntax:
```bash
./troubleshoot checkEndpoint --endpoint=<endpoint-to-check>
```

#### Binary

For example, if Otel Collector should be accessible in `localhost:4317`:

```bash
./troubleshoot checkEndpoint --endpoint=localhost:4317
```

#### Docker

You can also use troubleshoot Docker image:

```bash
docker run -it --rm signoz/troubleshoot checkEndpoint --endpoint=172.17.0.1:4317
```

_*Notes: SigNoz Otel Collector should be accessible in `172.17.0.1:4317` from your application even if running in different docker network._

#### Kubernetes

You can also spin up a pod in Kubernetes with same namespace as your application:

```bash
kubectl -n app-namespace run troubleshoot --image=signoz/troubleshoot \
  --restart='OnFailure' -i --tty --rm --command -- ./troubleshoot checkEndpoint \
  --endpoint=my-release-signoz-otel-collector.platform.svc.cluster.local:4317
```

_*Notes:_
1. Replace `app-namespace` with your application namespace, `my-release` with SigNoz helm release name, and `platform` with SigNoz namespace.
2. In case on multiple k8s cluster, you might have to set otel collector service type as `NodePort` or `LoadBalancer`.
  ```
helm upgrade --install -n platform my-release signoz/signoz --set otelCollector.serviceType="<NodePort or LoadBalancer>"
  ```

## Docker Standalone

1. Before you install SigNoz on Docker Standalone, ensure that all [prerequisites](/docs/install/docker/#prerequisites) are met.
2. Run the `docker ps` command and ensure that the `clickhouse-setup_clickhouse` and `query-service` containers are running. If these containers are not running, increase the memory allocated to Docker.
3. If you don't see any data in the front-end, please wait two or three minutes.
4. Run the `install.sh` script again. The script will try to reinstall the containers that failed.
5. Follow the steps for [uninstalling SigNoz](/docs/operate/docker-standalone/#uninstall-signoz) section and then install SigNoz again by following the steps in the [Install SigNoz on Docker Standalone](/docs/install/docker) section.
6. If you're still facing issues trying to install SigNoz, please reach out to us on [Slack](https://signoz.io/slack) 
