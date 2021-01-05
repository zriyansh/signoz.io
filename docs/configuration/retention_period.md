---
id: retention_period
title: Retention Period for data
---

You can set the retention period of your data with SigNoz. The default is set to 3 days.

Druid co-ordinator is responsible to set the retention rules for the datasource in druid. We make a POST request to `http://signoz-druid-router:8888/druid/coordinator/v1/rules/flattened_spans` with below json data to configure retention:

```
[
  {
    "period": "P3D",
    "includeFuture": true,
    "tieredReplicants": {
      "_default_tier": 1
    },
    "type": "loadByPeriod"
  },
  {
    "type": "dropForever"
  }
]
```
`_default_tier` is the data redundancy or replication factor and `period` is the retention period.

The json data for the POST request is at `deploy/kubernetes/jobs/retention/retention-config.yaml`. You can edit the values to set your custom retention period and redundancy.