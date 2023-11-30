---
title: Logs API Payload Model
id: payload-model
---

## Logs API Payload Model
The logs API accepts a json payload which has different fields and nested fields.
Each field and nested field is explained below.

### Top-level model 

The top-level model looks like this and is broken down into further tables

|  NAME  | DESCRIPTION  |
|---|---|
|start| Epoch timestamp start in ms/ns |
|end | Epoch timestamp end in ms/ns |
|step | Aggreagtion interval for the query in seconds |
|compositeQuery | This contains the [**compositeQuery**](#compositequery) which is explained below |

### compositeQuery

This table explains what a compositeQuery consists of

|  NAME  | DESCRIPTION  |
|---|---|
|queryType| Type of query i.e builder/clickhouse/prometheus. Scope of this doc is limited to **builder**|
|panelType| Type of panel i.e list/graph/table |
|offset| Offset used in pagination |
|pageSize| Number of items to be fetched, used in list view |
|limit| For list: - Maximum number of items to be paginate, i.e offset + pageSize cannot exceed limit, For aggreation:- limit on the results  |
|builderQueries | Map of [**builderQuery**](#builderquery) |

### builderQuery

This table explains what a builderQuery consists of

|  NAME  | DESCRIPTION  |
|---|---|
|stepInterval| Aggreagtion interval for the query in seconds |
|queryName| Name of the query, should be same as the key to this map value | 
|dataSource| Source of data i.e metrics/traces/logs. We will use logs in this case |
|aggregateOperator| Type of aggreation - noop, count, count_distinct, sum, avg, min, max, p05, p10, p20, p25, p50, p75, p90, p95, p99, rate, sum_rate, avg_rate, min_rate, max_rate, rate_sum, rate_avg, rate_min, rate_max|
|aggregateAttribute| The [**attribute**](#attribute) against which the aggregateOperator is to be applied |
|filters| Array of [**filter**](#filter) used for filtering data|
|groupBy| Array  of [**attribute**](#attribute) used for group By|
|expression| Expression which will be same as query name but different in case of formulas|
|disabled| Specified if the query is disabled |


### filter

This table explains what a filter looks like

|  NAME  | DESCRIPTION  |
|---|---|
|items| Array of [**filterItem**](#filteritem)|
|op| How the final items are joined i.e AND|

### filterItem

This table explains what a filterItem looks like

|  NAME  | DESCRIPTION  |
|---|---|
|key | Corresponding [**attribute**](#attribute) |
|op| Operators -  =, !=, >, >=, <, <=, in, nin, contains, ncontains, regex, nregex, like, nlike, exists, nexists, has, nhas |
|value | Value for the filter, can be empty for some **op** |

### attribute 

This table explains what an attribute looks like

|  NAME  | DESCRIPTION  |
|---|---|
|key| Name of the key |
|type| Type of the key i.e tag/resource. It is empty for top level fields. (eg:- tag = method, resource = k8s_deployment_name, (empty) = trace_id |
|dataType| Type of the key i.e string, int64, float64, bool |
|isColumn| If it has a materialized column i.e selected field |
|isJson| If the key is a json key |
