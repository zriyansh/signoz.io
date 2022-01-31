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


<!-- #### Troubleshooting of common issues for Kafka + Druid Setup

1. `docker ps` will show all containers created by SigNoz. Check if `broker`, `otel-collector` and `historical` containers are running. They do not come up if there is a memory problem. You may want to increase alloted memory.
2. If you are still facing issues, try re-running `./install.sh`. This will retry installing containers which failed the first time.
3. Try reinstall SigNoz by first bringing down the existing containers by running
   `sudo docker-compose -f docker/druid-kafka-setup/docker-compose-tiny.yaml down -v` and then running `./install.sh`
4. If you are facing issues like `Request failed with status code 400` in frontend, then open `http://localhost:8888` or port 8888 on your IP .This is druid console. Check if **Datasource** named `flattened_spans` has come up. If there is no **Ingestion Supervsor** running, then run `./install.sh` again to bring them up.
5. If you couldn't spot issues, feel free to join our [slack community](https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA) or shoot an email at ankit@signoz.io. We are generally always there.

<br></br> -->


<!-- #### Kafka+Druid setup

1. `sudo docker-compose -f docker/druid-kafka-setup/docker-compose.yaml down -v`
2. `./install.sh` -->
