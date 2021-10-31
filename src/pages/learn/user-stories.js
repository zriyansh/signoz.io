import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

function aboutus() {
  return (
    <Layout title="About Us">
      <section>
        <div
          className="container"
          style={{ marginTop: "8rem", marginBottom: "4rem" }}
        >
          <p className="text--center margin-vert--lg">
            {" "}
            <h1 class="margin-vert--lg">Observability User Stories </h1>
            <p> One of the best ways to learn about a domain is to learn how the masters have done it.
              With the same thought in mind, here's a compilation of how top companies like Uber, Netflix, etc. have gone about designing their observability
              systems. </p>


          </p>
          <div class="row">
            <div class="col col--4">
              <div class="card-demo padding--md ">
                <div class="card">
                  <div class="card__image">
                    <img
                      src="/img/user_stories/1_netflix_distributed_tracing.webp"
                      alt="Image alt text"
                      title="Logo Title Text 1"
                    />
                  </div>
                  <div class="card__body">
                    <h4>Building Netflix's Distributed Tracing infrastructure</h4>
                    <small>
                    In this article, Netflix engineering team describes how they designed the tracing infrastructure behind Edgar. Edgar helps Netflix troubleshoot distributed systems.
                    </small>
                  </div>
                  <div class="card__footer">
                    <Link
                      className="button button--secondary button--outline"
                      href={"https://netflixtechblog.com/building-netflixs-distributed-tracing-infrastructure-bb856c319304"}
                    >
                      Visit
                    </Link>                  </div>
                </div>
              </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                <div class="card">
                  <div class="card__image">
                    <img
                      src="/img/user_stories/2_netflix_lesson_learnt.webp"
                      alt="Image alt text"
                      title="Logo Title Text 1"
                    />
                  </div>
                  <div class="card__body">
                    <h4>Lessons from Building Observability Tools at Netflix</h4>
                    <small>
                    5 key learnings of Netflix engineering team from building observability tools. Scaling log ingestion, contextual distributed tracing, analysis of metrics, choosing observability database and data visualization.                    </small>
                  </div>
                  <div class="card__footer">
                    <Link
                      className="button button--secondary button--outline"
                      href={"https://netflixtechblog.com/lessons-from-building-observability-tools-at-netflix-7cfafed6ab17"}
                    >
                      Visit
                    </Link>                  </div>
                </div>
              </div>
             
            </div>

            <div class="col col--4">
              <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/3_netflix_edgar_solving_mysteries.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Edgar: Solving Mysteries Faster with Observability</h4>
                      <small>
                      Author describes Edgar, a self-service tool for troubleshooting distributed systems, which also pulls in additional context from logs, events and metadata.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://netflixtechblog.com/edgar-solving-mysteries-faster-with-observability-e1a76302c71f"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
              
              </div>  

          </div>


          <div class="row">
            <div class="col col--4">
              <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/4_netflix_achieving_observability_async.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Achieving observability in async workflows</h4>
                      <small>
                      In this article, Netflix engineering team describes how they built an observability framework for a content production facing application that uses asynchronous workflows.                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://netflixtechblog.com/achieving-observability-in-async-workflows-cd89b923c784"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/5_netflix_telltale_application_monitoring.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Telltale: Netflix Application Monitoring Simplified</h4>
                      <small>
                      Netflix team describes Telltale, their application monitoring tool. Telltale monitors the health of over 100 Netflix production-facing applications with an intelligent alerting system.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://netflixtechblog.com/telltale-netflix-application-monitoring-simplified-5c08bfa780ba"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/6_towards_observability_data.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Towards Observability Data Management at Scale</h4>
                      <small>
                      This research paper explores the challenges and opportunities involved in designing and building Observability Data Management Systems. Written by authors from Brown University, MIT, Intel, and Slack.                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://sigmodrecord.org/publications/sigmodRecord/2012/pdfs/05_Vision_Karumuri.pdf"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

          </div>

          <div class="row">
            <div class="col col--4">
              <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/7_monitoring_vs_observability.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Monitoring and Observability</h4>
                      <small>
                      Cindy Sridharan explains the differences between monitoring and observability along with a brief overview of observability's origin. Read how observability complements monitoring.                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://copyconstruct.medium.com/monitoring-and-observability-8417d1952e1c"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/8_replaced_splunk.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>We Replaced Splunk at 100TB Scale in 120 Days</h4>
                      <small>
                      What do you do when your monitoring vendor becomes financially unviable and you're at 100TB daily ingestion volumes. Read on to find out how Groupon replaces Splunk in 120 days despite the scale.                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://medium.com/lets-xplore/how-we-replaced-splunk-at-100tb-scale-in-120-days-e5a59db63f6"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/9_observability_at_scale_uber.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Observability at Scale: Building Uber’s Alerting Ecosystem</h4>
                      <small>
                      Find out how Uber's Observability team built a robust and scalable metrics and alerting pipeline responsible for detecting, notifying engineers of issues with their services as soon as they occur. </small>                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.uber.com/observability-at-scale/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

          </div>

          <div class="row">
            <div class="col col--4">
              <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/10_optimizing_observability_uber.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Optimizing Observability with Jaeger, M3, and XYS at Uber</h4>
                      <small>
                      Videos with presentations on Jaeger, an open-source distributed tracing system created at Uber, XYS, an internal sampling service at Uber, and M3, Uber's open source metrics stack. 
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.uber.com/optimizing-observability/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/11_observability_anomaly_detection.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Engineering a Job-based Forecasting Workflow for Observability Anomaly Detection</h4>
                      <small>
                      An interesting read on how Uber's observability team overhauled the anomaly detection platform's workflow by introducing alert backtesting. Read how it led to a more intelligent alerting system.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.uber.com/observability-anomaly-detection/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/12_ugroup_uber.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Introducing uGroup: Uber’s Consumer Management Framework</h4>
                      <small>
                      This article introduces Uber's uGroup, a new observability framework to monitor the state of Kafka consumers. Read on to find out the challenges Uber's team faced with Kafka consumer side monitoring.
                      </small>                    
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.uber.com/introducing-ugroup-ubers-consumer-management-framework/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

          </div>

          <div class="row">
            <div class="col col--4">
              <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/13_ubereats_oncall.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Eats Safety Team On-Call Overview</h4>
                      <small>
                      This article gives a detailed overview of the On-Call culture at UberEats safety team. It includes everything from their current processes to how they train new engineers for their On-Call turn.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.uber.com/eats-safety-team-on-call-overview/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/14_telemetry_observability_blackrock.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Telemetry and Observability at BlackRock</h4>
                      <small>
                      This blog gives a detailed overview of the telemetry platform at BlackRock. The platform is responsible for overseeing the health, performance, and reliability of BlackRock's investment technology.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://medium.com/blackrock-engineering/telemetry-and-observability-at-blackrock-99cc6ed865ee"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/15_razorpay_talk.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Our journey into building an Observability platform at Razorpay</h4>
                      <small>
                      Detailed talk of how Razorpay, the fintech unicorn from India moved from paid APM tools to open-source observability platforms. Great insights on when does it make sense to build vs buy for observability use-cases. 
                      </small>                    
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.uber.com/introducing-ugroup-ubers-consumer-management-framework/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div class="row">
            <div class="col col--4">
              <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/16_gojek_performance_monitoring.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>How we monitor application performance at GO-JEK</h4>
                      <small>
                      In this article, the Go-Jek team explains how they went about building their performance monitoring stack using StatsD, Telegraf, InfluxDB and Grafana. 
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://www.gojek.io/blog/how-we-monitor-application-performance-at-go-jek"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/17_cindy_distributed_tracing.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Distributed Tracing — we’ve been doing it wrong</h4>
                      <small>
                      Cindy Sridharan discusses the problems with distributed tracing, specifically with traceviews and spans. Then she suggests alternatives to traceview with details on service-centric views and service topology graphs.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://copyconstruct.medium.com/distributed-tracing-weve-been-doing-it-wrong-39fc92a857df"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/18_zerodha_infrastructure_monitoring.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Infrastructure monitoring with Prometheus at Zerodha</h4>
                      <small>
                      This article explains how Zerodha went about setting up infrastructure monitoring with Prometheus. Zerodha handles about 15% of daily retail trading volume across all stock exchanges in India.
                      </small>                    
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://zerodha.tech/blog/infra-monitoring-at-zerodha/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div class="row">
            <div class="col col--4">
              <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/19_ubers_on_call.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Engineering Uber’s On-Call Dashboard</h4>
                      <small>
                      On-Calls are stressful for engineers. This article gives an overview of Uber's on-call dashboard and its flagship features that ensures Uber's on-call teams are set up for success.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.uber.com/software-engineers-on-call-dashboard/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/20_grab_structured_logging.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Structured Logging: The Best Friend You’ll Want When Things Go Wrong</h4>
                      <small>
                      Article from a Grab engineer explaining what is structured logging, why is it better, and how the Grab team built a framework that integrates well with their current Elastic stack-based logging backend.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://engineering.grab.com/structured-logging"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md ">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/21_grab_data_pipeline.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>A Lean and Scalable Data Pipeline to Capture Large Scale Events and Support Experimentation Platform</h4>
                      <small>
                      One of the major challenges of Observability is data storage. In this article, the Grab  eng. team shares the lessons learned in building a system that ingests and processes petabytes of data for analytics.
                      </small>                    
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://engineering.grab.com/experimentation-platform-data-pipeline"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div class="row">
            <div class="col col--4">
              <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/22_lyft_observability_missing.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Observability for the Missing Hop</h4>
                      <small>
                      This article shares how Lyft engineering team expanded their observability efforts to include mobile clients. Mobile clients run Envoy Mobile(an in-built tool) to send out time-series data.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.lyft.com/speeding-ahead-with-a-systematic-approach-to-web-performance-282b6cf8ae2"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/23_lyft_web_performance.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Speeding Ahead with a Systematic Approach to Web Performance</h4>
                      <small>
                      This article by Lyft eng. team introduces the Hierarchy of Web performance needs - a system that can identify the most impactful performance needs of an organization building web applications.
                      </small>
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://eng.lyft.com/speeding-ahead-with-a-systematic-approach-to-web-performance-282b6cf8ae2"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/24_hulu_tech_influxdb.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>How Hulu Uses InfluxDB and Kafka to Scale to Over 1 Million Metrics a Second</h4>
                      <small>
                      Hulu tech explains how they used InfluxDB and Kafka to Scale to Over 1 Million Metrics a Second. Read on for insights on challenges encountered, their initial and final architecture.
                      </small>                    
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://medium.com/hulu-tech-blog/how-hulu-uses-influxdb-and-kafka-to-scale-to-over-1-million-metrics-a-second-1721476aaff5"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div class="row">
            <div class="col col--4">
            <div class="card-demo padding--md">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/25_github_opentelemetry.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4>Why (and how) GitHub is adopting OpenTelemetry</h4>
                      <small>
                      In this blog, GitHub explains why they're adopting OpenTelemetry for its Observability practices. According to GitHub, OpenTelemetry will allow them to standardize telemetry usage making it easier for developers to instrument code.
                      </small>                    
                    </div>
                    <div class="card__footer">
                      <Link
                        className="button button--secondary button--outline"
                        href={"https://github.blog/2021-05-26-why-and-how-github-is-adopting-opentelemetry/"}
                      >
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
        </div>
      </section>
    </Layout>
  );
}

export default aboutus;
