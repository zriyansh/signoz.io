---
id: docker_old
title: Deploying with Docker
---

### Steps:

1. Install SigNoz backend as instructed in this page
2. Instrument your application as instructed in [Instructions Page](/docs/instrumentation/overview)

### Generic Docker Installation Tutorial

1. Install [Docker Engine](https://docs.docker.com/engine/install/ubuntu)
2. Then install [Docker Compose](https://docs.docker.com/compose/install/)
3. [Setup Docker to run without root privileges](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) (optional but strongly recommended)
4. Install `git`:

```console
sudo apt-get update && sudo apt-get install git
```

5. To clone the SigNoz repository and enter the new directory, run:

```console
git clone https://github.com/SigNoz/signoz.git && cd signoz/deploy/docker
```

6. **To run SigNoz**:

There are 2 ways to run SigNoz in Docker

1. Tiny Instance setting ( runs with 3GB of memory)
2. Standard setting (needs 8GB of memory)

## Tiny Instance setting

We have a tiny instance setting which runs with **3GB of memory**. This is just for demo/testing purpose and not to be used in production

1. Choose the Docker menu whale menu > Preferences from the menu bar and configure the runtime options described below.

![Docker Preferences](https://docs.docker.com/docker-for-mac/images/menu/prefs.png)

2. Choose Resources from Preferences Menu and change Memory to 3GB

![Docker Resource Preferences](../../static/img/docker_preferences.jpeg)

Below command will bring up SigNoz services

```console
docker-compose -f docker-compose-tiny.yaml up -d
```

## Standard setting

A standard instance of SigNoz needs around **8GB of memory**. Below command will bring up a standard instance.

```console
docker-compose up -d
```

:::note
If you face any issues here, don't worry - just check out the troubleshooting steps in the section below
:::

7. Once `docker-compose` runs successfully, the UI should be accessible at port 3301 on the domain you set up or the IP of your instance.

:::info
Wait for 2-3 mins for the data to be available to frontend. If you are running on local machine, checkout `http://localhost:3301`.
You would want to open port 3301 to be accessible from outside world if you want to use public url of machine.
:::

### Troubleshooting

1. `docker ps` will show all containers created by SigNoz. Check if `broker`, `otel-collector` and `historical` containers are running. They do not come up if there is a memory problem.
2. If you are still facing issues, try re-running `docker-compose -f docker-compose.yaml up -d` or `docker-compose -f docker-compose-tiny.yaml up -d` based on setup you are following. This will retry installing containers which failed the first time.
3. If you are still facing issues like `Request failed with status code 400` Open `http://localhost:8888` or port 8888 on your IP .This is druid console. Check if **Datasource** named `flattened_spans` has come up. If there is no **Ingestion Supervsor** running, then run `docker-compose -f docker-compose-tiny.yaml up -d create-supervisor set-retention`
4. If you couldn't spot issues, feel free to join our slack community or shoot an email at ankit@signoz.io. We are generally always there.

### Configure docker-compose.yml

The current `docker-compose.yaml` includes sample application ([HotR.O.D](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod)) that generates tracing data.

### How to instrument your own applications

[Checkout Instrumentation Section](/docs/instrumentation/overview)
