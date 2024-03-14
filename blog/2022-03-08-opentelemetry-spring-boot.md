---
title: Monitoring your Spring Boot Application using OpenTelemetry
slug: opentelemetry-spring-boot
date: 2024-01-24
tags: [OpenTelemetry Instrumentation, Java]
authors: ankit_anand
description: Using OpenTelemetry libraries, you can instrument your Spring Boot applications for end-to-end tracing. You can then send the traces to an OpenTelemetry-native APM like SigNoz for monitoring visualization...
image: /img/blog/2024/01/opentelemetry-spring-boot-cover-min.jpg
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 2
keywords:
  - OpenTelemetry
  - opentelemetry spring boot
  - OpenTelemetry java
  - Spring Boot
  - distributed tracing
  - jvm metrics
  - apm
  - application monitoring
---
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-spring-boot/"/>
</head>


OpenTelemetry can auto-instrument your Java Spring Boot application to capture telemetry data from a number of popular libraries and frameworks that your application might be using. It can be used to collect logs, metrics, and traces from your Spring Boot application. In this tutorial, we will integrate OpenTelemetry with a Spring Boot application for traces and logs.

<!--truncate-->

![Cover Image](/img/blog/2024/01/opentelemetry-spring-boot-cover.webp)

OpenTelemetry is a vendor-agnostic instrumentation library that is used to generate telemetry data like logs, metrics, and traces. Using OpenTelemetry and SigNoz, you can collect logs, metrics, and traces and visualize everything under a [single pane of glass](https://signoz.io/blog/single-pane-of-glass-monitoring/).

For Java applications, OpenTelemetry provides a handy Java agent Jar that can be attached to any Java 8+ application and dynamically injects bytecode to capture telemetry from a number of popular libraries and frameworks.

In this tutorial, you will learn how to use the Java agent for generating traces and logs automatically from your Spring Boot application. You can use tracing data to visualize the flow of requests in your application. If you're using an OpenTelemetry-native APM like SigNoz, you can also get application performance metrics like request rates, latency (p99, p90, etc.), and error rates with your tracing data.

Before the demo begins, let's have a brief overview of OpenTelemetry.

## What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is a set of API, SDKs, libraries, and integrations aiming to standardize the generation, collection, and management of telemetry data(logs, metrics, and traces). OpenTelemetry is a Cloud Native Computing Foundation project created after the merger of OpenCensus(from Google) and OpenTracing(From Uber).

<br></br>

The data you collect with OpenTelemetry is vendor-agnostic and can be exported in many formats. Telemetry data has become critical to observe the state of distributed systems. With microservices and polyglot architectures, there was a need to have a global standard. OpenTelemetry aims to fill that space and is doing a great job at it thus far.

There are two important components in OpenTelemetry that comes in handy to collect telemetry data:

- **Client Libraries**<br></br>
    For Java applications, OpenTelemetry provides a JAR agent that can be attached to any Java 8+ application. It can detect a number of popular libraries and frameworks and instrument applications right out of the box for generating telemetry data.

- **OpenTelemetry Collector**<br></br>
    It is a stand-alone service provided by OpenTelemetry. It can be used as a telemetry-processing system with a lot of flexible configurations to collect and manage telemetry data.

Typically, here's how an application architecture instrumented with OpenTelemetry looks like.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/09/opentelemetry_architecture.webp" alt="OpenTelemetry Architecture"/>
    <figcaption><i>Architecture - How OpenTelemetry fits in an application architecture. OTel collector refers to OpenTelemetry Collector</i></figcaption>
</figure>

<br></br>

OpenTelemetry provides client libraries and agents for most of the popular programming languages. There are two types of instrumentation:

- **Auto-instrumentation**<br></br>
OpenTelmetry can collect data for many popular frameworks and libraries automatically. You don’t have to make any code changes.
- **Manual instrumentation**<br></br>
If you want more application-specific data, OpenTelemetry SDK provides you with the capabilities to capture that data using OpenTelemetry APIs and SDKs.


For a Java Spring Boot application, we can use the OpenTelemetry Java Jar agent to instrument the application. The agent is capable of capturing telemetry data from various popular libraries and frameworks used in the application.


<figure data-zoomable align='center'>
    <img src="/img/docs/opentelemetry_java_instrument.webp" alt="OpenTelemetry helps to generate and collect telemetry data from your application which is then sent to an observability backend like SigNoz"/>
    <figcaption><i>OpenTelemetry helps generate and collect telemetry data from Spring Boot applications which can then be sent to SigNoz for storage, visualization, and analysis.</i></figcaption></figure>
<br></br>

OpenTelemetry does not provide storage and visualization layer for the collected data. The advantage of using OpenTelemetry is that it can export the collected data in many different formats. So you're free to choose your telemetry backend. 

In this tutorial, we will use [SigNoz](https://signoz.io/docs/), an OpenTelemetry-native APM as the backend and visualization layer.

Steps to integrate OpenTelemetry with your Spring Boot application.

1. [Seting up SigNoz](#step-1---setting-up-signoz)
1. [Setting up Sample Spring Boot Application](#step-2---set-up-sample-spring-boot-application)
3. [Downloading OpenTelemetry Java Agent Jar](#step-3---downloading-opentelemetry-java-agent-jar)
4. [Running the application with Java Agent Jar](#step-4---running-the-application-with-relevant-environment-variables)
5. [Monitoring application with SigNoz](#step-5---monitoring-your-spring-boot-application-in-signoz)

## Prerequisites

- [SigNoz Cloud account](https://signoz.io/teams/)
- Java 8 or Higher (<a href = "https://www.java.com/en/" rel="noopener noreferrer nofollow" target="_blank" >Download here</a>)


## Step 1 - Setting up SigNoz

You need a backend to which you can send the collected data for monitoring and visualization. [SigNoz](https://signoz.io/) is an OpenTelemetry-native APM that is well-suited for visualizing OpenTelemetry data.

SigNoz cloud is the easiest way to run SigNoz. You can sign up [here](https://signoz.io/teams/) for a free account and get 30 days of unlimited access to all features.

[![Try SigNoz Cloud CTA](/img/blog/2024/01/opentelemetry-collector-try-signoz-cloud-cta.webp)](https://signoz.io/teams/)

You can also install and self-host SigNoz yourself. Check out the [docs](https://signoz.io/docs/install/) for installing self-host SigNoz.

## Step 2 - Setting up Sample Spring Boot application

For this tutorial, we will use the popular <a href = "https://github.com/SigNoz/spring-petclinic" rel="noopener noreferrer nofollow" target="_blank" >Spring PetClinic application</a> and integrate it with OpenTelemetry. 

The Spring PetClinic application is a well-known sample application used to demonstrate the capabilities of the Spring Framework in Java. It is a web application that uses Spring MVC (Model-View-Controller) to handle web requests, manage controllers, and render views. You can read more about it [here](https://spring-petclinic.github.io/).

**Git clone the repository and go to the root folder:**

```bash
git clone https://github.com/SigNoz/spring-petclinic.git
cd spring-petclinic
```


**Run the application using the following commands:**

```
./mvnw package
java -jar target/*.jar
```

If your application runs successfully, you will be able to access the application UI here: [http://localhost:8090/](http://localhost:8090/)

<figure data-zoomable>
    <img src="/img/blog/2022/03/spring_boot_app.webp" alt="Spring PetClinic app accessed at port:8090"/>
    <figcaption><i>Sample Spring Boot application running in your local host.</i></figcaption>
</figure>

<br></br>

Once you ensure that your application runs fine, stop it with `ctrl + c` on mac, as we will be launching the application with the Java agent downloaded from OpenTelemetry.

## Step 3 - Downloading OpenTelemetry Java agent JAR

Download the [latest Java agent JAR](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar). You will need the path of this file, so note it down somewhere. You can also use the terminal to get this file using the following command:

```
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

OpenTelemetry Java agent JAR  can be attached to any Java 8+ application. The agent JAR  can detect a number of <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md" rel="noopener noreferrer nofollow" target="_blank" >popular libraries and frameworks</a> and instrument it right out of the box. You don't need to add any code for that.

The auto-instrumentation takes care of generating traces and logs from the application. SigNoz uses the trace data to report key application metrics like p99 latency, request rates, and error rates with out-of-box charts and visualization.

You will also be able to capture logs with it and send it to SigNoz.

## Step 4 - Running the application with relevant environment variables

You need to run your Spring Boot application along with the instrumentation agent. You can do so by the following command:

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> \
OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=SIGNOZ_INGESTION_KEY" \
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.{region}.signoz.cloud:443 \
java -javaagent:java-agent/opentelemetry-javaagent.jar -jar target/*.jar
```

You can get SigNoz ingestion key and region from your SigNoz cloud account in Settings --> Ingestion Settings.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/ingestion-key-details.webp" alt="Find ingestion settings in SigNoz dashboard"/>
    <figcaption><i>Find ingestion settings in SigNoz dashboard</i></figcaption>
</figure>
<br/>


Your final command might look like this:

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=spring-boot-app \
OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=7XXXXX7-6XXxX-45ff-9XX1-3bXxXXf9cdc3" \
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.in.signoz.cloud:443 \
java -javaagent:java-agent/opentelemetry-javaagent.jar -jar target/*.jar
```

Note that you would need to use the environment variables from your SigNoz cloud account.

## Step 5 - Monitoring your Spring Boot Application in SigNoz

Check out the Spring Pet Clinic app at: [http://localhost:8090/](http://localhost:8090/) and play around with it to generate some load. You can try refreshing the endpoint multiple times to generate load. Now you open the `Services` tab of SigNoz dashboard to see your Spring Boot Application being monitored.

When you sign up, you will get an onboarding flow for Java application. You can follow it to instrument your own Spring Boot application too.

Below you can find your Spring Boot application in the list of applications being monitored.

<figure data-zoomable>
    <img className="box-shadowed-image" src="/img/blog/2024/01/opentelemetry-spring-boot-apm.webp" alt="Spring Boot application monitoring with OpenTelemetry"/>
    <figcaption><i>Spring Boot application monitoring in SigNoz with p99 latency, error rate, and ops per second</i></figcaption>
</figure>

<br></br>

## Application Metrics and Traces of the Spring Boot application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization based on your trace data. You get following out-of-box charts for your Spring Boot application:

- Rate of requests
- Error rate of requests
- Duration taken by requests
- Apdex
- Top endpoints in your application

And you can monitor all of this without any code change, just by integrating your Spring Boot application with OpenTelemetry Java agent JAR.


<figure data-zoomable>
    <img className="box-shadowed-image" src="/img/blog/2024/01/opentelemetry-spring-boot-red-metrics.webp" alt="SigNoz dashboard showing application latency, requests per sec, error percentage and top endpoints"/>
    <figcaption><i>Measure things like application latency, requests per sec, error percentage, apdex and see your top endpoints with SigNoz.</i></figcaption>
</figure>

<br></br>

You can also visualize your trace data with [flamegraphs and Gantt charts](https://signoz.io/blog/flamegraphs/) to see the flow of requests. This comes in very handy while debugging performance related issues.

<figure data-zoomable>
    <img className="box-shadowed-image" src="/img/blog/2024/01/opentelemetry-spring-boot-traces-flamegraphs.webp" alt="OpenTelemetry Spring Boot Monitoring with trace data visualized as flamegraphs"/>
    <figcaption><i>See how requests flow through your Spring Boot application with flamegraphs and Gantt charts in SigNoz dashboard</i></figcaption>
</figure>

<br></br>

<!-- ## Collecting JVM metrics from your Spring Boot application

This section shows you how you can visualise JVM metrics from Spring Boot applications in SigNoz.

We use Micrometer and Spring Boot actuator to expose JVM metrics in Prometheus format. Then we update OpenTelemetry collector  which comes pre-installed with SigNoz to be able to scrape these metrics.

You can then plot the JVM metrics relevant for your team by creating custom dashboards in SigNoz.

You can use a sample Spring Boot application at this <a href = "https://github.com/SigNoz/spring-petclinic" rel="noopener noreferrer nofollow" target="_blank" >GitHub repo</a>.

### Steps to monitor JVM metrics

### Changes required in your Spring Boot application

1. **Add the following code in `pom.xml`**
   
   ```jsx
   <dependency>
			<groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
      <groupId>io.micrometer</groupId>
      <artifactId>micrometer-registry-prometheus</artifactId>
      <scope>runtime</scope>
    </dependency>
    ```

2. **Add the following code in application.properties file located at `src/main/resources/application.properties`**

   ```jsx
   management.endpoints.web.exposure.include=*
   management.endpoints.web.exposure.include=prometheus,health,info,metric

   management.health.probes.enabled=true
   management.endpoint.health.show-details=always
   management.endpoint.prometheus.enabled=true
   ```

   Here's the <a href = "https://github.com/SigNoz/spring-petclinic/commit/5c4d041d43c5b1b0d07ea3bc9f0ad9a3a8b49526" rel="noopener noreferrer nofollow" target="_blank" >sample Spring Boot application</a> with needed changes.

3. **Build the Spring Boot application again**<br></br>
     You can read more on how to expose Prometheus metric from <a href = "https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.metrics.export.prometheus" rel="noopener noreferrer nofollow" target="_blank" >Spring Boot docs</a>.

### Configure SigNoz otel-collector to scrape Prometheus metrics

1. **Add the following code in `otel-collector-config.yaml` file**
   
   <a href = "https://github.com/SigNoz/signoz/blob/main/deploy/docker/clickhouse-setup/otel-collector-config.yaml" rel="noopener noreferrer nofollow" target="_blank" >SigNoz Otel collector yaml file</a><br></br>

   :::note
   Target should be updated to the IP and port where Spring Boot app is exposing metrics.
   :::

   ```jsx
   prometheus:
    config:
      scrape_configs:
        - job_name: "otel-collector"
          scrape_interval: 60s
          static_configs:
            - targets: ["otel-collector:8889"]
        - job_name: "jvm-metrics"
          scrape_interval: 10s
          metrics_path: "/actuator/prometheus"
          static_configs:
            - targets: ["<IP of the machine:8090>"]

    ```

    For e.g. if SigNoz is running on same machine as Spring Boot application, you can replace `IP of SigNoz` with `host.docker.internal`.

2. **Restart otel-collector metrics using the following command**
   
   ```jsx
   sudo docker compose -f docker-compose.yaml restart otel-collector
   ```

3. **Go to SigNoz dashboard and plot metrics you want**

   [Creating metrics dashboard in SigNoz](https://signoz.io/docs/userguide/dashboards/)


### Available metrics that you can monitor

Below is the list of available JVM metrics that you can monitor with the help of SigNoz:

```jsx
http_server_requests_seconds_sum
jvm_memory_committed_bytes
jdbc_connections_min
hikaricp_connections_min
jvm_threads_states_threads
jvm_classes_unloaded_classes_total
jvm_buffer_count_buffers
logback_events_total
jvm_memory_used_bytes
jvm_gc_pause_seconds_sum
jvm_memory_max_bytes
jdbc_connections_active
jvm_classes_loaded_classes
jvm_gc_pause_seconds_count
jdbc_connections_idle
jvm_threads_live_threads
jvm_gc_memory_promoted_bytes_total
jvm_gc_memory_allocated_bytes_total
cache_gets_total
jvm_buffer_memory_used_bytes
jvm_buffer_total_capacity_bytes
jvm_gc_live_data_size_bytes
tomcat_sessions_alive_max_seconds
hikaricp_connections_usage_seconds_count
jvm_threads_daemon_threads
hikaricp_connections_creation_seconds_sum
process_cpu_usage
jvm_gc_pause_seconds_max
process_start_time_seconds
tomcat_sessions_active_max_sessions
hikaricp_connections_acquire_seconds_count
hikaricp_connections_acquire_seconds_sum
system_load_average_1m
hikaricp_connections_usage_seconds_sum
system_cpu_usage
jvm_threads_peak_threads
tomcat_sessions_expired_sessions_total
cache_removals
tomcat_sessions_created_sessions_total
hikaricp_connections_idle
tomcat_sessions_active_current_sessions
process_uptime_seconds
hikaricp_connections_acquire_seconds_max
``` -->

## Collecting Spring Boot application logs with OpenTelemetry Java agent JAR

The OpenTelemetry Java agent JAR also captures logs from Java applications. You can also configure popular Java logging libraries like <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/log4j/log4j-context-data/log4j-context-data-2.17/library-autoconfigure" rel="noopener noreferrer nofollow" target="_blank" >Log4j2</a> and <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/instrumentation/logback/logback-mdc-1.0/library/README.md" rel="noopener noreferrer nofollow" target="_blank" >logback</a> to work with OpenTelemetry Java agent JAR.

For getting logs, you need to add an environment variable `OTEL_LOGS_EXPORTER` to your run command. Your run command will look like below:

```bash
OTEL_LOGS_EXPORTER=otlp \
OTEL_RESOURCE_ATTRIBUTES=service.name=spring-boot-app 
OTEL_EXPORTER_OTLP_HEADERS=signoz-access-token="7XXXXX7-6XXxX-45ff-9XX1-3bXxXXf9cdc3" \
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.in.signoz.cloud:443 \
java -javaagent:java-agent/opentelemetry-javaagent.jar -jar target/*.jar
```

You can go to the logs tab of SigNoz and apply filter for your `service.name` to see logs from your Spring Boot application.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/01/opentelemetry-spring-boot-logs-apply-filter.webp" alt="Apply filter to see OpenTelemetry Spring Boot logs"/>
    <figcaption><i>Apply filter for your service name to see logs from your Spring Boot application</i></figcaption>
</figure>

<br></br>

You can see your logs in different compact veiws like raw, default, and column. You can also plot time-series and create alerts on it. SigNoz logs query builder is really powerful with fields for filter, group by, and aggregate options.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2024/01/opentelemetry-spring-boot-logs-listview-raw.webp" alt="OpenTelemetry Spring Boot logs in raw view in SigNoz"/>
    <figcaption><i>See raw view of Spring Boot logs in SigNoz</i></figcaption>
</figure>

<br></br>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Spring Boot application and collect telemetry data like logs, metrics, and traces. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. With OpenTelemetry and SigNoz, you can implement full-stack observability for your Spring Boot applications.

If your Spring Boot application is based on microservices architecture, check out this tutorial 👇

[Implementing Distributed Tracing in a Java application](https://signoz.io/blog/distributed-tracing-java/)

---

**Further Reading**

[OpenTelemetry Collector Complete Guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)
