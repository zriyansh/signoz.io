---
id: upgrade-0.9.0
title: Upgrade to 0.9.0
sidebar_label: Upgrade to 0.9.0
---
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

# Upgrade to 0.9.0 from earlier versions

v0.9.0 is a breaking release which requires data migration, if you are upgrading from an older version then you have to run the data migration scripts to be able to see past data.

## First upgrade to 0.9.0

Follow the plaform specific instructions to upgrade to 0.9.0 and above.

## Steps to run migration script:

### Docker

Change the directory to SigNoz repo and run following commands:

```bash
cd deploy/docker/clickhouse-setup
```

#### ClickHouse

```bash
docker run --name signoz-migrate-clickhouse --network clickhouse-setup_default -it signoz/migrate:0.9-clickhouse -host=clickhouse -port=9000
```

#### SQLite

```bash
docker run --name signoz-migrate-sqlite --network clickhouse-setup_default -it -v $PWD/data/signoz/:/var/lib/signoz/ signoz/migrate:0.9-sqlite
 -dataSource /var/lib/signoz/signoz.db
```


### Kubernetes

#### ClickHouse

```bash
kubectl -n platform run -i -t signoz-migrate-clickhouse --image=signoz/migrate:0.9-clickhouse \
  -- -host=my-release-clickhouse -port=9000 -userName=admin -password=27ff0399-0d3a-4bd8-919d-17c2181e6fb9
```

Steps to check logs:

```bash
kubectl -n platform logs -f signoz-migrate-clickhouse
```

In case of failure and have to run again, make sure to cleanup the pod before running the migration script again.

```bash
kubectl -n platform delete pod signoz-migrate-clickhouse
```

There are some custom flags which can be enabled based on different usecases.

All the flags below are `optional`

Flags:

- `-port` : Specify port of clickhouse. `default=9000`
- `-host` : Specify host of clickhouse. `default=127.0.0.1`
- `-userName` : Specify user name of clickhouse. `default=default`
- `-password` : Specify password of clickhouse. `default=""`
- `-dropOldTable` : If it is set to true then the old tables will be dropped after data migration is successful `default=true`

#### SQLite

