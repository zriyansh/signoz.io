---
id: json
title: Parse JSON Logs
---

# Parse JSON logs with Pipelines

If your logs contain serialized JSON in their bodies, log details in Signoz UI will
display bodies in a parsed, easy to use structure. You can also
[filter your logs based on JSON data in the body](/docs/userguide/logs_query_builder/#writing-json-filters-in-the-new-logs-explorer).  

<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/json-log-body-filter.png"
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
JSON bodies into log attributes.

<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/attributes-parsed-from-json-body.png"
    alt="Log attributes for country code and order total parsed out of JSON body" 
  />
  <figcaption>
    <i>
      Log attributes for country code and order total parsed out of JSON body
    </i>
  </figcaption>
</figure>
<br/>

Filtering by log attributes is more
efficient and this also unlocks aggregations based on fields in your JSON data.  

<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/avg-order-value-by-country.png"
    alt="Average Order Value by Country based on log attributes parsed out of JSON body"
  />
  <figcaption>
    <i>
      Average Order Value by Country based on log attributes for total and country parsed from the body
    </i>
  </figcaption>
</figure>
<br/>

The parsed attributes can also be used to further enrich your log records. For example, if the serialized JSON contained trace information, you could
[populate trace details](/docs/logs-pipelines/guides/trace.md) in your log records from the parsed attributes, enabling correlation of your logs to and from corresponding traces.  

In this guide, you will see how to parse data from serialized JSON bodies into log attributes.

 ## Prerequisites
 - You are sending logs to SigNoz.
 - Your logs contain serialized JSON data in the body.


 ### Step 1 - Navigate to Logs Pipelines Page

Hover over the **Logs** menu in the sidebar and click on the **Logs Pipeline** submenu item.

<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/navigate-to-logs-pipelines.png"
    alt="Sidebar navigation for getting to Logs Pipelines page"
  />
  <figcaption>
    <i>
      Sidebar navigation for getting to Logs Pipelines page
    </i>
  </figcaption>
</figure>
<br/>


 ### Step 2 - Create a New Pipeline
- Open the "Create New Pipeline" dialogue.
    - If you do not have existing pipelines, press the "**New Pipeline**" button
    - If you already have some pipelines, press the "**Enter Edit Mode**" button and then click the "**Add a New Pipeline**" button at the bottom of the list of pipelines.
- Provide details about the pipeline
    - Name your pipeline and add a description
    - Pick a filter for the source of your logs.
    - Verify the logs you want will be selected by the pipeline. Note that while it is not ideal, it is ok if your filter selects other non JSON logs too



- Press the "**Create**" button if everything looks right.


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