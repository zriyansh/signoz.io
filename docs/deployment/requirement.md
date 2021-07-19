---
id: requirement
title: Requirements
---

### ClickHouse Setup

For running Clickhouse setup, atleast **1.5GB of memory** should be allocated in docker. This is just for demo/testing purpose.

<br></br>


### Kafka + Druid Setup

Choosing Kafka + Druid should install a tiny instance setting which runs with **4GB of memory**. This is just for demo/testing purpose and not to be used in production.

<br></br>

### Requirement for Mac users 

You need to check the memory allocated to docker. Follow below steps:

a) Choose the Docker menu whale menu > Preferences from the menu bar and configure the runtime options described below.

![Docker Preferences](https://docs.docker.com/docker-for-mac/images/menu/prefs.png)

b) Choose Resources from Preferences Menu and change Memory to **4GB** for Kafka + Druid Setup. For Clickhouse setup, this should be atleast **2GB**.

![Docker Resource Preferences](../../static/img/docker_preferences.jpeg)