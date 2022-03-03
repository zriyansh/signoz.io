---
id: dashboards
title: Manage Dashboards and Graphs
sidebar_label: Manage Dashboards and Graphs
---

import GetHelp from '../shared/get-help.md'
import PrereqsInstrument from '../shared/prereqs-instrument.md'
import UseHotRod from '../shared/use-hotrod.md'

A dashboard is a set of one or more graphs. A graph is the basic visualization element that can either display a metric over a time interval or only the most recent value. On the **Dashboard** page, you can create custom dashboards, each combining multiple graphs, which you can use to get insight into how well your application is performing.

You’ll learn the following:

- How to create, update, and remove dashboards.
- How to create, update, and remove graphs.

<UseHotRod />

## Prerequisites

<PrereqsInstrument />

## Open the Dashboards Section

From the sidebar, select **Dashboard**:
![Open the Dashboard section](/img/open-dashboard-section-v0.6.2.png)

## Manage Dashboards

This section shows how you can create, update, and remove a custom dashboard.

### Create a Custom Dashboard

1. From the sidebar, choose **Dashboard**.
2. Select the **New Dashboard** button.
3. Select the **Edit** button at the far right, and then enter the following information:
   - A descriptive name for your new dashboard.
   - *(Optional)* Add one or more tags by selecting the **New Tag** button.
   - *(Optional)* A brief description of your new dashboard.
4. Select the **Save** button at the far right.
5. For each graph you wish to add to your new dashboard, follow the steps [Add a Graph to a Dashboard](#add-a-graph-to-a-dashboard) section.
6. *(Optional)* You can change the order of your graphs by dragging and dropping them.
7. When you’ve finished, select the **Save Layout** button.

### Update a Custom Dashboard

To update the name, description, and tags:
1. Select the **Edit** button at the far right.
2. Make the changes.
3. Select the **Save** button at the far right

To change the order of your graphs
1. Drag and drop a graph  to another place on the list.
2. When you’ve finished, select the **Save Layout** button.

### Remove a Custom Dashboard

1. From the sidebar, choose **Dashboard**.
2. Find the dashboard you wish to remove. Then, in the **Action** column, select the **Delete** button.

## Manage Graphs

This section shows how you can create, update, and remove a graph.

### Add a Graph to a Dashboard

SigNoz supports two types of graphs: time series, which displays a metric over a time interval, and value, which displays only the most recent value. To add a graph to a dashboard, follow the steps below:

1. From the sidebar, choose **Dashboard**.
2. Find the dashboard to which you want to add a new graph.
3. Select **Add Widget**.
4. Select either **Time Series** or **Value**.
5. Populate the following fields:
   - **Panel Title**: enter a descriptive name for your graph.
   - **Description**: enter a brief description of your new graph.
   - *(Optional)* **Global Time Preference**: Select the **Global Time** button, and use the drop-down list to specify the time range for which you want to view data. The time range you specify here overrides the global value.
6. To specify the data displayed on your graph, write one or more queries in the [Prometheus Querying Language](https://prometheus.io/docs/prometheus/latest/querying/basics/) (”PromQL”). To specify a legend name for your time series, you can use the **Legend Format** text box.
  :::info
  When you install SigNoz, only the data provided by the Hostmetric receiver is available. To enable more metric receivers, see the [Send Metrics to SigNoz](/docs/userguide/send-metrics/) section.
  :::
7. When you’ve finished, select the **Save** button.

### Update a Graph

1. From the sidebar, choose **Dashboard**.
2. Find the dashboard in which you created the graph you wish to update, and then select the pencil icon located at the top right corner of your graph.
3. Make the changes.
4. When you’ve finished, select the **Save** button.

## Get Help

<GetHelp />
