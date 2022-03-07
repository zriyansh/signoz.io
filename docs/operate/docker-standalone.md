---
id: docker-standalone
title: Docker Standalone
description: Learn how to operate SigNoz on Docker Standalone
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you have successfully installed SigNoz on Docker Standalone, the following sections provide an overview of the activities that are required to successfully operate SigNoz.

## Stop/Start

To stop the running SigNoz cluster:

<Tabs
  defaultValue="x86"
  values={[
    {label: 'x86', value: 'x86'},
    {label: 'Apple M1', value: 'arm64'},
  ]}>
  <TabItem value="x86">

    sudo docker-compose -f docker/clickhouse-setup/docker-compose.yaml stop

  </TabItem>
  <TabItem value="arm64">

    sudo docker-compose -f docker/clickhouse-setup/docker-compose.arm.yaml stop

  </TabItem>
</Tabs>

To start/resume the running SigNoz cluster:

<Tabs
    defaultValue="x86"
    values={[
      {label: 'x86', value: 'x86'},
      {label: 'Apple M1', value: 'arm64'},
    ]}>
  <TabItem value="x86">

    sudo docker-compose -f docker/clickhouse-setup/docker-compose.yaml up

  </TabItem>
  <TabItem value="arm64">

    sudo docker-compose -f docker/clickhouse-setup/docker-compose.arm.yaml up

  </TabItem>
</Tabs>

_*Note: The stopped SigNoz cluster should resume and mount to the existing docker volumes._

## Upgrade

To upgrade, you can manually update the image tag for `query-service`, `frontend` and `otel-collector`.
And run the command to start the cluster:

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

      sudo docker-compose -f docker/clickhouse-setup/docker-compose.arm.yaml up -d

  </TabItem>
</Tabs>


_*Note:_
- Be careful! There might be configuration changes and version mismatch.
- Before upgrading, checkout to the release tag: for example `git checkout v0.6.1`
and compare the Docker Compose YAML and config files.


## Remove the Sample Application

Follow the steps in this section to remove the sample application that comes installed with SigNoz:

1. From the directory in which you installed SigNoz, open your Docker Compose file in a plain-text editor. 
     - **Linux users**: you must open the `deploy/docker/clickhouse-setup/docker-compose.yaml` file.
     - **macOS users**: you must open the `deploy/docker/clickhouse-setup/docker-compose.arm.yaml` file.


2. Comment out or remove the `services.hotrod` and `services.load-hotrod` sections:

  ![Remove the sample application on Docker Standalone](/img/docker-standalone-remove-the-sample-application.png)

3. Move into the `deploy` directory and run the `install.sh` script again:

  ```bash
  cd deploy && ./install.sh
  ```

## Uninstall

Enter the following command to uninstall SigNoz:

<Tabs
  defaultValue="x86"
  values={[
    {label: "x86", value: 'x86'},
    {label: "Apple M1", value: 'arm64'},
  ]}>
  <TabItem value="x86">

    sudo docker-compose -f docker/clickhouse-setup/docker-compose.yaml down -v

  </TabItem>
  <TabItem value="arm64">

    sudo docker-compose -f docker/clickhouse-setup/docker-compose.arm.yaml down -v

  </TabItem>
</Tabs>
