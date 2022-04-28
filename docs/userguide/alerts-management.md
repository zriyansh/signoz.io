---
id: alerts-management
title: Alerts 
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

# Setting alerts in SigNoz  

Starting with [v0.5.0](https://github.com/SigNoz/signoz/releases/tag/v0.5.0) you can set alerts in SigNoz.


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


## Setting up a Notification channel

You can setup notification channels for sending the generated alerts to other applications. Currently, the following channels are supported: 
- Slack ([v0.5.0](https://github.com/SigNoz/signoz/releases/tag/v0.5.0) onwards)
- Webhook ([v0.7.4](https://github.com/SigNoz/signoz/releases/tag/v0.7.4) onwards)
- Pagerduty (coming soon)

We are also working towards adding more channels (like OpsGenie, Email) in the upcoming releases.

The alert channel tabs can be accessed from `Settings > Alert Channels` tab. This shows a list of configured alert channels. When multiple channels are setup, the alerts will be sent to all the configured channels.

![alert-channels](../../static/img/docs/alert-channels.webp)


### Configure Slack Channel
#### Prerequisite
For setting up Slack as a notification channel, you need to first configure an Incoming Webhook in Slack. The following article explains how to do that - [Sending messages to slack using Incoming Webhook](https://api.slack.com/messaging/webhooks)

#### Creating a new Notification channel (Slack)

You have to provide a name, webhook URL and channel name (with # prefix) to configure a notification channel. 

![new-notification-channel](../../static/img/docs/new-notification-channel.webp)

You can also verify the configuration by using the _Test_ button. When you click _Test_, a test alert will be sent to the configured slack channel. The purpose of this feature is to confirm that signoz alert manager can talk to your webhook URL. 

#### Editing a Notification channel (Slack)

You can edit slack webhook URL or other parameters except the channel name and channel type. 

![edit-notification-channel](../../static/img/docs/edit-notification-channel.webp)


#### Receive Alert in Slack

Once everything is set up correctly, you should see your alerts in the configured slack channel whenever the monitored metrics cross the threshold specified in the alert rules.

Now you can stay relaxed that SigNoz will promptly alert you whenever something goes wrong in any of your applications or infra components.

![alerts-in-slack](../../static/img/docs/alerts-in-slack.webp)

### Configure Webhook Channel
#### Prerequisite
You must have a valid webhook URL (reachable from SigNoz Alert Manager) and an application ready to accept webhook messages.

#### Creating a new Webhook channel
Enter Webhook URL endpoint, username and password (if needed). Use _Test_ button to test the connection with your application. 

![image](https://user-images.githubusercontent.com/10277894/165084693-8034b65a-f0f4-4ff4-8a72-88fb7b8726b4.png)


#### Editing a Webhook channel
Similar to slack, you can edit most of the webhook parameters except the channel name and type. 

![image](https://user-images.githubusercontent.com/10277894/165084529-bf0aa817-5c4e-4f45-98bd-eeb33eb02547.png)

#### Receive Alert through Webhook

![image](https://user-images.githubusercontent.com/10277894/165078852-d3ae7571-bfa2-409a-93aa-2a870b379cb1.png)

#### Sample format of a Webhook message
A webhook message may contain multiple alerts. By default, the SigNoz alert manager groups alerts by the alert name and delivers the grouped messages every 5 minutes. 

For resolved alerts, the alert manager will send the time of resolution in _endsAt_. You can also use fingerprint property to identify and process updates sent by alert manager. 

```
{
   "receiver":"w1",
   "status":"firing",
   "alerts":[
      {
         "status":"firing",
         "labels":{
            "alertname":"DiskRunningFull",
            "dev":"sda3",
            "instance":"example3",
            "severity":"critical"
         },
         "annotations":{
            "info":"The disk sda3 is running full",
            "summary":"please check the instance example1"
         },
         "startsAt":"2022-04-25T14:35:19.490146+05:30",
         "endsAt":"0001-01-01T00:00:00Z",
         "generatorURL":"",
         "fingerprint":"ad592b0afcbe2e79"
      }
   ],
   "groupLabels":{
      "alertname":"DiskRunningFull"
   },
   "commonLabels":{
      "alertname":"DiskRunningFull",
      "dev":"sda3",
      "instance":"example3",
      "severity":"critical"
   },
   "commonAnnotations":{
      "info":"The disk sda3 is running full",
      "summary":"please check the instance example1"
   },
   "externalURL":"http://Apples-MacBook-Pro-3.local:9093",
   "version":"4",
   "groupKey":"{}/{}:{alertname=\"DiskRunningFull\"}",
   "truncatedAlerts":0
}

### Configure Pagerduty Channel
#### Prerequisite
You must have a valid Integration Key (aka Routing Key) before you setup a pagerduty channel in SigNoz Dashboard. Presently, integration through [events API v2](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTgx-sending-an-alert-event) is supported. 

The alerts can be sent to individual services by adding [events API v2](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTgx-sending-an-alert-event) in the integrations tab of the service details page. Once the integration is added, you can obtain the copy of the integration key (see below) and use it as Routing Key in SigNoz. For more details on the setup, visit [here](https://support.pagerduty.com/docs/services-and-integrations)
![image](https://user-images.githubusercontent.com/10277894/165688334-a1129c34-710e-485a-aa44-ab8054a6807d.png)

If you wish to automate incident creation or create alerts globally in pagerduty then you can setup Event Orchestration. The following screenshot shows integration or routing key tied to an orchestration.  
![image](https://user-images.githubusercontent.com/10277894/165689058-69a7b742-7415-4824-812f-b5cfa1f6abbe.png)


## Demo video 

Whew! That was a lot of instruction to follow. If you instead prefer to see how it works in a demo environment, here you go 👇

<p>&nbsp;</p>

<LiteYoutubeEmbed id="HBLtC3UKpmA" mute={false} />

<p>&nbsp;</p>


