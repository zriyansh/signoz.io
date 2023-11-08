---
id: processors
title: Log Processors
---

# Log Processors

Log transformation logic for a pipeline is configured as a chain of Processors.
When a log matches a pipeline's filter, it is transformed by each processor
in the pipeline one by one.

The following log transformation processors are available for creating pipelines.

## Grok
Grok processor helps in parsing text using grok expressions.  
A grok processor typically parses from the log body text but it can be used to target any attribute.

## Regex
Regex processor helps in parsing text using regular expressions.  
A regex processor typically parses from the log body text but it can be used to target any attribute.

## JSON
The JSON parsing processor can be used to parse serialized JSON text into log attributes.

## Trace
The trace processor can be used to populate trace id, span id and trace flags for a log.

## Add
The add processor can be used to add a field to the log.

## Move
The move processor can be used to rename or move log attributes.

## Copy
The copy processor can be used to copy log attribute values.

## Remove
The remove processor can be used for removing unwanted log fields such as PII.