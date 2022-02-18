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

```bash
sudo docker-compose -f docker/clickhouse-setup/docker-compose.yaml stop
```

To start/resume the running SigNoz cluster:

```bash
sudo docker-compose -f docker/clickhouse-setup/docker-compose.yaml up
```

_*Note: The stopped SigNoz cluster should resume and mount volumes to the existing local path._

## Upgrade

To upgrade, you can manually update the image tag for `query-service`, `frontend` and `otel-collector`.
And run the command to start the cluster:

```bash
sudo docker-compose -f docker/clickhouse-setup/docker-compose.yaml up
```

_*Note:_
- Be careful! There might be configuration changes and version mismatch.
- Before upgrading, checkout to the release tag: for example `git checkout v0.6.1` and compare the Docker Compose YAML and config files.

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



