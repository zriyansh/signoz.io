---
id: introduction
title: Introduction
---

# Unleash the Potential of Your Logs with Pre-processing

With logs pipelines, you can transform your incoming logs to better suit
your querying and aggregation needs, before they get stored in the database.  

Once you start sending logs to SigNoz, you can start searching their text
and create basic reports based on standard fields. For example, find logs
with text containing a user id or count error logs by service.  
However, your logs will typically contain a lot of other valuable information
and it can be inefficient or outright impossible to query and run reports/dashboards
for that information.

Logs pipelines enable you to unleash the full potential of your logs by
pre-processing them before they get stored, unlocking
valuable logs based queries and dashboards that wouldn't be possible otherwise.  
You can also use logs pre-processing to clean sensitive information in your logs or
standardize names of fields across services.

While you can achieve your desired logs structure by changing your application code or by adding processors
to your otel collectors, logs pipelines allow you to do it in SigNoz UI without having to ship changes
or redeploy your applications and collectors.

Some common examples of logs pre-processing are  
- Parse your JSON logs into attributes for app specific querying and aggregation
  - Eg: <TODO: Add application specific report example>
- Extract attributes out of your text logs for generating aggregated reports and running efficient queries
  - Eg: you can parse details out of your nginx logs to plot traffic by endpoints or user agent.
- Extract trace details for correlating your logs with traces.
- Remove sensitive fields and data from your logs
- Normalize field names across your services.


## Read on for more details.
- Concepts
- Quickstart and guides.