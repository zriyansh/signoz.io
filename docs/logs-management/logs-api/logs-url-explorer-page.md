---
title: Create Logs URL for Explorer page
id: logs-url-for-explorer-page
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

