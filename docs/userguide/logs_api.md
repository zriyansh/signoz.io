---
title: Logs API Documentation
id: logs_api
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In this doc, we will go through the logs API through which you can fetch logs and run different kinds of aggregation.

```
POST /api/v3/query_range
```

## Logs API Payload Model
The payload looks like this
<Tabs>
<TabItem value="Model" label="Model" default>


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


</TabItem>

<TabItem value="Example-Search-logs" label="Example Search Logs">

In this example, we are going to search logs where `deployment_name=hotrod, method=get, severity_text=info`, where `deployment_name` is a resource attribute, `method` is a 
tag attribute and `severity_text` is a top-level field.
Start and end timestamps will vary according to your use case. 

```json
{
    "start": 1700733979000,
    "end": 1700737579000,
    "step": 60,
    "variables": {},
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "list",
        "builderQueries": {
            "A": {
                "dataSource": "logs",
                "queryName": "A",
                "aggregateOperator": "noop",
                "aggregateAttribute": {},
                "filters": {
                    "items": [
                        {
                            "key": {
                                "key": "deployment_name",
                                "dataType": "string",
                                "type": "resource",
                                "isColumn": false,
                            },
                            "op": "=",
                            "value": "hotrod"
                        }
                        {
                            "key": {
                                "key": "method",
                                "dataType": "string",
                                "type": "tag",
                                "isColumn": false,
                            },
                            "op": "=",
                            "value": "get"
                        }
                        {
                            "key": {
                                "key": "severity_text",
                                "dataType": "string",
                                "type": "",
                                "isColumn": true,
                            },
                            "op": "=",
                            "value": "info"
                        }
                    ],
                    "op": "AND"
                },
                "expression": "A",
                "disabled": false,
                "stepInterval": 60,
                "orderBy": [
                    {
                        "columnName": "timestamp",
                        "order": "desc"
                    }
                ],
                "pageSize": 100
            }
        }
    }
}
```

</TabItem>

<TabItem value="Example-logs-pagination" label="Example Logs Pagination">

## Pagination while Ordering by Timestamp

If we are ordering by `timestamp`, then we will use `id` and `pageSize` for pagination.

### Latest 10 logs
```json
{
    "start": 1700734490000,
    "end": 1700738090000,
    "step": 60,
    "dataSource": "logs",
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "list",
        "builderQueries": {
            "A": {
                "queryName": "A",
                "dataSource": "logs",
                "aggregateOperator": "noop",
                "expression": "A",
                "disabled": false,
                "pageSize": 10,
                "stepInterval": 60,
                "filters": {
                    "items": [
                    ],
                    "op": "AND"
                },
                "orderBy": [
                    {
                        "columnName": "timestamp",
                        "order": "desc"
                    }
                ]
            }
        }
    }
}
```

### Previous 10 logs

Here we are adding an `id` filter and saying that `id < (id of log last line received in the previous request)` 
```json
{
    "start": 1700734490000,
    "end": 1700738090000,
    "step": 60,
    "dataSource": "logs",
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "list",
        "builderQueries": {
            "A": {
                "queryName": "A",
                "dataSource": "logs",
                "aggregateOperator": "noop",
                "expression": "A",
                "disabled": false,
                "pageSize": 10,
                "filters": {
                    "items": [
                        {
                            "key": {
                                "key": "id",
                                "type": "",
                                "dataType": "string",
                                "isColumn": true
                            },
                            "op": "<",
                            "value": "2QSbeXlRK0dyXIwJhLJBBtrZzxu"
                        }
                    ],
                    "op": "AND"
                },
                "orderBy": [
                    {
                        "columnName": "timestamp",
                        "order": "desc"
                    }
                ]
            }
        }
    }
}
```

## Pagination while Ordering by Any Other Key

This might be faster or slower depending on the key that you are using

