---
title: Search Traces
id: search-traces
---
This section provides detailed examples of searching traces using the SigNoz Traces API. The example queries demonstrate querying traces with specific attributes and filters.

## Searching All Spans

The following example searches for all spans where `deployment_name=hotrod`, `httpMethod=GET`, and `hasError=true`. Here, `deployment_name` is a resource attribute, `httpMethod` and `hasError` is a tag attribute which is also a column.
Selected columns are `serviceName`, `httpMethod`, `responseStatusCode`, and `httpUrl`.
You can choose the start and end timestamp in unix format (milliseconds) according to your use case.

### Sample Payload 

This is the JSON payload for the example query described above for fetching spans.

```json
{
    "start": 1702009280000,
    "end": 1702011080000,
    "step": 60,
    "variables": {},
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "list",
        "builderQueries": {
            "A": {
                "dataSource": "traces",
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
                                "isColumn": false
                            },
                            "op": "=",
                            "value": "hotrod"
                        },
                        {
                            "key": {
                                "key": "httpMethod",
                                "dataType": "string",
                                "type": "tag",
                                "isColumn": true
                            },
                            "op": "=",
                            "value": "GET"
                        },
                        {
                            "key": {
                                "key": "hasError",
                                "dataType": "bool",
                                "type": "tag",
                                "isColumn": true
                            },
                            "op": "=",
                            "value": "true"
                        }
                    ],
                    "op": "AND"
                },
                "expression": "A",
                "disabled": false,
                "having": [],
                "stepInterval": 60,
                "limit": 10,
                "orderBy": [
                    {
                        "columnName": "timestamp",
                        "order": "desc"
                    }
                ],
                "groupBy": [],
                "legend": "",
                "reduceTo": "sum",
                "offset": 0,
                "selectColumns": [
                    {
                        "key": "serviceName",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true
                    },
                    {
                        "key": "httpMethod",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true
                    },
                    {
                        "key": "responseStatusCode",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true
                    },
                    {
                        "key": "httpUrl",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true
                    }
                ]
            }
        }
    },
    "dataSource": "traces"
}
```

## Searching Root Spans

The following example searches for root spans where `deployment_name=hotrod` and `httpMethod=GET`. Here, `deployment_name` is a resource attribute, `httpMethod` is a tag attribute which is also a column.
Selected columns are `serviceName`, `httpMethod`, `responseStatusCode`, and `some_custom_tag`.
You can choose the start and end timestamp in unix format (milliseconds) according to your use case.
To search for root spans, you need to add `parentSpanID=''` in the filters.

### Sample Payload 

This is the JSON payload for the example query described above for fetching spans.

```json
{
    "start": 1702009280000,
    "end": 1702011080000,
    "step": 60,
    "variables": {},
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "list",
        "builderQueries": {
            "A": {
                "dataSource": "traces",
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
                                "isColumn": false
                            },
                            "op": "=",
                            "value": "hotrod"
                        },
                        {
                            "key": {
                                "key": "httpMethod",
                                "dataType": "string",
                                "type": "tag",
                                "isColumn": true
                            },
                            "op": "=",
                            "value": "GET"
                        },
                        {
                            "key": {
                                "key": "parentSpanID",
                                "dataType": "string",
                                "type": "tag",
                                "isColumn": true
                            },
                            "op": "=",
                            "value": ""
                        }
                    ],
                    "op": "AND"
                },
                "expression": "A",
                "disabled": false,
                "having": [],
                "stepInterval": 60,
                "limit": 10,
                "orderBy": [
                    {
                        "columnName": "timestamp",
                        "order": "desc"
                    }
                ],
                "groupBy": [],
                "legend": "",
                "reduceTo": "sum",
                "offset": 0,
                "selectColumns": [
                    {
                        "key": "serviceName",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true
                    },
                    {
                        "key": "httpMethod",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true
                    },
                    {
                        "key": "responseStatusCode",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true
                    },
                    {
                        "key": "some_custom_tag",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": false
                    }
                ]
            }
        }
    },
    "dataSource": "traces"
}
```
