---
id: docker-standalone
title: Docker Standalone
description: Learn how to operate SigNoz on Docker Standalone
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import UpgradeWarning from '../shared/upgrade-warning.md'

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

Use the commands below to sync to the [latest](https://github.com/SigNoz/signoz/releases/latest) release.

1. Checkout to `main` branch:
```bash
git checkout main
```

2. Pull the `latest` changes from the [SigNoz GitHub repository](https://github.com/SigNoz/signoz):
```bash
git pull origin main
```

3. Go to `deploy` folder and run the `install.sh` script:
```bash
cd deploy && ./install.sh
```

In case you wish to upgrade the SigNoz cluster to a specific version, let's say `v0.6.2`, follow the steps below:

1. Checkout to the [v0.6.2](https://github.com/SigNoz/signoz/releases/tag/v0.6.2) tag:
```bash
git checkout v0.6.2
```

2. Go to `deploy` folder and run the `install.sh` script:
```bash
cd deploy && ./install.sh
```

<UpgradeWarning/>

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
