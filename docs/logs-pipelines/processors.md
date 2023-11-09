---
id: processors
title: Log Processors
---

# Log Processors

Every pipeline includes a chain of processors that define the transformations it will apply to logs.
When a log matches a pipeline's filter, it is transformed by each
processor in the pipeline one by one.

The following log transformation processors are available for 
defining pipelines.

## Grok
The Grok processor can be used to extract information out of text 
using grok expressions.  

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name. Must be unique across all processors in the pipeline |
|     Pattern      | The [grok pattern](https://grokdebugger.com/) to be used. Must include atleast one named capture group |
|     Parse&#160;From      | The log text field to parse from. Eg: `body` or `attributes.sessionInfo` |
|     Parse&#160;To      | The path to parse to. Eg: If set to `attributes`, a capture group like `%{WORD:userId}` in the grok pattern would get stored in `attributes.userId` |
|     On&#160;Error     | What to do if the processor fails. Options are to `drop` the log or `send` it to the next processor  |

## Regex
The Regex processor can be used to extract information out of text
using regular expressions.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name. Must be unique across all processors in the pipeline |
|     Pattern      | The regex pattern to be used. Must include atleast one named capture group |
|     Parse&#160;From      | The log text field to parse from. Eg: `body` or `attributes.sessionInfo` |
|     Parse&#160;To      | The path to parse to. Eg: If set to `attributes`, a capture group like `(?P<userId>.+)` in the regex pattern would get stored in `attributes.userId` |
|     On&#160;Error     | What to do if the processor fails. Options are to `drop` the log or `send` it to the next processor  |


## JSON
The JSON parsing processor can be used to parse serialized JSON text into log attributes.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name. Must be unique across all processors in the pipeline |
|     Parse&#160;From      | The log field containing serialized JSON text. Eg: `body` or `attributes.sessionInfo` |
|     Parse&#160;To      | The path to parse to. Eg: If set to `attributes`, parsing from JSON `{ "userId": 8888 }` would set `attributes.userId` to `8888` |

## Trace
The trace processor can be used to populate trace id, span id and trace flags for a log.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name. Must be unique across all processors in the pipeline |
|     Parse&#160;Trace&#160;Id&#160;From   | The log field containing otel Trace Id. Value must be an even length string of hex characters |
|     Parse&#160;Span&#160;Id&#160;From    | The log field containing otel Span Id. Value must be an even length string of hex characters |
|     Parse&#160;Trace&#160;Flags&#160;From    | The log field containing otel Trace Flags. Value must be an unsigned int |

At least one field among `Parse Trace Id From`, `Parse Span Id From` and `Parse Trace Flags From` must be specified.

## Add
The add processor can be used to add a field to the log.

## Move
The move processor can be used to rename or move log attributes.

## Copy
The copy processor can be used to copy log attribute values.

## Remove
The remove processor can be used for removing unwanted log fields such as PII.