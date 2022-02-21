---
id: prometheus-metrics
title: Prometheus Metrics
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

Here's how you can visualise Prometheus metrics in SigNoz

<p>&nbsp;</p>

<LiteYoutubeEmbed id="QGJYNYzfM9o" mute={false} />

<p>&nbsp;</p>

The [code section](https://github.com/SigNoz/signoz/blob/510815655fe6cc9ac3e86b62e218132d8dc47c51/deploy/docker/clickhouse-setup/otel-collector-metrics-config.yaml#L10) where you need to update prometheus scrape configs. 

You also need to deploy SigNoz again after making the above config changes.

If you have any questions, drop us a note on our [slack community](https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA).
