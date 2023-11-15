---
title: OpenTelemetry Webinars - Apache Kafka and OTLP data
slug: otel-webinar-kafka-otlp
date: 2023-11-16
tags: [OpenTelemetry]
authors: priyansh
description: Join Nica and Ankit as they discuss discuss the relationship between OpenTelemetry and ApacheKafka....
image: /img/blog/2023/11/otel-webinar-kafka-otlp-cover.jpeg
keywords:
  - opentelemetry
  - webinar
  - kafka
  - otlp
  - signoz
  - observability
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/otel-webinar-kafka-otlp/"/>
</head>

Join <a href="https://github.com/serverless-mom" rel="nofollow">Nočnica Mellifera</a> and <a href="https://github.com/ankitnayan" rel="nofollow">Ankit</a> as they discuss discuss the relationship between OpenTelemetry and ApacheKafka.


Below is the recording and an edited transcript of the conversation.

<!--truncate-->


## Summary of the Talk

[Nica's part ]

<LiteYoutubeEmbed id="ncOu44NtAec" mute={false} />

<p>&nbsp;</p>

*Find the conversation transcript below.👇*

**NICA:** Folks, hard times are part of anyone's life. I mean, I think everybody has a time when they feel worse than they did before. So, I have some simple recommendations for that. I think one big one when you have a weird interaction with someone is to go out and try to be nice. Go out and get coffee, leave a big tip at the coffee shop, message that friend who you know is halfway a friend of yours, and say something nice. 
Ask them how work's been going and be kind. That's a real thing. 

My second strategy, which is not as common, I think a strategy is I read a book about Arctic explorers. By the way, there is always a new one to read. You can always find one. Don't worry about that; they are available. There's something about feeling bad. In my case, I was dealing with some home improvement, and I sort of ran out of money on the project. I was all bummed about that. Then I just read about somebody eating shoes for two months, and it cheered me right up. I wasn't eating shoes. Great. 

All right, folks, it's time. We're going to do our OpenTelemetry webinar. Thank you so much for joining us. There's a little bumble and bobble with the LinkedIn invite, so we may not have a ton of people seeing this LinkedIn live. Sorry about that. If you were registered for the other event, I will send you a message with the canned version of this video. 

Thank you so much to the people who watch us on YouTube and the people who check us out after the fact. So many, like hundreds and actually like a thousand of you on the last video. That was cool. Thank you so much. 

This week, I have the tech head at SigNoz - Ankit to talk about this question that I sort of thought I had answers to, but then I realized, oh, there's more subtlety here than I realized. Well, first, let's introduce our guest. Oh my gosh, Ankit, say hi to the people. Oh no, you're in that direction. Say hi to the people and tell us what you do at Signos and what you're interested in. Introduce yourself.

**ANKIT:** Sure, yeah. Thanks for the call, the events, and all. Thank you, folks, for coming here. I am Ankit. I handle tech and some products at SigNoz. I'm one of the co-founders, and I love the domain of observability. I'm always up for a brainstorming discussion on how to debug your infrastructure services and distributed systems. These are my areas of interest. Feel free to reach out to me on community Slack, or I'm available on Twitter. 

**NICA:** Something I love about being part of this community is that there is a discussion happening all the time on the CNCF Slack. If you want to have a college minor in OpenTelemetry and spend a month or two just reading the questions that come through the OpenTelemetry Slack, people, I try to help out, but people like Martin and staff are incredibly helpful in there. Some of our team are helpful. It's cool. This whole show starts with a thread from that on the CNCF Slack and from, I think, the OpenTelemetry collector channel. I don't have the thread in front of me at the moment, but that's all right. 

The question that came in on that Slack was, "Hey, I want to send my OTLP data via an Apache Kafka queue within my architecture." And maybe I should have had an architectural diagram. So, this is the most complex architectural thought that's going to be in this one. 

You know, I have my collector somewhere in my cloud, and I want to enter the data into an Apache Kafka queue. Then have a collector read out of that queue and send it on to whatever my data back end is. 

On that thread, most people were like, "Why are we doing this? Maybe let's not do this." 

So, I want to kind of start there by sorting out why would somebody want to use their Kafka queue within their system to transmit their telemetry data. 

**ANKIT:** Right. So, like, it's one of the very interesting takes, and I always see some conversations going around about tiering of OpenTelemetry collectors versus using a queue. 

So, some point that I thought may be useful to discuss with all of us is tiering of OpenTelemetry collectors, it's always fine. But there are a few pros and cons that we need to keep in hindsight, thought on so that we enable better monitoring and better transmitting of data to different background sources. 

First, like the Kafka-like wall or queue, whatever you say, it is very helpful at scale and near the backend systems that deal with the observability data, right? So, if you have to handle scale like 100,000 spans per second or maybe up to a million spans per second from the observability data, it's perfectly fine to have tiering of OpenTelemetry collectors even before the data goes into Kafka. 

The tiering of collectors is very useful near the clients, right? So, OpenTelemetry has the advantage that it is very lightweight and can have some amount of data that is configurable in memory. Okay, so the nearer to the client is, the less scale it has to deal with, and it can keep things in memory for a short duration of time. 

To provide robustness to this system, you need to have some failover mechanism. What if the remote OpenTelemetry collector it is communicating to, fails, or whatever the backend or the next tier of OpenTelemetry collector that it communicates is down for some time? How much of the telemetric data does the client OpenTelemetry collector have to keep in memory? 

Right, so that is a very complex capacity planning you would have to do or use the default settings. Let's say my tier one OpenTelemetry collector, just wants to hold 10,000 spans overall. And if the downstream collector is down for a larger period of time, where does the client OpenTelemetry collector overflow the 10 spans, and the data is dropped? Right? So, like these things and like OpenTelemetry collector second tiers, first tiers, or even third tiers, they are very helpful when there are, I would say, flaky networks or edge devices where the network call might fail. A small amount of data or some buffer amount of data can be held in the OpenTelemetry collectors in memory. 

The Kafka is like a huge bus. It can ingest a huge amount of data. The advantage is it provides durability. You can persist the data right directly to the disk. The OpenTelemetry collectors do not have a provision, and they have a buffer to keep things in memory. So, when things come to a scale, let's say you have 500 GB of data, right? 

So, the advantage is it provides durability. You can persist the data directly to the disk. The OpenTelemetry collectors do not have a provision, and they prefer to keep things in memory. So, when things come at a scale, let's say you have 500 GB of telemetry data that happened during 5 minutes of your downtime. Then what, like to keep it? Do you want to keep it in memory or do you want to write it to Kafka in the disc directly? It saves a lot of money there. First, and the second is, that you will have to keep in mind that Kafka scales very well with the amount of data. 

So, it can handle the surge of traffic very well. 

**NICA:** So I want to start back at the beginning with my questions there, which is, we'll talk about collector to collector in just a minute, as this idea that you can put a collector closer to your service. But I want to start with, and I don't disagree that any of this is probably what makes sense, but at a really basic level, what is the problem with losing some data from the collector? So, we're trying to send it, we have our service running right now. 

These should be like asynchronous outbound requests. Right? So, we have one collector. It's way away from, on the network or, God forbid, it's run on some separate service, some other service someplace. So, it's just making requests via the internet, via network out to the collector with its data, and that's faulty. Right? That sometimes drops some data. 

Now, it seemed like when a couple of people were discussing this, they were worried about their service's performance as a result. So, is that a concern that you could have, like, okay, because you're getting timeouts and because you're sending this a huge number of requests, you're affecting how well this service works for users because it's seeing all this trouble trying to send its open telemetry data, right? 

**ANKIT:** It does, to some scale, it can be minimized as much as possible, like turning off the log exporter or if you have not configured it properly. Like, it will try to keep a lot of data in memory, and it will restrict the application's access to the memory. Hence, applications will slow down, and the logs that you print will also have a lot of noise about the retries of the OpenTelemetry collector to the onstream, right? 

**NICA:** Okay. All right. And that makes sense. Yeah. I sort of, I was having a failure of imagination there where I was like, okay, what is, you know, when you have some side effect, you know, web requests normally, you don't see like, hey, that's massively affecting your performance. But you're right. Like, one of the things is you really shouldn't be, this is a hot take, folks, but to make your application work, you shouldn't be having to fine-tune exactly how much telemetry data you're sending, right? That's, we're starting to get to the point where it's like, okay, now I don't want this tool anymore. Right? I don't want to add it to my next microservice because I have to fine-tune it to make the service recording. 

So, I get that it's like, okay, we want to have something to grab the data close to where the service is running. But yeah, so the next point is a very reasonable way to do that. And the way that was recommended by sort of the collector community was they said, "Hey, just run another collector closer to the service. Have it make decisions about what it's going to be retaining, and what it's going to be sending. Have it in some way partitioned off from the actual service. 

So, for example, if it's blowing up and using a ton of memory, it's not the same memory allocation for the application. But you're saying that, yes, that's a way to do it. But it totally can make sense to use Kafka. 

Okay, here was the third question that I had in that sequence, which was, you know, I always understood Kafka as being this, you know, really handling the multiplicity well between subscribers and publishers. And I was like, that superpower does not seem applicable here, where it's like, I wouldn't probably want to have like, oh yeah, everyone could publish to an observability topic, and you can have multiple other services that are subscribed to the like. I can't, I mean, I can imagine Netflix or something needing that kind of architecture. But like, nobody else can I imagine needing to have that kind of vendor or system-neutral system. For, for, am I wrong in that? Am I wrong in understanding that that's probably not what we're thinking about with Kafka here, right?

**ANKIT:** So, I would not say it's just about being at a Netflix scale. Even at a medium scale, it is a very good practice to have some queue in place. Okay, what it helps in is I have seen two things happen very frequently to any medium-scale companies: the surge of traffic like the usual day traffic, and some days, some marketing event or some event, the data spikes to around 10x. 

And you don't want your backend to scale up, and by that time, your services are throwing errors. So, that is one thing that Kafka or any queue does very well to handle the surge in traffic. And the next thing is, like, it's just like a write-ahead log. Just dump it out into a Kafka, do any sort of processing you want to, and pick it up from where you left off. So, let's say you're using a SaaS or in-house backend, if SaaS or your in-house backend needs some time to scale up, the consumers at Kafka can limit that. And it can help you have a consistent load to your backend, whether it be a database or any rate-limited SaaS. 

**NICA:** Right, this is where the power comes in. With, for example, a collector, we have maybe a collector running close to our services. You're still going to need to do a bit of thinking about hey, you know, how much memory does this thing have, how is it batching its data sends? Because, no, it can't just accept any completely arbitrary amount of data and run super reliably. If you already have a Kafka at the center, probably at the center of your architecture, right, it is super reliable in terms of how much it can take. This huge burst of data, and will handle it just fine. And so you are adding to the load on that queue, but yeah, like that's something it should be able to handle pretty centrally. 

So, are you recommending that people think about queuing even kind of outside of this Kafka space? They just think hey, even with multiple collectors, you might want to think about a queue at the center of your system?

**ANKIT:** Yeah. If you're talking about a few gigabytes of data, then it's fine. If you're talking about 100 gigabytes of data, like you need to have some disk where you can write on. Right, you cannot keep hings in memory and wait for the system to get started. 

Downtimes also become very important at that point in time. So, it's perfectly fine to have tiers of OpenTelemetry collectors nearer to the application. One at the infra and like a layer of a queue or Kafka before sending it to the backend. 

**NICA:** I'll also say that running multiple collectors has one enormous advantage. I'll send a link to an architecture diagram for this idea down below. But it has one enormous advantage, which is, I think for most of us realistically, you're not going to be talking to the application developers or even the people who do direct operations with those applications, to modify your telemetry data. 

Ideally, we certainly don't want to be saying, "Hey, can everyone make a PR to their service today because I want one more attribute on my traces?" We want to be able to do the configuration of our observability system on one side and have the application code people worry about their things, and we don't need them to be able to make a change. So, if you have multiple collectors connected, your ability to say, "Hey, this service is overproducing or this group of services is overproducing. I'm going to do some clever stuff. No, I'm just going to clamp it. I'm just going to say, 'Hey, you can only send this many bytes of data every single cycle' and stuff." 

If you have that collector very close to each of these services, then you're able to do that in a very fine-grained way. That's a big advantage, totally outside of these considerations. It's just nice. 

**ANKIT:** It's a very good angle to look into things. 

**NICA:** Okay, let me look at my big sheet of questions. So, I had misunderstood and didn't get when I was first looking at this that it was super easy to serialize into a queue with the OpenTelemetry protocol, the OTLP. Can you talk a little bit about that? I know you left some comments on that.

**ANKIT:** All right. So, to start with, the Kafka exporters and the Kafka receivers both support JSON and proto serialization formats today. And Avro is yet to come. I see a PR already open, and they would be supporting that Avro format. And the schemas are almost stable. They are marked as stable and should not be changing much. So, it should be good. There is no need to worry much there. And I looked into the issues also that they are looking to support schema registries as options to share schemas between the different producers and consumers. So, that is also going to help attain much more stability and robust distribution. 

**NICA:** Awesome. So, let's dive into some specific Kafka configs to consider when we start talking about the options that we have. So, I talked a little bit about using multiple collectors, and a collector very close to the service, and saying, "Okay, there I could configure how I want it to handle my OpenTelemetry data." But you can also use Kafka is not completely neutral here, right? You can do config to it to modify how you're collecting data. Can you talk a little bit about that?

**ANKIT:** Sure, yeah. So basically, there are a few angles. An example that is very relevant to our OpenTelemetry data, in general, would be if we need to enable tail-based sampling, what we can do is, like, the tail-based sampling needs all the traces under the same Trace ID to be present in the otel collector, in the same otel collector. That is a very big limitation that we had to deal with. 

And there have been many architectures around it. But yeah, like if you can partition by Trace ID and write it to a topic, there can be multiple consumers who can read from the different partitions of a topic, and all those consumers can run in parallel with that Trace ID as the partition key. It helps a lot in managing the tailbase samples. 

**NICA:** So, let's pause to just talk about the idea of our partition, right? It's like a section of resource allocation within the Kafka queue, right? It says, "Hey, this is how much we're going to devote to..." And this makes sense, right? Like, "Hey, customer payment data is being handled by the queue. Get a bigger partition than, you know, logging user behavior and which was the shoe color that they clicked on the most." 

So, this is partitioning. And then, tail base sampling, that one probably people are a little more comfortable with, but it's this idea that we want to make decisions about what traces to send and how many of them after the trace has occurred. So, head-based and tail-based sampling, we talk about it a lot, but I always want to get us back to the basics. What the heck is it like? 

Headbase sampling is the thing that is sort of always available to us, which is just when a trace starts, like, "No, save that one or don't save that one," which, you know, maybe by service or something. We could be kind of smart about it, but it's making a random decision of what are we going to save and what are we going to lose. 

Tailbase is some decision about what's in the trace. It's sort of been this Holy Grail for seven years now in all of the APM observability space. So, one of the things that can get us a little closer there would be at least saying, "Hey, where are all these traces coming from?" And so there is a PR out there for partitioning for handling a partition by Trace. It's not part of mainstream Kafka yet, but it's worth thinking about that it may be possible to say, "Hey, let's go ahead and see what's going on these traces. Link them together by Trace ID." 

**ANKIT:** That's true. And regarding how much data can Kafka handle, there are a few ways to increase the throughput that you can handle. Like changing the batch size, increase it a little bit. There is a linger.ms setting, like how much time should a producer wait to send it out to Kafka, right? And that setting is by default 0 milliseconds. It means, like, as soon as the producer produces it, it has to be sent to Kafka. 

So, you can configure that to five or 10 milliseconds. A very big improvement can be achieved by changing the acknowledgment in Kafka. So, if the producer has a setting, there are three types of acknowledgments. 

Acknowledgments like fire and fogget, then wait for the leader to respond with acknowledgment and the third one is like all - the replicas should respond with their reception of the data with an agreement, right? 

So the second one, like if just a leader responds that you have received the data, it should be fine. But this helps a lot in retries and reducing the time that Kafka receives the data. These are one and like always use compression. 

**NICA:** I love that, and I think this is great advice for people. I wanted to step to kind of our last question that I had that I think is critical because we're taking up our full time here, which is just talking about this. This is sort of just sort of a footnote here is that the other thing you do, and also this is what you find folks when you try to Google like OpenTelemetry Kafka is you get a lot of answers about monitoring your Kafka queue with OpenTelemetry. So, just want to cover that very briefly, like talking about what is kind of the critical things that you should be monitoring when you're monitoring the health of your Kafka queue.

**ANKIT:** Kafka has a lot of metrics. It has brokers; it has producers; it has consumers. I would say like the useful stuff you can figure out like the heap memory and all these things. Apart from that, the few relevant things that you should monitor in Kafka are consumer lag. 

That is very important. What is the offset that the producer is writing to, and how far is the consumer from reading that data? If that lag is increasing, then you should check into your consumer services as to why are they not able to process that amount of data or what is happening. That's number one. 

You should check out if you're talking about the complete pipeline that the otel collector writes to Kafka, and if a otel collector is reading from Kafka, you must monitor how much data is being written to Kafka in each partition in each topic, how much data is being read by the consumers. Is the OpenTelemetry exporter failing to write data to Kafka? Is Kafka going through a rebalancing due to the consumer clients' numbers changing, which can change for a lot of reasons due to restarting of ports, scaling up, scaling down of the consumers, and all? So these are the few basic operational things you must monitor apart from the general health of the broker and the producers.

**NICA:** Yeah, I think it's so critical because right Kafka is meant to be monitored and meant to be like an operational tool. So, of course, it generates a ton of signals, but you're so right that it's like if you look at the default importer for this stuff, right? You see like 30-plus different signals that show up. And, you know, when I start thinking about making a dashboard, it's something like SigNoz that have 30 different things being charted, and you ask someone, you say, "Hey, I think something's wrong with our Kafka queue. What's up?" And you're looking at 30 things. It starts to get pretty tough. 

So, yeah, you want to try to keep it to about four, right? That you say, "Hey, I need to see these top level; otherwise, we are healthy or we're not. And I'll fool with the time window or something to see if there's a pattern, but you know, you want to try to get this as a very ground-level thing about observability. 

First is the question of do we have an incident, and 30 metrics are not going to cut it. You have to be kind of focused, and I think consumer lag has got to be a major one. Hey, how soon the consistency happening between producer and consumer is pretty key, and any slowdown in actually reading the data off the queue is a real question.

Alright, now, I know there are going to be follow-up questions and comments, so please do feel free to drop comments under this video, and we will reply to them via text after the fact of the video. 

I will pause; we just have a couple of viewers, so I will pause if you want to drop any questions into chat. I will take a look here. 

You'll see a few more links down in the chat, especially to The OpenTelemetry Collector contrib repository with the Kafka components that you should check out. But Ankit, are there other things that you want people to know, places you'd like them to look you up or get more information about?

**ANKIT:** Sure, I am always available in the SigNoz community, so you can hit me up there if you want to start a discussion. If you want to start a discussion just like the GitHub itself, that is also fine. 

**NICA:** Yeah, if you have questions about collecting data with OpenTelemetry and using the OpenTelemetry Collector, you should join the CNCF Slack and take a look there. If you're curious about charting all of the OpenTelemetry signals of your metrics, logs, and traces all in one place with an open-source tool, go and join the SigNoz Slack and talk to us about it. You will not get kicked out for wanting to talk about Grafana or wanting to compare tools or anything. 

SigNoz is part of your solution for observability and is especially effective. Oh, there was a Reddit thread this week that was like, hey, I just want to get everything charted together, and I understand that this tool is like the perfect thing to do logs from Java or something, but my problem is that it's way too many tools and no one's going to check them all. So, I want one thing. 

So, I was like SigNoz, baby. I didn't know how to say SigNoz. I love it. One of our community members came in and said, hey, the thing you're describing is SigNoz. So, that was cool. 

Anyway, we will be back next week with a new topic. I think we're going to dive deeper into the OpenTelemetry API, maybe we're going to do something. It's going to be so fun. But I'm not going to promise which topic is going to be. I'll get that listed later today. Thank you so much for joining, everybody. We will see you soon. Bye-bye.



---

Thank you for taking out the time to read this transcript :) If you have any feedback or want any changes to the format, please create an <a href = "https://github.com/SigNoz/signoz/issues" rel="noopener noreferrer nofollow" target="_blank" >issue</a>.

Feel free to join our Slack community and say hi! 👋 

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)