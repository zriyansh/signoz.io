---
id: concepts
title: Concepts
---

import Screenshot from "@theme/Screenshot"

# Concepts

## Pipelines
Rules for transforming logs are configured by creating Logs Processing Pipelines in SigNoz UI.  
A pipeline is typically dedicated to a single preprocessing responsibility.
For example, extraction of attributes from nginx text logs would happen in
its own pipeline, and there would be another pipeline for parsing application
logs and yet another for dropping PII fields from log attributes.

<Screenshot
    alt="A list of pipelines, each addressing a single responsibility"
    src="/img/logs/pipelines/pipelines-list.png"
    title="A list of pipelines, each addressing a single responsibility"
/>

Logs get preprocessed by passing them through the chain of logs processing pipelines one by one.  
If a log matches a pipeline’s filter, it gets processed (transformed) by
that pipeline, before moving on to test the log against the next pipeline’s filter and so on.

## Processors
Apart from specifying a filter to identify the logs it can process,
a pipeline is composed of a chain of log processors. Each processor takes care of a particular type of log transformation.  
When a log matches a pipeline’s filter, it is processed through its chain of processors one by one.  


<Screenshot
    alt="Processors for an Nginx pipeline"
    src="/img/logs/pipelines/nginx-pipeline-processors.png"
    title="Processors for an Nginx pipeline"
/>


SigNoz provides [a variety of processors](/docs/logs-pipelines/processors.md) for achieving desired log transformations.