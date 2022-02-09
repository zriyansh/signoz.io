---
id: docker_swarm
title: Deploy with Docker Swarm
---

### Steps to set up

#### 1. Install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

#### 2. Clone SigNoz github repo and go to deploy folder

```console
git clone -b main https://github.com/SigNoz/signoz.git && cd signoz/deploy/
```

#### 3. Enable docker swarm mode

```console
docker swarm init
```

This enables current node as manager in swarm

You can join more nodes using the docker swarm join commands. Do note the docker swarm join commands which are shown after docker swarm init. 

#### 4. Deploy SigNoz
```console
docker stack deploy -c docker-swarm/clickhouse-setup/docker-compose.yaml signoz
```

#### 5. List services

The following command lists running services. Wait till all the replicas of all services are available.

```console 
docker stack services signoz
```

#### 6. Scale up otel-collector

Scale up by changing replica count in [this line](https://github.com/SigNoz/signoz/blob/docker-swarm/deploy/docker-swarm/clickhouse-setup/docker-compose.yaml#L75) of docker-compose.yaml and run

```console
docker stack deploy -c docker-swarm/clickhouse-setup/docker-compose.yaml signoz
```

#### Capacity Planning

Each otel-collector replica should handle 50K spans/s. Based on the scale you want to handle you can change the number of replica as mentioned in the above step.