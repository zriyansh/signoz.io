---
id: retention-period
title: Retention Period
---

To set retention period for metrics and traces, you can navigate to the `General` tab on the `Settings` page.

![retention-period](../../static/img/docs/retention-period.webp)

- You can select independent retention period for traces and metrics.
- Also you can set the retention period for cold storage (S3) for both traces and metrics respectively. This can be only set if Cold Storage (eg. S3) is enabled from the backend.
- Click `Save` to save the new retention period after making changes to change the retention period.

### Configuring Cold Storage - Amazon S3

In case of docker, uncomment `storage_configuration` from `clickhouse-config.xml`. Also configure the endpoint, access key and secret.

```xml
<storage_configuration>
	<disks>
		<default>
		</default>
 	    <s3>
 	      <type>s3</type>
		  <endpoint>https://BUCKET-NAME-HERE.s3.amazonaws.com/data/</endpoint>
 	      <access_key_id>ACCESS-KEY-ID-HERE</access_key_id>
 	      <secret_access_key>SECRET-ACCESS-KEY-HERE</secret_access_key>
 	    </s3>
	</disks>
	<policies>
		<tiered>
    	<volumes>
    	  <default>
    	    <disk>default</disk>
    	  </default>
    	  <s3>
    	    <disk>s3</disk>
    	  </s3>
    	</volumes>
        </tiered>
	</policies>
</storage_configuration>
```

In case of helm charts, update the `clickhouse.coldStorage` in `values.yaml`.

```yaml
clickhouse:
  coldStorage:
    enabled: true
    # Set free space size on default disk
    defaultKeepFreeSpaceBytes: "10485760" # 10MiB
    endpoint: https://<bucket-name>.s3.amazonaws.com/data/
    accessKey: <access_key_id>
    secretAccess: <secret_access_key>
```
