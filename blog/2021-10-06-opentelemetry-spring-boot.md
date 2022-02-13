---
title: Monitor your Spring Boot application with OpenTelemetry and SigNoz
slug: opentelemetry-spring-boot
date: 2021-10-06
tags: [application-monitoring, java-monitoring]
authors: ankit_anand
description: End-to-end performance monitoring of Spring Boot application with OpenTelemetry. Get your telemetry data visualized with SigNoz.
image: /img/blog/2021/08/opentelemetry_springboot_hc.webp
keywords:
  - OpenTelemetry
  - OpenTelemetry java
  - Spring Boot
  - OpenTelemetry Spring Boot
  - application monitoring
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-spring-boot/"/>
</head>

OpenTelemetry can auto-instrument your Spring Boot application to capture telemetry data from a number of popular libraries and frameworks. Let's learn how it works.

<!--truncate-->

![Cover Image](/img/blog/2021/08/opentelemetry_springboot_hc-min.webp)

OpenTelemetry is a vendor-agnostic instrumentation library. In this article, let's explore how you can auto-instrument your Java Spring Boot application with OpenTelemetry and get the data reported through SigNoz - an open-source APM and observability tool.

Steps to get started with OpenTelemetry for Spring Boot application:

- Installing SigNoz
- Installing sample Spring Boot app
- Auto instrumentation with OpenTelemetry and sending data to SigNoz

## Installing SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=springboot)

When you are done installing SigNoz, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="SigNoz dashboard showing application list"
   height={500}
   src="/img/blog/2021/08/signoz_dashboard_hc.webp"
   title="SigNoz Dashboard"
   width={700}
/>

## Installing sample Spring Boot app

If you don't have Java installed, first install it from the <a href = "https://www.java.com/en/" rel="noopener noreferrer nofollow" target="_blank" >official website</a>.

For this tutorial, we will use a sample Spring Boot application built using Maven. You can find the code for the application at its <a href = "https://github.com/SigNoz/spring-petclinic" rel="noopener noreferrer nofollow" target="_blank" >GitHub repo</a>.

Steps to get the app set up and running:

1. **Git clone the repository and go to the root folder**

   ```jsx
   git clone https://github.com/SigNoz/spring-petclinic.git
   cd spring-petclinic
   ```


2. **Run the application using the following commands.**

   ```
   ./mvnw package
   java -jar target/*.jar
   ```

   You can now access the application UI here: [http://localhost:8090/](http://localhost:8090/)

<Screenshot
   alt="Spring PetClinic app accessed at port:8090"
   height={500}
   src="/img/blog/2021/08/spring_petclinic_hc.webp"
   title="Sample Spring Boot application running in your local host."
   width={700}
/>

Once you ensure that your application runs fine, stop it with `ctrl + c` on mac, as we will be launching the application with the Java agent downloaded from OpenTelemetry.

## Auto instrumentation with OpenTelemetry and sending data to SigNoz

For instrumenting Java applications, OpenTelemetry has a very handy Java JAR agent that can be attached to any Java 8+ application. The JAR agent can detect a number of <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md" rel="noopener noreferrer nofollow" target="_blank" >popular libraries and frameworks</a> and instrument it right out of the box. You don't need to add any code for that.


1. Download the [latest Java JAR agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar). You will need the path of this file, so note it down somewhere. You can also use the terminal to get this file using the following command:
   ```
   wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
   ```

2. Now you need to enable the instrumentation agent as well as run your sample application. You can do so by the following command:
   ```
   OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp java -javaagent:/path/opentelemetry-javaagent.jar -jar target/*.jar
   ```

   <br></br>As you are running this on your local host, you need to replace `IP of SigNoz` with `localhost`. You will also need to update the path for your downloaded Java JAR agent. You will replace following two things:

   - `IP of SigNoz` : `localhost`
   - `/path/to` :  `Users/cruxaki/Downloads` (For my local)
   
   Your final command will look like this:
   ```
   OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp java -javaagent:/Users/cruxaki/Downloads/opentelemetry-javaagent.jar -jar target/*.jar
   ```

   <br></br>Note the path is updated for my local environment. If you are using a virtual machine, you need to update the IP accordingly. You also need to have the Java JAR agent on the same machine.

   You can also use `-D` option to install the java agent.

   ```
   java -javaagent:/path/opentelemetry-javaagent.jar \
    -Dotel.metrics.exporter=none \
    -Dotel.exporter.otlp.endpoint=http://<IP of SigNoz>:4317 \
    -Dotel.resource.attributes="service.name=<service_name>" \
    -jar target/*.jar
   ```

Check out the Spring Pet Clinic app at: [http://localhost:8090/](http://localhost:8090/) and play around with it to generate some load. You can try refreshing the endpoint multiple times to generate load. It might take 1-2 minutes before it starts showing up in the SigNoz dashboard.

Below you can find your `javaApp` in the list of applications being monitored.

<Screenshot
   alt="`Javaapp` appears in the list of applications monitored through SigNoz"
   height={500}
   src="/img/blog/2021/08/javaapp_boxed_hc.webp"
   title="`javaApp` in the list of applications monitored"
   width={700}
/>

## Metrics and Traces of the Spring Boot application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests
  <Screenshot
       alt="SigNoz dashboard showing application latency, requests per sec, error percentage and top endpoints"
       height={500}
       src="/img/blog/2021/08/signoz_charts_hc.webp"
       title="Measure things like application latency, requests per sec, error percentage and see your top endpoints with SigNoz."
       width={700}
  />

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.
<Screenshot
     alt="List of traces shown on SigNoz dashboard"
     height={500}
     src="/img/blog/2021/08/signoz_visualization_hc.webp"
     title="View of traces at a particular timestamp"
     width={700}
/>

You can use flamegraphs to exactly identify the issue causing the latency.

<Screenshot
     alt="Flamegraphs and gantt charts to visualize time taken by requests"
     height={500}
     src="/img/blog/2021/08/signoz_flamegraphs_hc.webp"
     title="Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing"
     width={700}
/>

You can also build custom metrics dashboard for your infrastructure.

<Screenshot
    alt="SigNoz custom metrics dashboard"
    height={500}
    src="/img/blog/2021/10/signoz_custom_dashboard-min.webp"
    title="You can also build a custom metrics dashboard for your infrastructure"
    width={700}
/>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Spring Boot application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇

<div class="text--center">

[![SigNoz repo](/img/blog/common/signoz_github.webp)](https://github.com/signoz/signoz)

</div>

<br></br>
If you are someone who understands more from video, then you can watch the tutorial on how to use OpenTelemetry for Spring Boot application here 👇<br></br>

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

<YoutubeWrapper url="https://www.youtube.com/embed/YxZb17_LYwQ"> </YoutubeWrapper><br></br>


If you have any questions or need any help in setting things up, join our slack community and ping us in `#help` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://bit.ly/signoz-slack)


If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[Nodejs Application Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/nodejs/)
