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
            Some of you may wonder, what does SigNoz mean? As engineers we are
            obsessed with the idea of signal vs noise. How do devops engineers
            find signals which they can act on from the various sources of noise
            they encounter from their observability systems? This is one idea we
            obsess over and seems important enough to continually strive
            towards.
            <br></br>
            <br></br>
            And, hence the name Sig.Noz ( Signal vs Noise) 🤓
          </p>
          <div class="row">
            <div class="col col--6">
              <div class="card-demo margin--md">
                <div class="card">
                  <div class="avatar margin--md">
                    <img
                      class="avatar__photo avatar__photo--lg"
                      src="https://avatars2.githubusercontent.com/u/504541?s=460&u=7bdaf251448e3b7ed760a4bffb3da7ceba3d655d&v=4"
                    />
                    <div class="avatar__intro">
                      <h4 class="avatar__name">Pranay Prateek</h4>
                      <small class="avatar__subtitle">Co-founder & CEO </small>
                    </div>
                  </div>
                  <div class="card__body">
                    <p>
                      After spending a lot of time in college reading
                      philosophy, I got interested in technology. Biometric &
                      image recognition was especially interesting to me. Led
                      product teams in startups & MNCs like Microsoft, before
                      stumbling into the domain of observability.
                      <br></br>
                      <br></br>
                      Reducing noise in developers' and devops engineers' life
                      is my current passion :)
                    </p>
                  </div>
                  <div class="card__footer">
                    <Link
                      className="button button--secondary button--outline"
                      href={"https://twitter.com/pranay01"}
                    >
                      Twitter
                    </Link>

                    <a
                      class="button button--link"
                      style={{ color: "white" }}
                      href="mailto:pranay@signoz.io"
                    >
                      pranay at signoz dot io
                    </a>

                    {/* <button class="button button--secondary button--outline button--link" href="https://twitter.com/pranay01">Twitter</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div class="col col--6">
              <div class="card-demo margin--md">
                <div class="card">
                  <div class="avatar margin--md">
                    <img
                      class="avatar__photo avatar__photo--lg"
                      src="https://avatars3.githubusercontent.com/u/12460410?s=460&u=db2947e0e7d4368d460a8105030564198da89c75&v=4"
                    />
                    <div class="avatar__intro">
                      <h4 class="avatar__name">Ankit Nayan</h4>
                      <small class="avatar__subtitle"> Co-Founder & CTO </small>
                    </div>
                  </div>
                  <div class="card__body">
                    <p>
                      Playing Badminton professionally was my dream at one time.
                      But that seemed too tough, so I started coding. I have
                      delved in all sorts of technologies including crypto when
                      it was exciting.
                      <br></br> <br></br>
                      Always interested in solving interesting problems with
                      technology. Microservices & Distributed systems is what I
                      am most interested in these days.{" "}
                    </p>
                  </div>
                  <div class="card__footer">
                    <Link
                      className="button button--secondary button--outline"
                      href={"https://twitter.com/ankitnayan"}
                    >
                      Twitter
                    </Link>

                    <a
                      class="button button--link"
                      style={{ color: "white" }}
                      href="mailto:pranay@signoz.io"
                    >
                      ankit at signoz dot io
                    </a>
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
