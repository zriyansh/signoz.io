---
id: alerts-management
title: Alerts 
---

# Setting alerts in SigNoz  

With [v0.5.0](https://github.com/SigNoz/signoz/releases/tag/v0.5.0) you can set alerts in SigNoz.


## Setting Alert Rules

Alerts in SigNoz are heavily inspired by how Prometheus manages alerts, as we found that as the most flexible way of setting alerts. So, if you have set up alerts in Prometheus, the following should sound very familiar.

Navigate to Alerts page from the left panel. It has 2 tabs:

1. Alert Rules
2. Triggered Alerts


#### Alert Rules

Alert Rules set the expression you want to evaluate to start firing alerts. The Alert Rules tab shows a list of currently configured alert rules and labels like `severity` and `Alert Name`. It also shows the current status of this Alert rules. If any alerts are `firing` because of this or everything is `Ok`




![alert-rules](../../static/img/docs/alert-rules.webp)


#### Create Alert Rules

To create new alert rules, you can click the `New Alert Rules` button. This would open a Prometheus like Alert rule editor for you. If you haven't used Prometheus before, don't worry this is pretty simple.

- Set the expression you want to evaluate to true to trigger alerts
- Set the period for which you want to wait (after the expression is true) to start firing alerts
- Set labels like `severity` to communicate how severe the issue is if this alert starts firing

![new-alert-rules](../../static/img/docs/new-alert-rules.webp)


#### Triggered Alerts

Triggered alerts show the alerts which are in `firing` or `pending` state. 

Pending means that the rule threshold is crossed, but it is still waiting based on the specified time period. Once the specified time is passed, the alert starts firing.

It also has different tags like alert name, severity, since when the alert started firing, etc.

![triggered-alerts](../../static/img/docs/triggered-alerts.webp)

- Filtering and grouping Triggered alerts

You can also filter and group triggered alerts based on tags. The filtering field accepts multiple key-value pairs like `serverity:warning`

For grouping, you can use any of the tags like `severity`, `alertname` or any other label you would have specified in your alert rule. You can use the grouping feature to group the list of triggered alerts based on these tags.


![triggered-alerts-groups](../../static/img/docs/triggered-alerts-groups.webp)


## Setting Notification channel

In [v0.5.0](https://github.com/SigNoz/signoz/releases/tag/v0.5.0) we only support slack as a notification channel. We will add support for other channels like Email, OpsGenie, PagerDuty, etc. in upcoming releases.

For setting up Slack as a notification channel, you need to first configure an Incoming Webhook in Slack. The following article explains how to do that - [Sending messages to slack using Incoming Webhook](https://api.slack.com/messaging/webhooks)


The alert channel tabs can be accessed from `Settings > Alert Channels` tab. This shows a list of configured alert channels. For v0.5.0, the latest added Alert channel is taken as the default channel to send notifications. In upcoming releases, we will add support for mapping different channels with Alert rules in a more granular way.

![alert-channels](../../static/img/docs/alert-channels.webp)


### Creating a new Notification channel

You have to provide a name, webhook URL and channel name (with # prefix) to configure a notification channel.

![new-notification-channel](../../static/img/docs/new-notification-channel.webp)

### Editing a Notification channel

You can also edit a notification channel with new webhook URL or channel name. You can't edit a channel name though in v0.5.0

![edit-notification-channel](../../static/img/docs/edit-notification-channel.webp)


## Alerts in Slack

Once everything is set up correctly, you should see your alerts in the configured slack channel whenever the monitored metrics cross the threshold specified in the alert rules.

Now you can stay relaxed that SigNoz will promptly alert you whenever something goes wrong in any of your applications or infra components.

![alerts-in-slack](../../static/img/docs/alerts-in-slack.webp)


## Demo video 

Whew! That was a lot of instruction to follow. If you instead prefer to see how it works in a demo environment, here you go 👇


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

<YoutubeWrapper url="https://www.youtube.com/embed/HBLtC3UKpmA"> </YoutubeWrapper><br></br>


