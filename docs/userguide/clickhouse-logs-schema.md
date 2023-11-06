---
title: Logs Schema and Writing ClickHouse Queries for Building Dashboard Panels.
id: logs_clickhouse_queries
---

At SigNoz we store our data on ClickHouse. In this documentation we will go throught the schema of the logs table and how we can write clickhouse queries to create different dashboard panels from Logs Data.

# Logs Schmea

If we check the schema of logs table in clickhouse this is what it looks like. Now this table was created with respect to the [OpenTelemetry Logs Data Model](https://opentelemetry.io/docs/specs/otel/logs/data-model/)

```
CREATE TABLE signoz_logs.logs
(
    `timestamp` UInt64 CODEC(DoubleDelta, LZ4),
    `observed_timestamp` UInt64 CODEC(DoubleDelta, LZ4),
    `id` String CODEC(ZSTD(1)),
    `trace_id` String CODEC(ZSTD(1)),
    `span_id` String CODEC(ZSTD(1)),
    `trace_flags` UInt32,
    `severity_text` LowCardinality(String) CODEC(ZSTD(1)),
    `severity_number` UInt8,
    `body` String CODEC(ZSTD(2)),
    `resources_string_key` Array(String) CODEC(ZSTD(1)),
    `resources_string_value` Array(String) CODEC(ZSTD(1)),
    `attributes_string_key` Array(String) CODEC(ZSTD(1)),
    `attributes_string_value` Array(String) CODEC(ZSTD(1)),
    `attributes_int64_key` Array(String) CODEC(ZSTD(1)),
    `attributes_int64_value` Array(Int64) CODEC(ZSTD(1)),
    `attributes_float64_key` Array(String) CODEC(ZSTD(1)),
    `attributes_float64_value` Array(Float64) CODEC(ZSTD(1)),
    `attributes_bool_key` Array(String) CODEC(ZSTD(1)),
    `attributes_bool_value` Array(Bool) CODEC(ZSTD(1)),
    INDEX body_idx body TYPE tokenbf_v1(10240, 3, 0) GRANULARITY 4,
    INDEX id_minmax id TYPE minmax GRANULARITY 1,
    INDEX severity_number_idx severity_number TYPE set(25) GRANULARITY 4,
    INDEX severity_text_idx severity_text TYPE set(25) GRANULARITY 4,
    INDEX trace_flags_idx trace_flags TYPE bloom_filter GRANULARITY 4
)
ENGINE = MergeTree
PARTITION BY toDate(timestamp / 1000000000)
ORDER BY (timestamp, id)
TTL toDateTime(timestamp / 1000000000) + toIntervalSecond(1296000)
SETTINGS index_granularity = 8192, ttl_only_drop_parts = 1
```

There is a distributed logs table which is references the above table table in each shard. The name of the table is `distributed_logs`. The schema is same as above.
Note:- Any queries that we write will be written for the `distributed_logs` table.

**timestamp** : Time when the log line was generated at the source. The default value is the time at which it is received and it can be changed using the [time parser](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/time_parser.md).

**observed_timestamp** : Time when the log line as observed at the collection system. It is automatically added by the collector.

**id**: It is a [ksuid](https://github.com/segmentio/ksuid), it helps us in pagniating and sorting log lines. It is automatically added by the collector.

**trace_id** : Trace ID of the log line. [W3C Trace Context](https://www.w3.org/TR/trace-context/#trace-id). It can be filled using [trace parser](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/trace_parser.md).

**span_id** : Span ID for the log line or set of log line that are part of a particular processing span. It can be filled using [trace parser](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/trace_parser.md).

**trace_flags** : Trace Flag of the log line.  [W3C Trace Context](https://www.w3.org/TR/trace-context/#trace-flags). It can be filled using [trace parser](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/trace_parser.md).

**severity_text** : It is the log level. eg:- `info` . It can be filled using [severity parser](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/severity_parser.md)

**severity_number** : Numerical value of the severity text. [more](https://opentelemetry.io/docs/specs/otel/logs/data-model/#field-severitynumber). It can be filled using [severity parser](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/severity_parser.md)

**body** : The body/message of the log record. 

**resources_string_key** : If we have a resource named `source: nginx` . Then `source` is stored in this column in an array.

**resource_string_value** : If we have a resource named `source: nginx` . Then `nginx` is stored in this column in an array.

**attributes_string_key** : If we have a string attribute named `method: GET` . Then `method` is stored in this column in an array.

**attributes_string_value** : If we have a string attribute named `method: GET` . Then `GET` is stored in this column in an array.

**attributes_int64_key** : If we have a integer attribute named `bytes: 100` . Then `bytes` is stored in this column in an array.

**attributes_int64_value** : If we have a integer attribute named `bytes: 100` . Then `100` is stored in this column in an array.

**attributes_float64_key** : If we have a floating attribute named `delay: 10.0` . Then `delay` is stored in this column in an array.

**attributes_float64_value** : If we have a floating attribute named `dealy: 10.0` . Then `10.0` is stored in this column in an array.

**attributes_bool_key** : If we have a boolean attribute named `success: true` . Then `success` is stored in this column in an array.

**attributes_bool_value** : If we have a boolean attribute named `success: true` . Then `true` is stored in this column in an array.

The attributes and resources can be added transformed using different processors and operators. You can read more about them [here](/docs/userguide/logs/#operators-for-parsing-and-manipulating-logs)


## Writing Clickhouse Queries Dashboard Panels with examples.

While writing queies for logs table, if you want to use an attribute/resource attribute in your query you will have to reference it in the following format
`<type>_<dataType>_value[indexOf(<type>_<dataType>_key, <keyname>)]` 

where `type` can be `attributes/resources` , `dataType` can be `int64/float64/string` and `keyname` is the name of the key.

Eg: If your `keyname` is `status` of `dataType` `string` and `type` `attribute`, it needs to be referenced as `attributes_string_value[indexOf(attributes_string_key, 'status')]`

Note:- In the above example, if `status` is an [selected(indexed) field](/docs/userguide/logs_fields/#selected-log-fields), then it can be referenced as
`attribute_string_status`

### Timeseries

Show count of log lines per minute

```
SELECT toStartOfInterval(fromUnixTimestamp64Nano(timestamp), INTERVAL 1 MINUTE) AS interval, 
toFloat64(count()) AS value 
FROM signoz_logs.logs  
WHERE (timestamp >= toUnixTimestamp64Nano(toDateTime64({{.start_datetime}}, 0)) AND timestamp <= toUnixTimestamp64Nano(toDateTime64({{.end_datetime}}, 0)))   
GROUP BY interval 
ORDER BY interval ASC;
```

Show count of log lines per minute where `severity_text = 'INFO'``
```
toFloat64(count()) AS value 
FROM signoz_logs.logs  
WHERE (timestamp >= toUnixTimestamp64Nano(toDateTime64({{.start_datetime}}, 0)) AND timestamp <= toUnixTimestamp64Nano(toDateTime64({{.end_datetime}}, 0)))   
AND severity_text='INFO'
GROUP BY interval 
ORDER BY interval ASC;
```

Show count of log lines per minute where `severity_text = 'INFO'` ,  `method = 'GET'` , `service_name = 'demo'`. Here `method` is an attribute while `service_name` is a resource attribute.
```
toFloat64(count()) AS value 
FROM signoz_logs.logs  
WHERE (timestamp >= toUnixTimestamp64Nano(toDateTime64({{.start_datetime}}, 0)) AND timestamp <= toUnixTimestamp64Nano(toDateTime64({{.end_datetime}}, 0)))   
AND severity_text='INFO' AND attributes_string_value[indexOf(attributes_string_key, 'method')] = 'GET' AND resources_string_value[indexOf(resources_string_key, 'service_name')] = 'demo'
GROUP BY interval 
ORDER BY interval ASC;
```

Show count of log lines per minute where `severity_text = 'INFO'` ,  `method = 'GET'` , `service_name = 'demo'`. Here `method` is an attribute while `service_name` is a resource attribute and both `method` and `service_name` is [selected(indexed)](/docs/userguide/logs_fields/#selected-log-fields).
```
toFloat64(count()) AS value 
FROM signoz_logs.logs  
WHERE (timestamp >= toUnixTimestamp64Nano(toDateTime64({{.start_datetime}}, 0)) AND timestamp <= toUnixTimestamp64Nano(toDateTime64({{.end_datetime}}, 0)))   
AND severity_text='INFO' AND attribute_string_method = 'GET' AND resource_string_service_name = 'demo'
GROUP BY interval 
ORDER BY interval ASC;
```