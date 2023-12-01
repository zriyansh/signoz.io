---
title: Logs API Payload Model
id: payload-model
---

The SigNoz Logs API uses a JSON payload for queries, which includes various fields and nested fields. This document provides a detailed explanation of each field to help users construct effective queries.

### Top-level  

The top-level of the payload model has the following fields:

|  NAME  | DESCRIPTION  |
|---|---|
|start| Epoch timestamp marking the start of the query range (in milliseconds or nanoseconds) |
|end | Epoch timestamp marking the end of the query range (in milliseconds or nanoseconds) |
|step | Aggregation interval for the query, specified in seconds |
|compositeQuery | This contains the [**compositeQuery**](#composite-query) which is explained below |

### Composite Query

The `compositeQuery` field consists of:

|  NAME  | DESCRIPTION  |
|---|---|
|queryType| Type of query (e.g., builder, clickhouse, prometheus).Scope of this documentation is limited to **builder** type|
|panelType| Type of panel (e.g., list, graph, table) |
|offset| Offset used in pagination |
|pageSize| Number of items to fetch, used in list view |
|limit| For list view: - Maximum number of items to be paginate, i.e., offset + pageSize cannot exceed limit, For aggreation:- limit on the results  |
|builderQueries | Map of [**builderQuery**](#builder-query) |

### Builder Query

A `builderQuery` consists of:

|  NAME  | DESCRIPTION  |
|---|---|
|stepInterval| Aggreagtion interval for query in seconds |
|queryName| Name of the query, should match the key to this map value | 
|dataSource| Source of data (e.g., metrics, traces, logs). This documentation uses 'logs'. |
|aggregateOperator| Type of aggreation - noop, count, count_distinct, sum, avg, min, max, p05, p10, p20, p25, p50, p75, p90, p95, p99, rate, sum_rate, avg_rate, min_rate, max_rate, rate_sum, rate_avg, rate_min, rate_max|
|aggregateAttribute| The [**attribute**](#attribute) against which the aggregateOperator is applied |
|filters| Array of [**filter**](#filter) used for filtering data|
|groupBy| Array  of [**attribute**](#attribute) used for groupBy|
|expression| Will be same as query name but different in case of formulas|
|disabled| Specifies if the query is disabled |


### Filter

A `filter` consists of:

|  NAME  | DESCRIPTION  |
|---|---|
|items| Array of [**filterItem**](#filter-item)|
|op| Operator defining how final items are joined (e.g., AND, =).

### Filter Item

The `filterItem` includes:

|  NAME  | DESCRIPTION  |
|---|---|
|key | Corresponding [**attribute**](#attribute) |
|op| Operators -  =, !=, >, >=, <, <=, in, nin, contains, ncontains, regex, nregex, like, nlike, exists, nexists, has, nhas |
|value | Value for the filter, can be empty for some **op** |

### Attribute 

An `attribute` consists of:

|  NAME  | DESCRIPTION  |
|---|---|
|key| Name of the key |
|type| Type of the key, i.e., tag/resource. It is empty for top level fields. (e.g., tag = method, resource = k8s_deployment_name, (empty) = trace_id) |
|dataType| Data type of the key (e.g., string, int64, float64, bool) |
|isColumn| Indicates if it has a materialized column, i.e., selected field |
|isJson| Specifies if the key is a JSON key |

## Sample Payload
This sample payload contains the different fields that we looked at above. It queries the SigNoz Logs API for a count of 'error' events, grouped by 'service', over a specified time range.

```json
{
  "start": 1633046400000,
  "end": 1633132800000,
  "step": 60,
  "compositeQuery": {
        "queryType": "builder",
        "panelType": "list",
        "offset": 0,
        "pageSize": 10,
        "limit": 100,
        "builderQueries": {
            "sampleQuery": {
                "stepInterval": 60,
                "queryName": "errorCount",
                "dataSource": "logs",
                "aggregateOperator": "count",
                "aggregateAttribute": "error",
                "filters": [...],
                "groupBy": ["service"],
                "expression": "errorCount",
                "disabled": false
            }
        }
    }
}

```