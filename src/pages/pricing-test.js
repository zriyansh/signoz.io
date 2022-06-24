import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import FAQBody from "@site/src/components/FAQ";


function pricingTest() {
  return (
    <Layout title="SigNoz Plans">
      <section>
      <div className="container" style={{marginTop: '2rem', marginBottom:'4rem'}}>
        
        <h2 style={{textAlign: "center"}} > A Plan for team of Every size </h2>
        <p style={{textAlign: "center"}}> Our aim is to make SigNoz accessible to everyone. Read our philosophy on pricing</p>

        <div className={"row"}>
            <div className={"col col--4 margin-vert--md col--offset-2"}>
                <div class="card">
                    <div class="card__header">
                        <h3>Community</h3>
                        <p>Free</p>
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
                        <h3>Enterprise</h3>
                        <p>Coming Soon..</p>
                    </div>
                    <div class="card__body">
                        <p>
                            Our enterprise product which will include features needed by
                            larger teams
                            <br></br>
                            <br></br>

                            Planned features
                            <li> SSO support for Okta</li>
                            <li> SAML and LDAP support</li>
                            <li> Audit Logs </li>

                        </p>
                    </div>
                    <div class="card__footer">
                        <button class="button button--secondary button--block">Contact Us to know more</button>
                    </div>
                </div>
            </div>
        </div>

        <div className={"row"}>
            <div className={"col col--8 col--offset-2 margin-vert--md"}>
                Enterprise support can be added onto any plan, email <a href="mailto:hello@signoz.io?subject=Enterprise support">hello@signoz.io</a> for details.
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
