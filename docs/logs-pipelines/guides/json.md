---
id: json
title: Parse JSON Logs
---

# Parse JSON logs with Pipelines

If your logs contain serialized JSON in their bodies, the detail view for a log in Signoz UI will
display its body in a parsed easy to use structure. You can also
[filter your logs based on JSON data in the body](/docs/userguide/logs_query_builder/#writing-json-filters-in-the-new-logs-explorer).  

<figure data-zoomable align="center">
  <img
    src="/img/logs/json_log_filter.png"
    alt="Structured display of a log body containing serialized JSON"
  />
  <figcaption>
    <i>
      Structured display of a log body containing serialized JSON
    </i>
  </figcaption>
</figure>
<br/>

While these powerful features work out of the box, you can take things
up a notch by pre-processing your log records to parse data out of
JSON bodies into log attributes. Filtering by log attributes is more
efficient and this also unlocks aggregations based on fields in your JSON data.  
The parsed attributes can also be used to further enrich your log records. For example, if the serialized JSON contained trace information, you could
[populate trace details](/docs/logs-pipelines/guides/trace.md) in your log records from the parsed attributes, enabling correlation of your logs to and from corresponding traces.  



In this guide, you will see how to parse serialized JSON data out of log bodies
into log attributes.

 ## Prerequisites
 - You are sending logs to SigNoz.
 - Your logs contain serialized JSON data in the body.

 ### Step 1 - Navigate to Logs Pipelines Page


 ### Step 2 - Create a New Pipeline
 - Press the right button
 - Name your pipeline and add a description
 - Pick a filter for the source of your logs.
 - Preview, verify and press create.


### Step 3 - Add a JSON parsing processor
 - Add a JSON parser.
 - Parse into attributes
 - Preview and verify it works.

### Step 4 - Save Pipelines and Verify

### Recap

<!---
TODO(Raj): Add these sections after relevant guides are in place.

You can also [parse serialized JSON data out of fields other than the log body](/docs/logs-pipelines/parse-json-from-non-body-fields.md).

Adding log attributes increases the size of your log records. You can
keep costs in check by [retaining only a portion of the parsed JSON data](/docs/logs-pipelines/retain-only-a-portion-of-parsed-json.md).
--> 