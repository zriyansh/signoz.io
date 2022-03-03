---
id: traces
title: Traces
sidebar_label: Traces
---

import GetHelp from '../shared/get-help.md'
import PrereqsInstrument from '../shared/prereqs-instrument.md'
import UseHotRod from '../shared/use-hotrod.md'

This page shows how you can use distributed tracing to retrieve detailed telemetry data and see how your applications are performing. You’ll learn the following:

- What is distributed tracing
- How to customize the graph
- How to filter your spans
- How to inspect a span

<UseHotRod />

## Prerequisites

<PrereqsInstrument />

## What is Distributed Tracing?

Transaction tracing is a method of monitoring a request across various components of your application. Each request is assigned a unique identifier that is used to track it across every component of your application, allowing you to see which particular instance of a function is slow or failing.

In distributed architectures, a service can run on different virtual machines or containers. Distributed tracing is a method that allows you to monitor applications across different virtual machines or containers.

A distributed trace starts when a user initiates an action. For example, when a user adds an item to their cart, a unique identifier named “parent span” is assigned to that request. As adding an item to the cart is comprised of several individual steps such as querying the database or making external API calls, each of these steps retains the parent identifier and is also assigned a unique identifier named “child span”. For more details about distributed tracing, see the [Spans - a key concept of distributed tracing](https://signoz.io/blog/distributed-tracing-span/) and  [What is Context Propagation in Distributed Tracing?](https://signoz.io/blog/context-propagation-in-distributed-tracing/) blog posts.

On the **Traces** page, you can view and analyze requests as they propagate through various components of your application and get visibility into the experience of your users.

## Open the Traces Section

From the sidebar, select **Traces**:

![Open the Traces section](/img/open-traces-section-v0.6.2.png)

## Customize the Graph

SigNoz allows you to specify the function you wish to graph and indicate how the system should group data. Use the dropdown list to select a function from the list, and then use the **Group By** clause to break the results into separate data series. The following example screenshot shows how you can plot the number of invocations for each of your services:
![Customize the graph](/img/customize-the-graph-v0.6.2.png)

## Filter Spans by Tags

Tags are key-value pairs that allow you to filter spans by their characteristics. You can create multiple filters to filter by multiple tags. Note that SigNoz uses OpenTelemetry’s semantic conventions described on the [Trace Semantic Conventions](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/README.md) page of the OpenTelemetry specification.

There are two ways in which you can filter traces by tags:
- You can enter plain text in the **Quick Filter** input box and then select the **Run** button at the far right. Note that text is interpreted as case-sensitive.
- You can use the expression builder. To access the expression builder, select the **Add Tags Filter** button. Then, use the dropdown list to select a tag from the list of supported tags, specify an operator and enter a value. When you’ve finished, select the **Run Query** button.

## Advanced Filtering

You can use the **Advanced Filtering** pane that contains multiple filter criteria that you can apply to your spans:
![Advanced filtering](/img/advanced-filtering-v0.6.2.png)

## Sort Spans

Select a column heading to sort the list by the values in that column. Select the column heading again to reverse the sort order or to cancel sorting:
![Sort spans](/img/sort-spans-v0.6.2.png)

## Inspect a Span

Choose a span from the list, and SigNoz will open the **Span Details** page where you can see the following:

- The list of tags and errors associated with the currently selected trace
- A flame graph for the currently selected trace. For details about flame graphs, see the [Flame Graphs](https://www.brendangregg.com/flamegraphs.html) page.
- A Gantt chart that helps you visualize your services and events as a parent-child tree.

## Get Help

<GetHelp />
