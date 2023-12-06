---
id: trace
title: Parse Trace Information
---

# Parse Trace Information for your Logs

## Overview
If your logs contain trace information outside the standard opentelemetry fields, you can use log pipelines to parse that information into the right fields and enable correlation of your logs to and from corresponding traces.  

<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/log-before-trace-parsing.png"
    alt="A log with trace information in attributes."
  />
  <figcaption>
    <i>
      A log with trace information in attributes.
    </i>
  </figcaption>
</figure>
<br/>

<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/log-after-trace-parsing.png"
    alt="Log with trace information parsed out of log attributes."
  />
  <figcaption>
    <i>
      Log with trace information parsed out of log attributes.
    </i>
  </figcaption>
</figure>
<br/>


 ## Prerequisites
 - You are [sending logs to SigNoz](/docs/userguide/logs).
 - Your logs contain trace information in log attributes.
    - Note: If your logs contain trace information in the body, you can
    [parse them](/docs/logs-pipelines/guides/json) out into their own attributes before populating trace information based on them.

<!-- TODO(Raj): Add link for regex parsing text logs too -->

## Create a Pipeline to Parse Trace Information out of Log Attributes
You can follow the steps below to create a log pipeline for populating trace
information based on data in log attributes.


### Step 1: Navigate to Logs Pipelines Page

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


### Step 2: Create a New Pipeline
- Open the "Create New Pipeline" dialog.
    - If you do not have existing pipelines, press the "**New Pipeline**" button.
    <figure data-zoomable align="center">
      <img
        src="/img/logs/pipelines/empty-state-new-pipeline-button.png"
        alt="New Pipeline Button"
      />
      <figcaption>
        <i>
          New Pipeline Button
        </i>
      </figcaption>
    </figure>
    <br/>

    - If you already have some pipelines, press the "**Enter Edit Mode**" button and then click the "**Add a New Pipeline**" button at the bottom of the list of pipelines.
    <figure data-zoomable align="center">
      <img
        src="/img/logs/pipelines/enter-edit-mode.png"
        alt="Enter edit mode button"
      />
      <figcaption>
        <i>
          Enter Edit Mode button
        </i>
      </figcaption>
    </figure>
    <br/>
    <figure data-zoomable align="center">
      <img
        src="/img/logs/pipelines/add-a-new-pipeline.png"
        alt="Add a New Pipeline button"
      />
      <figcaption>
        <i>
          Add a New Pipeline button
        </i>
      </figcaption>
    </figure>
    <br/>


- Provide details about the pipeline in the Create Pipeline Dialog.
    - Use the **Name** field to give your pipeline a descriptive short name.
    - Use the **Description** field to add a detailed long description for your pipleine.
    - Use the **Filter** field to select the logs you want to process with this pipeline.<br/> Typically, these are filters identifying the source of the logs you want to process. `service = checkout` for example.
    - Use the **Filtered Logs Preview** to verify that the logs you want to process will be selected by the pipeline.
    <br/><br/>
    <figure data-zoomable align="center">
      <img
        src="/img/logs/pipelines/create-new-trace-parsing-pipeline.png"
        alt="Create New Pipeline dialog"
      />
      <figcaption>
        <i>
          Create New Pipeline dialog
        </i>
      </figcaption>
    </figure>

- Press the "**Create**" button if everything looks right.
<br/>


### Step 3: Add Processors for Parsing Trace Information
- Expand the new Pipeline to add processors to it.
<figure data-zoomable align="center">
  <img
    src="/img/logs/pipelines/post-create-trace-parsing-pipeline.png"
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
    src="/img/logs/pipelines/expanded-trace-parsing-processor.png"
    alt="Expanding a pipeline shows the Add Processor button"
  />
  <figcaption>
    <i>
      Expanding a pipeline shows the Add Processor button
    </i>
  </figcaption>
</figure>
<br/>

- Add a processor to parse trace information out of log attributes.
  - Click the **Add Processor** Button to bring up the Dialog for adding a new processor.
  - Select `Trace Parser` in the **Select Processor Type** field.
  - Use the **Name of Trace Parser Processor** field to set a short descriptive name for the processor.
  - Use the **Parse Trace Id From** field to specify the log attribute containing trace id.
  - Use the **Parse Span Id From** field to specify the log attribute containing span id.
  - Use the **Parse Trace Flags From** field to specify the log attribute containing trace flags.
  - Note: Atleast one of the *Parse From* fields must be specified.

  <br/>
  <figure data-zoomable align="center">
    <img
      src="/img/logs/pipelines/create-new-trace-parsing-processor.png"
      alt="Add New Processor Dialog"
    />
    <figcaption>
      <i>
        Add New Processor Dialog
      </i>
    </figcaption>
  </figure>
  <br/>

  - Press the **Create** button to finish adding the processor.
  <br/><br/>

- Optional: Add processors for removing log attributes containing trace information  
  - Click the **Add Processor** Button to bring up the Dialog for adding a new processor.
  - Select `Remove` in the **Select Processor Type** field.
  - Use the **Name of Remove Processor** field to set a short descriptive name for the processor.
  - Set **Field** input to path of the attribute containing trace data. `attributes.traceId` for example.

  <br/>
  <figure data-zoomable align="center">
    <img
      src="/img/logs/pipelines/remove-trace-id-processor.png"
      alt="Remove Processor Dialog"
    />
    <figcaption>
      <i>
        Remove Processor Dialog
      </i>
    </figcaption>
  </figure>
  <br/>

  - Press the **Create** button to finish adding the processor.
  - Repeat these steps to create a **Remove** processor for removing each log attribute whose data has been parsed into trace fields.
  <br/><br/>

<br/>