---
title: Logs API Documentation
id: overview
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Overview

In this doc, we will go through the logs query API through which you can 
* search logs
* paginate logs
* aggregate logs


The endpoint for the logs query API is 

`POST` `https://{URL}/api/v3/query_range`

`{URL}` can be replaced with your instance url ex:- example.signoz.io

## Prerequisite
To access this API you will need an PAT token. To obtain an PAT token please reach out to us at [cloud-support@signoz.io](mailto:cloud-support@signoz.io).
Once you have the PAT token, you can add the following header in your request.

```
SIGNOZ-API-KEY:{YOUR_PAT_TOKEN}
```
