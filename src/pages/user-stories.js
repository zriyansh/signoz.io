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
            Observability User Stories
          </p>
          <div class="row">
            <div class="col col--4">
              <div class="card-demo">
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
            <div class="card-demo">
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
              <div class="card-demo">
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
              <div class="card-demo">
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
            <div class="card-demo">
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
            <div class="card-demo">
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
              <div class="card-demo">
                  <div class="card">
                    <div class="card__image">
                      <img
                        src="/img/user_stories/7_monitoring_vs_observability.webp"
                        alt="Image alt text"
                        title="Logo Title Text 1"
                      />
                    </div>
                    <div class="card__body">
                      <h4></h4>
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
            <div class="card-demo">
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
            <div class="card-demo">
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
          
        </div>
      </section>
    </Layout>
  );
}

export default aboutus;
