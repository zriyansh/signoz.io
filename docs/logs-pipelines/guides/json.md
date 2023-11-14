---
id: json
title: Parse JSON Logs
---

# Parse JSON logs with Pipelines

If you are sending logs containing serialized JSON to SigNoz, you can take things a step further by parsing the JSON data into log attributes. This will enable more efficient logs queries and unlock aggregations based on the parsed data.  
The parsed attributes can also be used to further enrich your log records. For example, you could populate trace data in logs from trace information in your parsed attributes.  

In this guide, you will see how you can parse your JSON logs into attributes. Read on for details.

 ## Prerequisites
 - You are sending logs to SigNoz.
 - Your logs contain serialized JSON data.

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

### Bonus - Parse only some of the attributes in your JSON logs.
- Consider making this its own article.
- Show an example
- Edit the JSON parser you just added and parse to a temp attribute.
- Add a processor for moving the interesting field out of temp attribute to attributes.
- Add a processor for removing the temp attribute
- Preview the results to make sure it works.
- Save the pipeline and verify
