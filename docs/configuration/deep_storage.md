---
id: deep_storage
title: Deep Storage for data
---


Though the simplistic setup uses `storage_type: local`, this does not work in containers.
For local storage to work, the historical and the middle manager must have the same volume for storage. This is not the default behaviour in containers.

:::caution
Local storage does not work in containers. Must setup other deep storage systems like S3
:::

<br></br>

## For docker-compose setup (Kafka + Druid)
1. Uncomment the S3 config section and comment the local storage section in below file
`signoz/deploy/docker/druid-kafka-setup/environment_tiny/common`

2. Provide the needed details in the file to configure S3 setup.

3. Re-install SigNoz by running `./install.sh` again at `signoz/deploy/` folder.

:::note
For S3 permission settings for Kafka + Druid setup - check this [link](https://druid.apache.org/docs/latest/development/extensions-core/s3.html#s3-permissions-settings)
:::

<br></br>

## For Helm Chart setup (Kafka + Druid)
To set up S3, confiigure below params in `druid.configVars` section in `deploy/kubernetes/platform/values.yaml`:
```
    druid_storage_type: s3
    druid_storage_bucket: signoz-druid
    druid_storage_baseKey: <your base key>
    AWS_ACCESS_KEY_ID: <your secret id>
    AWS_SECRET_ACCESS_KEY: <your secret key>
    AWS_REGION: <your region>
```

<br></br>

## S3 config for ClickHouse setup

Coming Soon..
  
:::info
We are still testing the S3 config for Clickhouse, please ping us on [Slack](https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA) if you are interested to test it
:::

