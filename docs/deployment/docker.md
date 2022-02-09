---
id: docker
title: Deploy with Docker
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

### Steps:

1. Install SigNoz backend as instructed in this page
2. Instrument your application as instructed in [Instructions Page](/docs/instrumentation/overview)
<br></br>

<br></br>

You can install SigNoz backend in following 2 ways:
1. [Using Install Script](#1-using-install-script)
2. [Using Docker Compose](#2-using-docker-compose)

We have explained each of these ways in the following sections:
<br></br>

### 1. Using Install Script

:::note
The install script installs Docker automatically on linux distros mentioned below. If you're using Mac OS, Docker Desktop must be installed before proceeding. [Download Docker Desktop for Mac.](https://www.docker.com/products/docker-desktop)
:::

If you are on Mac or any of the following linux distributions, using our install script should be the easiest way to get started:
- Ubuntu
- Debian
- OpenSuse
- CentOS
- SUSE Linux Enterprise Server (SLES)


If you are neither on any of the above distributions nor on Mac, please install directly using [Docker Compose](#2-using-docker-compose).

<br></br>


:::note
[Update December 2, 2021]<br></br>
Currently, we have not tested these instructions to run SigNoz on Windows. But you can try it.
:::



<br></br>

1. To clone the SigNoz repository and enter the new directory, run:<br></br>
   ```jsx
   git clone https://github.com/SigNoz/signoz.git && cd signoz/deploy/
   ```

2. To run SigNoz:<br></br>
   Check that you are in `signoz/deploy` folder. Now run
   ```jsx
   ./install.sh
   ```

3. Once `install.sh` runs successfully, the UI should be accessible at port 3301 on the domain you set up or the IP of your instance. For example, if you installed SigNoz on your local host, you can access the dashboard at [http://localhost:3301/](http://localhost:3301/)

4. Wait for 2-3 mins for the data to be available to frontend. If you are running on local machine, checkout `http://localhost:3301`. You would want to open port 3301 to be accessible from outside world if you want to use public url of machine.


### 2. Using Docker Compose

1. To clone the SigNoz repository and enter the new directory, run:<br></br>
   ```console
   git clone https://github.com/SigNoz/signoz.git && cd signoz/deploy/
   ```

2. We will now set up SigNoz via docker compose. This will set up the required dependencies and also load a sample app.

You need to have docker-compose correctly setup before running this.

If you don't have `docker-compose` set up, please follow [this guide](https://docs.docker.com/compose/install/) to set up docker compose before proceeding with the next steps.


<Tabs
  defaultValue="x86"
  values={[
    {label: 'x86 Chip', value: 'x86'},
    {label: 'Mac with Apple chip', value: 'arm64'},
  ]}>
  <TabItem value="x86">

    sudo docker-compose --env-file ./docker/clickhouse-setup/env/x86_64.env -f docker/clickhouse-setup/docker-compose.yaml up -d
  
  </TabItem>

  <TabItem value="arm64">

    sudo docker-compose --env-file ./docker/clickhouse-setup/env/arm64.env -f docker/clickhouse-setup/docker-compose.yaml up -d

  </TabItem>
</Tabs>

<br></br>


For v0.5.0 and earlier

```console
sudo docker-compose -f ./docker/clickhouse-setup/docker-compose.yaml up -d
```
<p>&nbsp;</p>



<!-- ### Production Settings for Kafka + Druid setup

A standard instance of SigNoz needs around **8GB of memory**. The setup uses `docker-compose.yaml` file at `deploy/docker/druid-kafka-setup`
  
  
If you are interested in configuring S3 deep storage for production usage, check out [this section](/docs/configuration/deep_storage) -->


### How to instrument your own applications

The current `docker-compose.yaml` includes sample application ([HotR.O.D](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod)) that generates tracing data. You can explore SigNoz dashboard with the data from the sample app.

[Instrument your own application](/docs/instrumentation/overview)


### Having issues running SigNoz?
[Checkout Troubleshooting Section](/docs/deployment/troubleshooting)

  
<!-- 
### Deep Storage with S3 for Kafka+Druid Setup
[Checkout Configuration Section](/docs/configuration/deep_storage) -->

<br></br>
