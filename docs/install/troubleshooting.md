---
id: troubleshooting
title: Troubleshooting
description: Instructions that should resolve most installation issues
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>

This troubleshooting guide includes step-by-step instructions that should resolve most installation issues.

## Docker Standalone

1. Before you install SigNoz on Docker Standalone, ensure that all [prerequisites](/docs/install/docker/#prerequisites) are met.
2. Run the `docker ps` command and ensure that the `clickhouse-setup_clickhouse` and `query-service` containers are running. If these containers are not running, increase the memory allocated to Docker.
3. If you don't see any data in the front-end, please wait two or three minutes.
4. Run the `install.sh` script again. The script will try to reinstall the containers that failed.
5. Follow the steps for [uninstalling SigNoz](/docs/operate/docker-standalone/#uninstall-signoz) section and then install SigNoz again by following the steps in the [Install SigNoz on Docker Standalone](/docs/install/docker) section.
6. If you're still facing issues trying to install SigNoz, please reach out to us on [Slack](https://signoz.io/slack) 


## Using Troubleshooting repo
Use the instructions in this [repo](https://github.com/SigNoz/troubleshoot) to test if SigNoz otel collector is accessible from where you are running your applications
