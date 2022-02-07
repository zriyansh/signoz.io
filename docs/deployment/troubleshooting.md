---
id: troubleshooting
title: Troubleshooting
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>

For running SigNoz, atleast **1.5GB of memory** should be allocated in docker. This is just for demo/testing purpose.

To test if everything is fine, run the following command

```
docker ps
```

Output should look like this ( Should have 6 image names as shown below )

```
CONTAINER ID   IMAGE                                          COMMAND                  CREATED         STATUS                   PORTS                                                                                                                                                                                                                                                                                                                                                 NAMES
b080d1164e4d   signoz/frontend:0.3.1                          "nginx -g 'daemon of…"   4 minutes ago   Up 4 minutes             80/tcp, 0.0.0.0:3000->3000/tcp, :::3000->3000/tcp                                                                                                                                                                                                                                                                                                     frontend
d8be80e798ba   signoz/otelcol:latest                          "/otelcol --config=/…"   4 minutes ago   Up 4 minutes             0.0.0.0:1777->1777/tcp, :::1777->1777/tcp, 0.0.0.0:4317->4317/tcp, :::4317->4317/tcp, 0.0.0.0:14268->14268/tcp, :::14268->14268/tcp, 0.0.0.0:55679-55681->55679-55681/tcp, :::55679-55681->55679-55681/tcp, 0.0.0.0:8887->8888/tcp, :::8887->8888/tcp, 0.0.0.0:49154->13133/tcp, :::49154->13133/tcp, 0.0.0.0:49153->55678/tcp, :::49153->55678/tcp   clickhouse-setup_otel-collector_1
55b903bf600c   signoz/query-service:0.3.1                     "./query-service"        4 minutes ago   Up 4 minutes             0.0.0.0:8080->8080/tcp, :::8080->8080/tcp                                                                                                                                                                                                                                                                                                             query-service
3d6225e85d25   jaegertracing/example-hotrod:latest            "/go/bin/hotrod-linu…"   5 minutes ago   Up 5 minutes             8081-8083/tcp, 0.0.0.0:9000->8080/tcp, :::9000->8080/tcp                                                                                                                                                                                                                                                                                              hotrod
cdfcddd6620c   grubykarol/locust:1.2.3-python3.9-alpine3.12   "/docker-entrypoint.…"   5 minutes ago   Up 5 minutes             5557-5558/tcp, 0.0.0.0:8089->8089/tcp, :::8089->8089/tcp                                                                                                                                                                                                                                                                                              load-hotrod
b3afb9d3ac32   yandex/clickhouse-server                       "/entrypoint.sh"         5 minutes ago   Up 5 minutes (healthy)   0.0.0.0:8123->8123/tcp, :::8123->8123/tcp, 9009/tcp, 0.0.0.0:9001->9000/tcp, :::9001->9000/tcp                                                                                                                                                                                                                                                        clickhouse-setup_clickhouse_1
```
<br></br>

#### Troubleshooting of common issues 

1. If you see no sample services in the dashboard after installing SigNoz
   - Are you on Windows? We don't have official support for running SigNoz on Windows as of Jan 24, 2021. Please try installing on a Linux or Mac OS.
   - If you are on Mac or Linux based OS, please reachout to us on our [slack community](https://signoz.io/slack) 

2. `docker ps` will show all containers created by SigNoz. Check if `clickhouse-setup_clickhouse`, `clickhouse-setup_clickhouse` and `query-service` containers are running. They do not come up if there is a memory problem. You may want to increase alloted memory.
3. If you are still facing issues, try re-running `./install.sh`. This will retry installing containers which failed the first time.
4. Try reinstall SigNoz by first bringing down the existing containers & [reinstalling](#re-installing-signoz)

:::info

Wait for 2-3 mins for the data to be available to frontend. If you are running on local machine, checkout `http://localhost:3000`.
You would want to open port 3000 to be accessible from outside world if you want to use public url of machine.

:::

<p>&nbsp;</p>


### Troubleshooting repo

Use the instructions in [this repo](https://github.com/SigNoz/troubleshoot) to test if SigNoz otel collector is accessible from where you are running your applications

<p>&nbsp;</p>


### Re-installing SigNoz

1. Shut down currently running containers with the following command:

<Tabs
  defaultValue="x86"
  values={[
    {label: "x86", value: 'x86'},
    {label: "Apple Silicon", value: 'arm64'},
  ]}>
  <TabItem value="x86">

    sudo docker-compose --env-file ./docker/clickhouse-setup/env/x86_64.env -f docker/clickhouse-setup/docker-compose.yaml down -v

  </TabItem>

  <TabItem value="arm64">
    
    sudo docker-compose --env-file ./docker/clickhouse-setup/env/arm64.env -f docker/clickhouse-setup/docker-compose.yaml down -v

  </TabItem>

</Tabs>

<p>&nbsp;</p>


2. `./install.sh`

<p>&nbsp;</p>




