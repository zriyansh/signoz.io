---
title: Search Logs
id: search-logs
---

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
