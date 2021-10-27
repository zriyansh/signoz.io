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
                      src="https://images.unsplash.com/photo-1506624183912-c602f4a21ca7?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
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
                    <button class="button button--primary button--block">Visit</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col col--4">
            <div class="card-demo">
                <div class="card">
                  <div class="card__image">
                    <img
                      src="https://images.unsplash.com/photo-1506624183912-c602f4a21ca7?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                      alt="Image alt text"
                      title="Logo Title Text 1"
                    />
                  </div>
                  <div class="card__body">
                    <h4>Lessons from Building Observability Tools at Netflix</h4>
                    <small>
                    5 key learnings of Netflix engineering team from building observability tools. The learnings cover scaling log ingestion, contextual distributed tracing, analysis of metrics, choosing observability database and data visualization.
                    </small>
                  </div>
                  <div class="card__footer">
                    <button class="button button--primary button--block">Visit</button>
                  </div>
                </div>
              </div>
             
            </div>

            <div class="col col--4">
            <div class="card-demo">
                <div class="card">
                  <div class="card__image">
                    <img
                      src="https://images.unsplash.com/photo-1506624183912-c602f4a21ca7?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                      alt="Image alt text"
                      title="Logo Title Text 1"
                    />
                  </div>
                  <div class="card__body">
                    <h4>Edgar: Solving Mysteries Faster with Observability</h4>
                    <small>
                      Edgar: Solving Mysteries Faster with Observability -yaddya yaadda yaddya
                      Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
                    </small>
                  </div>
                  <div class="card__footer">
                    <button class="button button--primary button--block">Visit</button>
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
