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
    alt="Structured display of a log body containing serialized JSON for an e-commerce Order"
  />
  <figcaption>
    <i>
      Structured display of a log body containing serialized JSON for an e-commerce Order
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
    alt="Log attributes for Country Code and Order Total parsed out of JSON body containing Order details"
  />
  <figcaption>
    <i>
      Log attributes for Country Code and Order Total parsed out of JSON body containing Order details
    </i>
  </figcaption>
</figure>
<br/>

Filtering by log attributes is more
efficient and this also unlocks aggregations based on fields in your JSON data.  

<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/avg-order-value-by-country.png"
    alt="Average Order Value by Country based on log attributes parsed from JSON bodies containing Order details"
  />
  <figcaption>
    <i>
      Average Order Value by Country based on log attributes parsed from JSON bodies containing Order details
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


## Step 1: Navigate to Logs Pipelines Page

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


 ## Step 2: Create a New Pipeline
- Open the "Create New Pipeline" dialog.
    - If you do not have existing pipelines, press the "**New Pipeline**" button.
    - If you already have some pipelines, press the "**Enter Edit Mode**" button and then click the "**Add a New Pipeline**" button at the bottom of the list of pipelines.
- Provide details about the pipeline in the Create Pipeline Dialog.
    - Use the **Name** field to give your pipeline a descriptive short name.
    - Use the **Description** field to add a detailed long description for your pipleine.
    - Use the **Filter** field to select the logs you want to process with this pipeline.<br/> Typically, these are filters identifying the source of the logs you want to process.
    - Use the **Filtered Logs Preview** to verify that the logs you want to process will be selected by the pipeline. <br/> Note that while it is not ideal, it is ok if your filter selects other non JSON logs too.


<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/add-new-pipeline-modal.png"
    alt="Create New Pipeline dialog"
  />
  <figcaption>
    <i>
      Create New Pipeline dialog
    </i>
  </figcaption>
</figure>
<br/>


- Press the "**Create**" button if everything looks right.


## Step 3: Add Processors for Parsing Desired Fields into Log Attributes
Each added attribute increases the size of your log records in the database. So it is often desirable to parse only a few fields of interest out of the JSON body into their own log attributes.  
To achieve this, we will first use a JSON processor to parse the log body into a temporary attribute, then we will move the desired fields from the temporary attribute into their own log attributes, and finally remove the temporary log attribute. 

- Expand the new Pipeline to add processors to it.
<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/newly-created-json-parsing-pipeline.png"
    alt="Clicking Create Pipeline adds a new Pipeline at the end of Pipelines List. It can be expanded by clicking the highlighted icon."
  />
  <figcaption>
    <i>
      Clicking "Create Pipeline" adds a new Pipeline at the end of Pipelines List. It can be expanded by clicking the highlighted icon.
    </i>
  </figcaption>
</figure>
<br/>
<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/json-pipeline-add-processor-button.png"
    alt="Expanding a pipeline shows the Add Processor button"
  />
  <figcaption>
    <i>
      Expanding a pipeline shows the Add Processor button
    </i>
  </figcaption>
</figure>
<br/>

- Add a processor to parse the JSON log body into a temporary attribute.
  - Click the **Add Processor** Button to bring up the Dialog for adding a new processor.
  - Select `Json Parser` in the **Select Processor Type** field.
  - Use the **Name of Json Parser Processor** field to set a short descriptive name for the processor.
  - Set the **Parse From** field to `body` <br/>
  - Use **Parse To** field to define the attribute where the parsed JSON body should be stored temporarily. For example `attributes.temp_parsed_body`.
  <figure data-zoomable align="center">
    <img
      src="/img/logs/pipelines/add-json-parsing-processor-dialog.png"
      alt="Add New Processor Dialog"
    />
    <figcaption>
      <i>
        Add New Processor Dialog
      </i>
    </figcaption>
  </figure>
  - Press the **Create** button to finish adding the processor.

<br/>

- Add **Move** processors to get desired fields out of the temporary attribute containing parsed JSON into their own log attributes.
  - Click the **Add Processor** Button to bring up the Dialog for adding a new processor.
  - Select `Move` in the **Select Processor Type** field.
  - Use the **Name of Move Processor** field to set a short descriptive name for the processor.
  - Set the **From** field to the path of the JSON field to be extracted into its own attribute. For example `attributes.temp_parsed_body.country`
  - Use **To** field to define the attribute where the JSON field should be stored.
<br/>
<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/add-move-processor-for-country.png"
    alt="Add Move Processor Dialog"
  />
  <figcaption>
    <i>
      Add Move Processor Dialog
    </i>
  </figcaption>
</figure>
  - Press the **Create** button to finish adding the processor.
  - Repeat these steps to create a **Move** processor for moving each desired JSON field into its own log attribute.

<br/>

- Add processor for removing attribute used for temporarily storing the parsed JSON log body.
  - Click the **Add Processor** Button to bring up the Dialog for adding a new processor.
  - Select `Remove` in the **Select Processor Type** field.
  - Use the **Name of Remove Processor** field to set a short descriptive name for the processor.
  - Set **Field** input to the path of the attribute we used for storing parsed JSON body temporarily. For example `attributes.temp_parsed_body`
<br/>
<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/json-parser-remove-temp-attribute.png"
    alt="Remove Processor Dialog"
  />
  <figcaption>
    <i>
      Remove Processor Dialog
    </i>
  </figcaption>
</figure>
  - Press the **Create** button to finish adding the processor.
<br/>

## Step 4: Preview and Validate Pipeline Processing 

## Step 5: Save Pipelines and Verify

## Recap

<!---
TODO(Raj): Add these sections after relevant guides are in place.

You can also [parse serialized JSON data out of fields other than the log body](/docs/logs-pipelines/parse-json-from-non-body-fields.md).

Adding log attributes increases the size of your log records. You can
keep costs in check by [retaining only a portion of the parsed JSON data](/docs/logs-pipelines/retain-only-a-portion-of-parsed-json.md).
--> 