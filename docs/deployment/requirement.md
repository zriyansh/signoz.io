---
id: requirement
title: Requirements
---

For running SigNoz, atleast **1.5GB of memory** should be allocated in docker to setup and do basic test. You can easily test upto 10 services serving less than 10 request per second each.

You may need to allocate more memory depending upon the volume of metrics/traces you send to SigNoz.


<!-- 
### Kafka + Druid Setup

Choosing Kafka + Druid should install a tiny instance setting which runs with **4GB of memory**. This is just for demo/testing purpose and not to be used in production. -->

<br></br>

### Requirement for Mac users 

You need to check the memory allocated to docker. Follow below steps:

a) Choose the Docker whale menu > Preferences from the menu bar and configure the runtime options described below.

![Docker Preferences](../../static/img/docs/prefs-general.webp)

b) Choose Resources from Preferences Menu and update Memory to atleast **2GB**, preferably a bit more than that.

![Docker Resource Preferences](../../static/img/docker_preferences.jpeg)