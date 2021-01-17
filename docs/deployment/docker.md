---
id: docker
title: Deploying with Docker
---
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
6. Then, to run SigNoz, do:
```console
docker-compose up -d
```
7. The UI should be accessible at port 3000 on the domain you set up or the IP of your instance.


### Configure docker-compose.yml
The current `docker-compose.yaml` includes sample application ([HotR.O.D](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod)) that generates tracing data.

### How to instrument your own applications
[Checkout Instrumentation Section](/docs/instrumentation/python)