---
title: Aggregate Logs
id: aggregate-logs
---

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


