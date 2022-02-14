---
title: Docker Standalone
description: Learn how to install SigNoz on Docker Standalone
id: docker-standalone
slug: /install/docker
---

import CloneRepo from '../shared/clone-repo.md'
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

SigNoz can be installed on macOS or Linux computers, and there are two ways in which you can install SigNoz:

 - You may execute a script that checks your environment, installs Docker Engine and Docker Compose on Linux, and runs the `docker compose up` command for you. 
 - You may execute the `docker compose up` command yourself.

Both methods are provided below.

:::info
SigNoz recommends you to use the [install script](#install-signoz-using-the-install-script) on macOS and the following Linux distributions:
  - Ubuntu
  - Debian
  - OpenSuse
  - CentOS
  - SUSE Linux Enterprise Server (SLES)

If you're using a different Linux distribution, see the [Install SigNoz Using Docker Compose](#install-signoz-using-docker-compose) section.
:::

## Prerequisites

- A Linux or macOS machine.
- On macOS, you must manually install [Docker Engine](https://docs.docker.com/engine/install/) before you run the install script. The install script automatically installs Docker Engine on Linux.
- A minimum of 2GB of memory must be allocated to Docker. <!-- Existing documentation is somehow unclear. Are there different memory requirements based on the operating system? -->
- [Git client](https://desktop.github.com/)
- Ensure that the port `3301` is open on the machine where you install SigNoz.


## Install SigNoz Using the Install Script

1. <CloneRepo />

2. Run the `install.sh` script:

  ```bash
./install.sh
  ```

## Install SigNoz Using Docker Compose

:::info
Before you install Signoz, ensure that [Docker Compose](https://docs.docker.com/compose/install/) is installed on your machine.
:::

1. <CloneRepo />

2. To install SigNoz, enter the `sudo docker-compose up` command, specifying the following:
    - `-f` and the path to your configuration file
    - `-d` to un containers in the background

  <Tabs
    defaultValue="x86"
    values={[
      {label: 'x86', value: 'x86'},
      {label: 'Apple M1', value: 'arm64'},
    ]}>
    <TabItem value="x86">

      sudo docker-compose -f docker/clickhouse-setup/docker-compose.yaml up -d
    
    </TabItem>

    <TabItem value="arm64">

      sudo docker-compose docker/clickhouse-setup/docker-compose.arm.yaml up -d

    </TabItem>
  </Tabs>

## Verify the Installation

1. Ensure that your containers are running correctly. To view the status of your containers, run the following command:

  ```bash
docker ps
  ```
  The output should look similar to the following:

  ```output
CONTAINER ID   IMAGE                                          COMMAND                  CREATED         STATUS                   PORTS                                                        NAMES
130fee61f894   signoz/frontend:0.6.1                          "nginx -g 'daemon of…"   4 minutes ago   Up 4 minutes             80/tcp, 0.0.0.0:3301->3301/tcp, :::3301->3301/tcp            frontend
7c957db328d3   signoz/otelcontribcol:0.5.0                    "/otelcontribcol --c…"   4 minutes ago   Up 4 minutes             4317/tcp, 55679-55680/tcp                                    clickhouse-setup_otel-collector-metrics_1
ee8c2ec75926   signoz/query-service:0.6.1                     "./query-service -co…"   4 minutes ago   Up 4 minutes             8080/tcp                                                     query-service
7eb27952387b   signoz/otelcontribcol:0.5.0                    "/otelcontribcol --c…"   4 minutes ago   Up 4 minutes             0.0.0.0:4317->4317/tcp, :::4317->4317/tcp, 55679-55680/tcp   clickhouse-setup_otel-collector_1
d1706dd5903e   grubykarol/locust:1.2.3-python3.9-alpine3.12   "/docker-entrypoint.…"   4 minutes ago   Up 4 minutes             5557-5558/tcp, 8089/tcp                                      load-hotrod
a5360a1d773f   signoz/alertmanager:0.5.0                      "/bin/alertmanager -…"   4 minutes ago   Up 4 minutes             9093/tcp                                                     clickhouse-setup_alertmanager_1
874b01ec9d4d   yandex/clickhouse-server:21.12.3.32            "/entrypoint.sh"         4 minutes ago   Up 4 minutes (healthy)   8123/tcp, 9000/tcp, 9009/tcp                                 clickhouse-setup_clickhouse_1
3694594501fa   jaegertracing/example-hotrod:1.30              "/go/bin/hotrod-linu…"   4 minutes ago   Up 4 minutes             8080-8083/tcp                                                hotrod
  ```

2. Wait for all the pods to be in running state, and then point your browser to `http://<IP-ADDRESS>:3301/` to access the dashboard, replacing `<IP-ADDRESS>` with the IP address of the machine where you installed SigNoz.

  **Example**:
    - If you're running SigNoz on your local machine, you should point your browser to `http://localhost:3301/`.
    - If the IP address of the machine on which you're running SigNoz is `66.82.18.247`, you should point your browser to `http://66.82.18.247:3301/`

<!--

You should see a page similar to the one in the image below:

-->


<!--
How is this helpful? I suggest we create something similar to the Kubernetes section. Do we have a blog post to which I could link out?
-->
:::info
The `docker-compose.yaml` installs a sample application named [HotR.O.D](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod) that generates tracing data. You can explore the SigNoz dashboard with the data provided by the sample application.
:::


## Install specific version of SigNoz

1. <CloneRepo />

2. Checkout to the specific version tag. For example, to install SigNoz version `v0.5.4`:
  ```
git checkout v0.5.4
  ```

3. Run the `install.sh` script:

  ```bash
./install.sh
  ```

## Related Topics

- [Troubleshoot SigNoz Installation Issues](/docs/install/troubleshooting)

## Next Steps

- [Instrument Your Application](/docs/instrumentation/overview)
- [User Guides](/docs/userguide/overview/)
- [Tutorials](/docs/tutorials/)
- [Operate SigNoz on Docker Standalone](/docs/operate/docker-standalone)