import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import FAQBody from "@site/src/components/FAQPricing";


function pricingTest() {
  return (
    <Layout title="SigNoz Plans">
      <section>
      <div className="container" style={{marginTop: '2rem', marginBottom:'4rem'}}>
        
        <h2 style={{textAlign: "center"}} > A Plan for team of Every size </h2>
        <p style={{textAlign: "center"}}> Our aim is to make SigNoz accessible to everyone. Read our philosophy on pricing <a target="_blank" href="https://signoz.notion.site/Our-Thoughts-on-Pricing-73f5e6939c1f42be905fe937b4107dad">here</a></p>

        <div className={"row"}>
            <div className={"col col--4 margin-vert--md col--offset-2"}>
                <div class="card">
                    <div class="card__header">
                        <h3 style={{marginBottom:'0'}}>Community</h3>
                        <p style={{fontSize:'medium'}}>Free</p>
                    </div>
                    <div class="card__body">
                        <p>
                            <li> Open Source </li>
                            <li> Self Hosted </li>
                            <li> Key metrics like Latency, Error rates </li>
                            <li> Debug performance issues with Traces </li>
                            <li> Dashboard for Infrastructure and custom metrics </li>
                            <li> Community Support </li>
                        </p>
                    </div>
                    <div class="card__footer">
                    <Link
                      className="button button--primary"
                      href={"/docs/"}
                    >
                     Get Started 
                    </Link>
                    </div>

                </div>
            </div>
            <div className={"col col--4 margin-vert--md"}>
                <div class="card">
                    <div class="card__header">
                        <h3 style={{marginBottom:'0'}}>Enterprise</h3>
                        <p style={{fontSize:'medium'}}>Write to <a href="mailto:hello@signoz.io">hello@signoz.io</a> for early access</p>
                    </div>
                    <div class="card__body">
                        <p>

                            <i>Planned features</i>
                            <li> SLO Dashboards </li>
                            <li> Single Sign On support</li>
                            <li> SAML and LDAP support</li>
                            <li> Audit Logs </li>
                            <li> Team KPI dashboards </li>
                            <li> Dashboard configuration support</li>

                        </p>
                    </div>
                    <div class="card__footer">
                    <a class="button button--primary" href="mailto:hello@signoz.io">Write to us</a>
                    </div>
                </div>
            </div>
        </div>

        <div className={"row"}>
            <div className={"col col--8 col--offset-2 margin-vert--md"}>
                Enterprise support can be added onto any plan, email <a href="mailto:support@signoz.io?subject=Enterprise support">support@signoz.io</a> for details.
            </div>
        </div>


      </div>  
      </section>
      <section>
            <div
              className="container"
              style={{ marginTop: "2rem", marginBottom: "3rem" }}
            >
              <div class="row">
                {/* <div class="col col--4">
                  <p className="faq_left_panel text--center margin--md">
                    Open source and Free to self-host{" "}
                  </p>
                </div> */}

                <div class="col col--8 col--offset-2">
                  <p className="hero__subtitle margin--md">
                    Frequently Asked Questions
                  </p>
                  <div class="card-demo margin--md">
                    <FAQBody />
                  </div>
                </div>
              </div>
            </div>
          </section>
    </Layout>
  );
}

export default pricingTest;
