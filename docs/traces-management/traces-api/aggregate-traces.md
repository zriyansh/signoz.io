---
title: Aggregate Traces
id: aggregate-traces
---

This section demonstrates how to perform aggregation operations on trace data using the SigNoz Traces API.

## Example of Aggregating Traces

The following example illustrates how to count `customer` values and group them by `serviceName`. 

### Sample Payload

This is the JSON payload for the example described above for Aggregating spans

```json
{
    "start": 1702019380000,
    "end": 1702021180000,
    "step": 60,
    "variables": {},
    "compositeQuery": {
        "queryType": "builder",
        "panelType": "table",
        "builderQueries": {
            "A": {
                "dataSource": "traces",
                "queryName": "A",
                "aggregateOperator": "count",
                "aggregateAttribute": {
                    "key": "customer",
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
                "having": [],
                "stepInterval": 60,
                "limit": null,
                "orderBy": [
                    {
                        "columnName": "timestamp",
                        "order": "desc"
                    }
                ],
                "groupBy": [
                    {
                        "key": "serviceName",
                        "dataType": "string",
                        "type": "tag",
                        "isColumn": true
                    }
                ],
                "legend": "",
                "reduceTo": "sum"
            }
        }
    },
    "dataSource": "traces"
}
```