### Latest 10 logs
```json
{
    "start": 1700734490000,
    "end": 1700738090000,
    "step": 60,
    "dataSource": "logs",
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "list",
        "builderQueries": {
            "A": {
                "queryName": "A",
                "dataSource": "logs",
                "aggregateOperator": "noop",
                "expression": "A",
                "disabled": false,
                "pageSize": 10,
                "offset": 0,
                "limit": 100,
                "filters": {
                    "items": [
                    ],
                    "op": "AND"
                },
                "orderBy": [
                    {
                        "columnName": "response_time",
                        "order": "desc"
                    }
                ]
            }
        }
    }
}
```

### Previous 10 logs

Here we are adding `offset=10` since we fetched the first 10 logs in the previous request. 
```json
{
    "start": 1700734490000,
    "end": 1700738090000,
    "step": 60,
    "dataSource": "logs",
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "list",
        "builderQueries": {
            "A": {
                "queryName": "A",
                "dataSource": "logs",
                "aggregateOperator": "noop",
                "expression": "A",
                "disabled": false,
                "pageSize": 10,
                "offset": 10,
                "limit": 100,
                "filters": {
                    "items": [
                    ],
                    "op": "AND"
                },
                "orderBy": [
                    {
                        "columnName": "response_time",
                        "order": "desc"
                    }
                ]
            }
        }
    }
}
```

</TabItem>

<TabItem value="Example-Aggregate-logs" label="Example Aggregate Logs">

In this example, we are going to count distinct `component` and group by `container_id` .
Start and end timestamps will vary according to your use case. 

```json
{
    "start": 1700734490000,
    "end": 1700738090000,
    "step": 60,
    "variables": {},
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "table",
        "builderQueries": {
            "A": {
                "dataSource": "logs",
                "queryName": "A",
                "aggregateOperator": "count_distinct",
                "aggregateAttribute": {
                    "key": "component",
                    "dataType": "string",
                    "type": "tag",
                    "isColumn": false
                },
                "filters": {
                    "items": [],
                    "op": "AND"
                },
                "expression": "A",
                "disabled": false,
                "stepInterval": 60,
                "orderBy": [
                    {
                        "columnName": "timestamp",
                        "order": "desc"
                    }
                ],
                "groupBy": [
                    {
                        "key": "container_id",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true,
                        "isJSON": false
                    }
                ],
                "offset": 0
            }
        }
    }
}
```

</TabItem>
</Tabs>

&nbsp; 
---

---

## Creating Logs URL For Explorer Page

We will go through how we can generate the URL for the explorer page through which we can directly land on the explorer page with filters and custom timerange. 


```
/logs-explorer?
```

### Params for the URL

The `URI encoded` column describes how many times the value has to be [URI encoded](https://meyerweb.com/eric/tools/dencoder/)

|  NAME  | DESCRIPTION  | URI encoded |
|---|---|---|
|panelTypes| "list"/"graph"/"table"| once |
|compositeQuery| It's a JSON structure consisting of `builderQueries` |twice |
|startTime| Timestamp start in ms| no |
|endTime| Timestamp end in ms| no |



Example of `compositeQuery` . Here we can see the `builderQueries` map is represented as an array inside `queryData`
```json
{
  "queryType": "builder",
  "builder": {
    "queryData": [
      {
        "dataSource": "logs",
        "queryName": "A",
        "aggregateOperator": "noop",
        "aggregateAttribute": {
        },
        "filters": {
          "items": [
            {
              "id": "81c40cb5",
              "key": {
                "key": "container_name",
                "dataType": "string",
                "type": "tag",
                "isColumn": false,
                "isJSON": false,
                "id": "container_name--string--tag--false"
              },
              "op": "=",
              "value": "hotrod"
            }
          ],
          "op": "AND"
        },
        "expression": "A",
        "disabled": false,
        "having": [],
        "stepInterval": 240,
        "limit": null,
        "orderBy": [
          {
            "columnName": "timestamp",
            "order": "desc"
          }
        ],
        "groupBy": [],
        "legend": "",
        "reduceTo": "sum"
      }
    ],
    "queryFormulas": []
  },
  "id": "af9df71b-b6eb-48e5-b889-f4d0946c6eaa"
}
```