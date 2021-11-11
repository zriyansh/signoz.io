---
id: prometheus-metrics
title: Prometheus Metrics
---

Here's how you can visualise Prometheus metrics in SigNoz

export const YoutubeWrapper = ({children, url}) => (
  <div 
    style={{
    position: 'relative', 
    width: '100%',
    paddingBottom: '56.25%', 
    height: "0",
    }} >
    <iframe width="560" height="315" style={{ position: 'absolute', top:'0', left: '0', width: '100%', height: '100%'}} src={ url } title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
);

<YoutubeWrapper url="https://www.youtube.com/embed/QGJYNYzfM9o"> </YoutubeWrapper><br></br>

The [code section](https://github.com/SigNoz/signoz/blob/510815655fe6cc9ac3e86b62e218132d8dc47c51/deploy/docker/clickhouse-setup/otel-collector-metrics-config.yaml#L10) where you need to update prometheus scrape configs. 

You also need to deploy SigNoz again after making the above config changes.

If you have any questions, drop us a note on our [slack community](https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA)