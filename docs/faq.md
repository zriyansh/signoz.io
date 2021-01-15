---
id: faq
title: Frequently Asked Questions
---

import ReactGA from 'react-ga';

export const Logger = ({children}) => (
<>
<span>{ReactGA.initialize('UA-152867655-1')}</span>
<span>{ReactGA.pageview('FAQ')}</span>
</>
);

<Logger> Hi, I am logger</Logger>

<!-- - I am using Prometheus, can I use SigNoz?
- I am using Jaeger, can I use SigNoz?
- How does SigNoz compare with DataDog?
- How does SigNoz compare with SaaS observability tools like Honeycomb? -->

## I am looking for an application monitoring tool, is SigNoz an APM?

SigNoz is more than an APM. We provide all features like
metrics and request traces which APMs provide. On top
of that. we provide advanced filtering on trace data and
custom aggregation on it

## I am using Jaeger, can I use SigNoz?

- Jaegar UI doesn’t show any metrics on traces or on filtered traces
- Can’t get aggregates on filtered traces.
- For example, Cassandra doesn’t support Group By, Max()

## What will be your paid plan like?

SigNoz will be always open-source and free for smaller
teams. We will have role based pricing for our enterprise
edition which will have advanced features needed by
bigger teams.
