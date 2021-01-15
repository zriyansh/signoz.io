---
id: roadmap
title: Product Roadmap
---

import ReactGA from 'react-ga';

export const Logger = ({children}) => (
<>
<span>{ReactGA.initialize('UA-152867655-1')}</span>
<span>{ReactGA.pageview('Roadmap')}</span>
</>
);

<Logger> Hi, I am logger</Logger>

We are focused on building an integrated observability tool which can be a superior alternative to current SaaS products like DataDog

| Roadmap Items                     | Notes |
| --------------------------------- | ----- |
| Custom Metrics                    |       |
| Alert management                  |       |
| Tail based sampling               |       |
| Anomaly detection framework       |       |
| Log Management                    |       |
| Root cause analysis via workflows |       |

We believe in taking feedback from our community. Feel free to jump to our [Github Discussions](https://github.com/SigNoz/signoz/discussions) if you have any idea or feature we should build first. We are all ears 👂👂
