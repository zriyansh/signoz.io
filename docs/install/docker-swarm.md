---
title: Docker Swarm
description: Learn how to install SigNoz on Docker Swarm
id: docker-swarm
slug: /install/docker-swarm
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CloneRepo from '../shared/clone-repo.md'

This section provides information on installing SigNoz on Docker Swarm.

## Prerequisites

<!-- Double-check if this list is comprehensive about memory, disk space, etc. -->
<!-- This section should focus on SigNoz, hence we could assume that Docker Swarm is already installed, similar to the Docker Standalone or Kubernetes sections. Not sure why we show to initialize a swarm or add more nodes here.  -->

- A Linux or macOS machine.
- [Docker Engine](https://docs.docker.com/get-docker/). A minimum of 2GB of memory must be allocated to each Docker node.
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git client](https://desktop.github.com/)

## Install SigNoz on Docker Swarm
    
1. <CloneRepo />

2. Initialize a single-node swarm by entering the following command:
  ```bash
docker swarm init
  ```

  The output should look similar as shown below:
  ```output
  Swarm initialized: current node (6muco3j7jjuo6k4rbiq8yr8fw) is now a manager.

  To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-6ak6diq1lbrwemx17up9c1ph039h64z0dxksjxv647qnqrd290-4tt6q22dd462p4lf2n6bqbnt4 192.168.65.3:2377

  To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
  ```

3. _(Optional)_ You can use the `docker swarm join` command to add more nodes to the swarm. Note that the node you added in the previous step is the manager. For details, see the [Docker Swarm Join](https://docs.docker.com/engine/reference/commandline/swarm_join/) page of the Docker documentation.

4. Deploy SigNoz by entering the `docker stack deploy command` and specifying the following:
   - `-c` and the path to the Compose file (`docker-swarm/clickhouse-setup/docker-compose.yaml`)
   - The name of the stack (`signoz`)
  ```bash
docker stack deploy -c docker-swarm/clickhouse-setup/docker-compose.yaml signoz
  ```
  
  The output should look similar to the following:

  ```output
  Ignoring unsupported options: links, restart

  Ignoring deprecated options:

  container_name: Setting the container name is not supported.

  expose: Exposing ports is unnecessary - services on the same network can access each other's containers on any port.

  Creating network signoz_default
  Creating service signoz_frontend
  Creating service signoz_otel-collector
  Creating service signoz_otel-collector-hostmetrics
  Creating service signoz_hotrod
  Creating service signoz_load-hotrod
  Creating service signoz_clickhouse
  Creating service signoz_query-service
  ```

5. _(Optional)_ By default, the instructions in this document create three replicas, and each replica can handle 50K spans per second. To handle an increased load, perform the steps in the [Scale Up](/docs/operate/docker-swarm/#scale-up) section of the [Operate on Docker Swarm](/docs/operate/docker-swarm/) page.
## Verify the Installation

1. Using the `docker stack services` command, monitor the SigNoz deployment process. Wait until all SigNoz services and replicas are created:

  ```bash
docker stack services signoz
  ```

Go to [Docker Swarm Operate](/docs/operate/docker-swarm) section for detailed instructions.

## Next Steps

- [Instrument Your Application](/docs/instrumentation/overview)
- [User Guides](/docs/userguide/overview/)
- [Tutorials](/docs/tutorials/)
