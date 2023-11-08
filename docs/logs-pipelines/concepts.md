---
id: concepts
title: Concepts
---

# Concepts

You can express and organize your rules for transforming logs using
pipelines.

## Pipelines
Logs get preprocessed by passing them through a chain of pipelines.  
A pipeline is typically dedicated to a single preprocessing responsibility.
For example, extraction of attributes from nginx text logs would happen in
its own pipeline, and there would be another pipeline for parsing application
logs and yet another for dropping PII fields from log attributes  

<TODO(Raj): Add an image>

Each log is tested against filters of pipelines in the chain one by one.
If the log matches a pipeline’s filter, it gets processed (transformed) by
that pipeline, before moving on to test the log against the next pipeline’s filter and so on.

## Processors
Apart from specifying a filter to identify the logs it can process,
a pipeline is itself composed of a chain of processors. So when a log matches
a pipeline’s filter, it is processed through its chain of processors one by one.
