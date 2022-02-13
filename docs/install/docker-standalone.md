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
- Ensure that the port `3000` is open on the machine where you install SigNoz.


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
CONTAINER ID   IMAGE                                             COMMAND                  CREATED         STATUS                   PORTS                                                                                                                                                                                                                NAMES
b8b6d1c34dda   signoz/frontend:0.5.4                             "nginx -g 'daemon of…"   3 minutes ago   Up 2 minutes             80/tcp, 0.0.0.0:3000->3000/tcp                                                                                                                                                                                       frontend
1472604ef590   signoz/otelcontribcol:0.4.2                       "/otelcontribcol --c…"   3 minutes ago   Up 2 minutes             4317/tcp, 55679-55680/tcp                                                                                                                                                                                            clickhouse-setup-otel-collector-metrics-1
403b01d1a48d   signoz/query-service:0.5.4                        "./query-service -co…"   3 minutes ago   Up 2 minutes             0.0.0.0:8080->8080/tcp                                                                                                                                                                                               query-service
2c73764cc207   signoz/otelcontribcol:0.4.2                       "/otelcontribcol --c…"   3 minutes ago   Up 2 minutes             0.0.0.0:1777->1777/tcp, 0.0.0.0:4317->4317/tcp, 0.0.0.0:8889->8889/tcp, 0.0.0.0:14268->14268/tcp, 0.0.0.0:55679-55681->55679-55681/tcp, 0.0.0.0:8887->8888/tcp, 0.0.0.0:63639->13133/tcp, 0.0.0.0:63640->55678/tcp   clickhouse-setup-otel-collector-1
0cefda7860b7   grubykarol/locust:1.2.3-python3.9-alpine3.12      "/docker-entrypoint.…"   3 minutes ago   Up 3 minutes             5557-5558/tcp, 0.0.0.0:8089->8089/tcp                                                                                                                                                                                load-hotrod
cf8f324d622c   signoz/alertmanager:0.5.0                         "/bin/alertmanager -…"   3 minutes ago   Up 3 minutes             0.0.0.0:9093->9093/tcp                                                                                                                                                                                               clickhouse-setup-alertmanager-1
edf3143e6ab5   altinity/clickhouse-server:21.8.12.1.testingarm   "/entrypoint.sh"         3 minutes ago   Up 3 minutes (healthy)   0.0.0.0:8123->8123/tcp, 9009/tcp, 0.0.0.0:9001->9000/tcp                                                                                                                                                             clickhouse-setup-clickhouse-1
138c12f70f33   jaegertracing/example-hotrod:latest               "/go/bin/hotrod-linu…"   3 minutes ago   Up 3 minutes             8081-8083/tcp, 0.0.0.0:9000->8080/tcp                                                                                                                                                                                hotrod
  ```

2. Wait for all the pods to be in running state, and then point your browser to `http://<IP-ADDRESS>:3000/` to access the dashboard, replacing `<IP-ADDRESS>` with the IP address of the machine where you installed SigNoz.

  **Example**:
    - If you're running SigNoz on your local machine, you should point your browser to `http://localhost:3000/`.
    - If the IP address of the machine on which you're running SigNoz is `66.82.18.247`, you should point your browser to `http://66.82.18.247:3000/`

<!--

You should see a page similar to the one in the image below:

-->


<!--
How is this helpful? I suggest we create something similar to the Kubernetes section. Do we have a blog post to which I could link out?
-->
:::info
The `docker-compose.yaml` installs a sample application named [HotR.O.D](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod) that generates tracing data. You can explore the SigNoz dashboard with the data provided by the sample application.
:::


## Related Topics

- [Troubleshoot SigNoz Installation Issues](/docs/install/troubleshooting)

## Next Steps

- [Instrument Your Application](/docs/instrumentation/overview)
- [User Guides](/docs/userguide/overview/)
- [Tutorials](/docs/tutorials/)
- [Operate SigNoz on Docker Standalone](/docs/operate/docker-standalone)