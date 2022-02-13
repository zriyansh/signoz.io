---
id: docker-standalone
title: Docker Standalone
description: Learn how to operate SigNoz on Docker Standalone
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you have successfully installed SigNoz on Docker Standalone, the following sections provide an overview of the activities that are required to successfully operate SigNoz.


## Uninstall SigNoz

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



