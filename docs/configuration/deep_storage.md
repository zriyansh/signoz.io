---
id: deep_storage
title: Deep Storage for data
---


Though the simplistic setup uses `storage_type: local`, this does not work in containers.
For local storage to work, the historical and the middle manager must have the same volume for storage. This is not the default behaviour in containiers.

:::caution
Local storage does not work in containers. Must setup other deep storage systems like S3
:::


To set up S3, confiigure below params in `druid.configVars` section in `deploy/kubernetes/platform/values.yaml`:
```
    druid_storage_type: s3
    druid_storage_bucket: signoz-druid
    druid_storage_baseKey: <your base key>
    AWS_ACCESS_KEY_ID: <your secret id>
    AWS_SECRET_ACCESS_KEY: <your secret key>
    AWS_REGION: <your region>
```
