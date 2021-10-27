import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import ReactGA from "react-ga";
import styles from "./styles.module.css";
import { PlaySVG } from "../svgs/common";

const { Panel } = Collapse;

ReactGA.initialize("UA-152867655-1"); // How to make it appear only for production?
ReactGA.pageview("Home Page");
ReactGA.event({
  category: "User",
  action: "Opened Main page",
});

const getStartedClicked = () => {
  ReactGA.event({
    category: "User",
    action: "Clicked get started button",
  });
};

const requestDemoClicked = () => {
  ReactGA.event({
    category: "User",
    action: "Request Demo Clicked",
  });
};

const WhySigNoz = () => {
  const [feature, setFeature] = useState("pricing");

  const handlePricing = () => {
    setFeature("pricing");
  };

  const handlePrivacy = () => {
    setFeature("olap");
  };

  const handleExtendibility = () => {
    setFeature("tag-filtering");
  };

  return (
    <div className="container">
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4", styles.menu__list)}>
            <button
              onClick={handlePricing}
              className={`button button--lg ${
                feature === "pricing"
                  ? "feature-tab-css__selected"
                  : "feature-tab-css"
              }`}
              style={{ marginBottom: 20, marginTop: 0, whiteSpace: "normal" }}
            >
              Integrated UI for metrics and traces
            </button>
            <button
              onClick={handlePrivacy}
              className={`button button--lg ${
                feature === "olap"
                  ? "feature-tab-css__selected"
                  : "feature-tab-css"
              }`}
              style={{ marginBottom: 20, marginTop: 20, whiteSpace: "normal" }}
            >
              Run business specific queries{" "}
            </button>
            <button
              onClick={handleExtendibility}
              className={`button button--lg ${
                feature === "tag-filtering"
                  ? "feature-tab-css__selected"
                  : "feature-tab-css"
              }`}
              style={{ marginBottom: 20, marginTop: 20, whiteSpace: "normal" }}
            >
              Run aggregates on custom tags
            </button>
          </div>
          <div className="col col--8">
            <div
              className="hero__screenshot"
              style={{ display: feature === "pricing" ? "block" : "none" }}
            >
              <img
                src={useBaseUrl("img/metrics-tooltip-traces.jpg")}
                alt="SigNoz screenshot"
              />
            </div>
            <div
              className="hero__screenshot"
              style={{ display: feature === "olap" ? "block" : "none" }}
            >
              <img
                src={useBaseUrl("img/business-metrics-light.jpg")}
                alt="SigNoz screenshot"
              />
            </div>
            <div
              className="hero__screenshot"
              style={{
                display: feature === "tag-filtering" ? "block" : "none",
              }}
            >
              <img
                src={useBaseUrl("img/custom-aggregates.jpg")}
                alt="SigNoz screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Your data in your boundary",
    imageUrl: "img/Vector_1.svg",
    description: (
      <>
        No need to worry about GDPR and other data protection laws. All your
        tracing and monitoring data is now in YOUR infra.
      </>
    ),
  },
  {
    title: "Forget HUGE SaaS bills",
    imageUrl: "img/Vector_2.svg",
    description: (
      <>
        No abrupt pricing changes. No unexpected month-end bills. Get
        transparent usage data.
      </>
    ),
  },
  {
    title: "Take Control",
    imageUrl: "img/Vector_3v5.svg",
    description: (
      <>
        No need to spend weeks in vendor slack for that one small feature.
        Extend SigNoz to suit your needs.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ModalCard(props) {
  const { title, desc, info, link, button } = props;

  return (
    <div
      className="card-demo"
      style={{ width: "100%", marginTop: "1.5rem", maxWidth: "14rem" }}
    >
      <div className="card" style={{ color: "#000", height: "15rem" }}>
        <div className="card__header">
          <h3 style={{ color: "#333333" }}>{title}</h3>
        </div>
        <div className="card__body">
          <p>{desc}</p>
        </div>
        <div className="card__footer" style={{ color: "#2F80ED" }}>
          {info}
        </div>
        {button}
      </div>
    </div>
  );
}

function TrySignozModal(props) {
  const { isOpen, onClose } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="onRequestClose Example"
      onRequestClose={onClose}
      className="Modal try-signoz-modal"
      overlayClassName="Overlay"
    >
      <h1 style={{ marginTop: "2rem", textAlign: "center", color: "#333333" }}>
        Try SigNoz for free
      </h1>
      <div className={"container"}>
        <div className={"row"}>
          <div
            className={"col col--6"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              style={{ textDecoration: "none" }}
              href={"/docs/deployment/docker"}
            >
              <ModalCard
                title={"Open source"}
                desc={"Want to use our free open-source product?"}
                info={
                  <div>
                    Deploy SigNoz to your infrastructure. Free{" "}
                    <div>forever</div>
                  </div>
                }
              />
            </Link>
          </div>

          <div
            className={"col col--6"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link style={{ textDecoration: "none" }} href={"/pricing"}>
              <ModalCard
                title={"Cloud"}
                desc={"Small business or low volume & don’t want hassle?"}
                info={
                  "This is the simplest way to get started. Create an account"
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

function ShowCompanyLogos() {
  return (
    <section className={styles.used_by}>
      <div
        className="container"
        style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
      >
        {/* <p class="tagline" >Used by teams at</p> */}
        <p className={styles.tagline}> Used by teams at </p>
        <ul>
          <li>
            <img
              src="https://res.cloudinary.com/dcv3epinx/image/upload/v1621059606/naver_white2_hie7gu.svg"
              alt="naver logo"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcv3epinx/image/upload/v1621059241/solve_white_njrutq.svg"
              alt="solve logo"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcv3epinx/image/upload/v1621014836/bukukas_svg_nfhkmf.svg"
              alt="bukukas logo"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcv3epinx/image/upload/v1620977641/cafe21_1_vlrznt.svg"
              alt="cafe24 logo"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dcv3epinx/image/upload/v1621059423/wpromote_white_1_njjebt.svg"
              alt="wpromote logo"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

function Home() {
  const [showTrySignozModal, setShowTrySignozModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  useEffect(() => {
    ReactModal.setAppElement("#modal-root");
  }, []);

  const closeTrySignozModal = () => {
    setShowTrySignozModal(false);
  };

  return (
    <>
      <Layout
        title={`Open source Observability platform`}
        description="SigNoz is an opensource observability platform to help you find issues in your deployed applications & solve them quickly.
      It provides an integrated UI for metrics and traces with deep filtering and aggregation to pin down specific issues very quickly.
      Built on Kafka and Druid, it is designed to handle enterprise scale."
      >
        <TrySignozModal
          isOpen={showTrySignozModal}
          onClose={closeTrySignozModal}
        />
        <header className="hero hero--dark">
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <p className="hero__title " style={{ fontWeight: "bold" }}>
                  Open-source Observability platform
                  {/* Open-source application monitoring platform */}
                </p>
                <p className="hero__subtitle">
                  Understand issues in your deployed applications & solve them
                  quickly
                </p>
                <div style={{ margin: "1rem 0" }}>
                  <Link
                    style={{
                      margin: "6px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                    className="button button--primary "
                    // onClick={setShowTrySignozModal.bind(this,true)}
                    href={"/docs/deployment/docker"}
                    onClick={getStartedClicked}
                  >
                    Get Started for free
                  </Link>
                  <Link
                    style={{
                      margin: "6px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                    className="button button--outline button--secondary "
                    href={"https://github.com/SigNoz/signoz"}
                    onClick={requestDemoClicked}
                  >
                    GitHub Repo
                  </Link>
                </div>

                {/* <p className="open-source-label">SigNoz is <strong>free</strong> and <strong>open-source</strong></p> */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={"/img/yc-logo-white.svg"}
                    height={24}
                    style={{ marginRight: 16 }}
                  />{" "}
                  Backed by Y Combinator
                </div>
              </div>
              <div className="col col--8">
                <div className="hero__screenshot">
                  <div style={{ width: "100%" }}>
                    {showVideo === false ? (
                      <div
                        id={"demo-video-cover"}
                        onClick={setShowVideo.bind(this, true)}
                        style={{
                          background: "url('/videos/demo_cover.png')",
                          height: 426,
                          width: "100%",
                        }}
                      >
                        <div id={"demo-overlay"}></div>
                        <div id={"demo-content"}>
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 600,
                              marginBottom: 20,
                            }}
                          >
                            SigNoz - Quick Intro
                          </div>
                          <PlaySVG />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <video
                          width="100%"
                          height="420"
                          autoPlay
                          controls
                          id={"demo-video-player"}
                        >
                          <source
                            src="https://demo-video-1.s3.us-east-2.amazonaws.com/demo.mp4"
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>
          {/* <SubscribeNearFold /> */}
          <ShowCompanyLogos />

          {features && features.length > 0 && (
            <section className={styles.features}>
              <div
                className="container"
                style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
              >
                {/* <div className="container" class="margin--md">  */}

                <div className="row">
                  {features.map((props, idx) => (
                    <Feature key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section>
            <div
              className="container"
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              {/* <p className="hero__title ">Single pane for complete metrics and traces, no need to shift to different systems</p> */}
              <h1 class="text--center">
                Single pane for complete metrics and traces, no need to shift to
                different systems{" "}
              </h1>
              <p className="hero__subtitle text--center">
                No disparate UI like Prometheus & Jaeger
              </p>
            </div>
          </section>

          <WhySigNoz />

          <section>
            <div
              className="container"
              style={{ marginTop: "8rem", marginBottom: "4rem" }}
            >
              <h1 class="text--center margin-vert--lg">
                {" "}
                Why get locked-in with SaaS vendors like DataDog when you can
                use Open source?
              </h1>
              <div class="row">
                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      {/* <div class="card__header">
                  <h3>Lorem Ipsum 1</h3>
                </div> */}
                      <div class="card__body">
                        <p>
                          No fear of SaaS service getting hacked and your
                          customer’s data getting compromised. Have complete
                          control on your data.
                        </p>
                      </div>
                      {/* <div class="card__footer">
                  <button class="button button--secondary button--block">See All</button>
                </div> */}
                    </div>
                  </div>
                </div>
                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      {/* <div class="card__header">
                  <h3>Lorem Ipsum 2</h3>
                </div> */}
                      <div class="card__body">
                        <p>
                          Your data storage cost is only dependent on your
                          application load, rather than factors like number of
                          nodes, which is an architectural preference.
                        </p>
                      </div>
                      {/* <div class="card__footer">
                <Link
                  className="button button--primary button--lg"
                  to={useBaseUrl('docs/')}>
                  Get Started
                </Link>                </div> */}
                    </div>
                  </div>
                </div>
                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      {/* <div class="card__header">
                  <h3>Lorem Ipsum 3</h3>
                </div> */}
                      <div class="card__body">
                        <p>
                          No compliance needed to use SigNoz. No need to go
                          through multiple rounds with legal/security teams just
                          for trying it out.
                        </p>
                      </div>
                      {/* <div class="card__footer">
                  <button class="button button--secondary button--block">See All</button>
                </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Next Section */}
          <section>
            <div
              className="container"
              style={{ marginTop: "8rem", marginBottom: "4rem" }}
            >
              <h1 class="text--center margin-vert--lg"> Why SigNoz?</h1>
              <div class="row">
                <div class="col col--6">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__body padding--md">
                        <p>
                          Native support for OpenTelemetry, emerging industry
                          standard for instrumentation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--6">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__body padding--md">
                        <p>
                          Monitor your usage & set your own retention period and
                          sampling rate based on your needs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--6">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__body padding--md">
                        <p>
                          Industry trusted Kafka & Druid to handle enterprise
                          scale. No scaling pains. Ever.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--6">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__body padding--md">
                        <p>
                          Built on latest stack - Golang & React-Typescript
                          loved by developers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div
              className="container"
              style={{ marginTop: "8rem", marginBottom: "4rem" }}
            >
              {/* <img src="https://res.cloudinary.com/dcv3epinx/image/upload/v1621017373/social-icons_vyaa6h.svg" alt="Twitter and LinkedIn logos" /> */}
              <h1 class="text--center margin-vert--lg">
                {" "}
                We love what people are saying about SigNoz
              </h1>
              {/* <h5 className="hero__subtitle text--center">Don't just take our word for it..</h5> */}

              <div class="row">
                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__header">
                        <div class="avatar">
                          <img
                            class="avatar__photo"
                            src="https://res.cloudinary.com/dcv3epinx/image/upload/v1620994526/aloysious_r6dl9i.jpg"
                          />
                          <div class="avatar__intro">
                            <h4 class="avatar__name">Aloysius Coelho</h4>
                            <small class="avatar__subtitle">
                              IT Infrastructure Engineer
                            </small>
                          </div>

                          <a
                            class="platform-icon linkedin"
                            href="https://www.linkedin.com/posts/aloysius-coelho-%E2%98%81%EF%B8%8F-%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-bb1a741b_the-genesis-of-signoz-a-full-stack-open-activity-6798498123242205184-ZEgs"
                            target="_blank"
                            aria-label="Link to Twitter/LinkedIn mention"
                          >
                            <svg
                              alt="LinkedIn icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                class="fill"
                                d="M0 1.71921C0 0.769972 0.794024 0 1.77355 0H22.2264C23.2059 0 24 0.769972 24 1.71921V22.2808C24 23.2303 23.2059 24 22.2264 24H1.77355C0.794024 24 0 23.2303 0 22.2808V1.71921Z"
                                fill="#c0b9c9"
                              ></path>
                              <path
                                class="color"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.27512 20.0905V9.25314H3.65014V20.0905H7.27512ZM5.46262 7.77349C6.72672 7.77349 7.51352 6.9413 7.51352 5.90131C7.48996 4.8379 6.72672 4.02881 5.4866 4.02881C4.2466 4.02881 3.43585 4.8379 3.43585 5.90131C3.43585 6.9413 4.22248 7.77349 5.43899 7.77349H5.46255H5.46262Z"
                                fill="#ffffff"
                              ></path>
                              <path
                                class="color"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.28094 20.0905H12.9059V14.0385C12.9059 13.7146 12.9295 13.391 13.0252 13.1594C13.2872 12.5123 13.8837 11.8421 14.8851 11.8421C16.1968 11.8421 16.7215 12.8359 16.7215 14.2928V20.0905H20.3462V13.8765C20.3462 10.5478 18.5578 8.99884 16.1729 8.99884C14.2173 8.99884 13.3588 10.085 12.8818 10.8248H12.906V9.25314H9.28104C9.32861 10.27 9.28104 20.0905 9.28104 20.0905H9.28094Z"
                                fill="#ffffff"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div class="card__body padding--md">
                        <p>
                          SigNoz - Serious consideration over Grafana and
                          WatchDog.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__header">
                        <div class="avatar">
                          <img
                            class="avatar__photo"
                            src="https://res.cloudinary.com/dcv3epinx/image/upload/v1620994758/rachid_avbfka.jpg"
                          />
                          <div class="avatar__intro">
                            <h4 class="avatar__name">Rachid Zarouali</h4>
                            <small class="avatar__subtitle">
                              Docker Captain, Microsoft Azure MVP
                            </small>
                          </div>

                          <a
                            class="platform-icon linkedin"
                            href="https://www.linkedin.com/posts/rachidzarouali_signozsignoz-activity-6798537979452239872--zSJ"
                            target="_blank"
                            aria-label="Link to Twitter/LinkedIn mention"
                          >
                            <svg
                              alt="LinkedIn icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                class="fill"
                                d="M0 1.71921C0 0.769972 0.794024 0 1.77355 0H22.2264C23.2059 0 24 0.769972 24 1.71921V22.2808C24 23.2303 23.2059 24 22.2264 24H1.77355C0.794024 24 0 23.2303 0 22.2808V1.71921Z"
                                fill="#c0b9c9"
                              ></path>
                              <path
                                class="color"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.27512 20.0905V9.25314H3.65014V20.0905H7.27512ZM5.46262 7.77349C6.72672 7.77349 7.51352 6.9413 7.51352 5.90131C7.48996 4.8379 6.72672 4.02881 5.4866 4.02881C4.2466 4.02881 3.43585 4.8379 3.43585 5.90131C3.43585 6.9413 4.22248 7.77349 5.43899 7.77349H5.46255H5.46262Z"
                                fill="#ffffff"
                              ></path>
                              <path
                                class="color"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.28094 20.0905H12.9059V14.0385C12.9059 13.7146 12.9295 13.391 13.0252 13.1594C13.2872 12.5123 13.8837 11.8421 14.8851 11.8421C16.1968 11.8421 16.7215 12.8359 16.7215 14.2928V20.0905H20.3462V13.8765C20.3462 10.5478 18.5578 8.99884 16.1729 8.99884C14.2173 8.99884 13.3588 10.085 12.8818 10.8248H12.906V9.25314H9.28104C9.32861 10.27 9.28104 20.0905 9.28104 20.0905H9.28094Z"
                                fill="#ffffff"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div class="card__body padding--md">
                        <p>
                          A new and yet powerful #observability #opensource
                          alternative has born in the name of SigNoz. It could
                          offer a serious challenger to Datadog / New Relic and
                          other SaaS solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__header">
                        <div class="avatar">
                          <img
                            class="avatar__photo"
                            src="https://res.cloudinary.com/dcv3epinx/image/upload/v1620995322/kaushik_ajmrtq.jpg"
                          />
                          <div class="avatar__intro">
                            <h4 class="avatar__name">Kaushik Thirthappa</h4>
                            <small class="avatar__subtitle">
                              Built @Spikedhq
                            </small>
                          </div>

                          <a
                            class="platform-icon twitter"
                            href="https://twitter.com/ktkaushik/status/1364502393996468229?s=20"
                            target="_blank"
                            aria-label="Link to Twitter/LinkedIn mention"
                          >
                            <svg
                              alt="Twitter icon"
                              width="24"
                              height="20"
                              viewBox="0 0 24 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                class="fill"
                                d="M7.54752 20C16.6042 20 21.5578 12.3047 21.5578 5.63144C21.5578 5.41287 21.5578 5.19529 21.5434 4.97869C22.507 4.26381 23.3389 3.37867 24 2.3647C23.1013 2.77309 22.148 3.04092 21.1718 3.15923C22.1998 2.52812 22.9691 1.53548 23.3366 0.366057C22.3701 0.954283 21.3126 1.36884 20.2099 1.59182C19.4675 0.782212 18.4856 0.246107 17.4162 0.0664704C16.3468 -0.113166 15.2494 0.0736804 14.294 0.598096C13.3385 1.12251 12.5782 1.95526 12.1307 2.96748C11.6833 3.9797 11.5735 5.11495 11.8186 6.19756C9.86088 6.09691 7.94572 5.57516 6.19741 4.66618C4.4491 3.7572 2.90672 2.48131 1.6704 0.921344C1.04073 2.03306 0.847872 3.34911 1.1311 4.60154C1.41433 5.85397 2.15234 6.9486 3.19488 7.66257C2.41127 7.63876 1.64475 7.42196 0.96 7.03049C0.96 7.05117 0.96 7.07283 0.96 7.09449C0.960311 8.26041 1.35385 9.39034 2.07387 10.2926C2.79389 11.1949 3.79606 11.8139 4.9104 12.0448C4.18547 12.2476 3.42488 12.2772 2.68704 12.1315C3.00169 13.1349 3.61427 14.0124 4.43911 14.6412C5.26395 15.27 6.25979 15.6186 7.28736 15.6384C5.54375 17.0438 3.38982 17.8067 1.17216 17.8044C0.780387 17.8037 0.388996 17.7793 0 17.7316C2.25181 19.2136 4.87192 19.9997 7.54752 19.9961"
                                fill="#c0b9c9"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div class="card__body padding--md">
                        <p>
                          Observability will see some major waves over the next
                          few years and @SignozHQ, I believe, will have a
                          pivotal role to play.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div
              className="container"
              style={{ marginTop: "6rem", marginBottom: "3rem" }}
            >
              <div class="row">
                <div class="col col--4">
                  <p className="faq_left_panel text--center margin--md">
                    Open source and Free to self-host{" "}
                  </p>
                </div>

                <div class="col col--8">
                  <p className="hero__subtitle margin--md">
                    Frequently Asked Questions
                  </p>
                  <div class="card-demo margin--md">
                    <Collapse
                      bordered={false}
                      // defaultActiveKey={['1']}
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      className="site-collapse-custom-collapse"
                    >
                      <Panel
                        header=" I am looking for an application monitoring tool, is SigNoz an APM?"
                        key="1"
                        className="card"
                        style={{
                          marginTop: "1rem",
                          marginBottom: "1rem",
                          padding: "1rem",
                        }}
                      >
                        <div class="card__body">
                          <p>
                            SigNoz is more than an APM. We provide all features
                            like metrics and request traces which APMs provide.
                            On top of that. we provide advanced filtering on
                            trace data and custom aggregation on it
                          </p>
                        </div>
                      </Panel>

                      <Panel
                        header="How does SigNoz compare to Jaeger?"
                        key="2"
                        className="card"
                        style={{
                          marginTop: "1rem",
                          marginBottom: "1rem",
                          padding: "1rem",
                        }}
                      >
                        <div class="card__body">
                          <p>
                            Few ways in which SigNoz is more advanced than
                            Jaeger : Jaeger UI doesn’t show any metrics on
                            traces or on filtered traces, and Jaeger can’t get
                            aggregates on filtered traces. For example,
                            Cassandra doesn’t support Group By, Max, etc.
                          </p>
                        </div>
                      </Panel>

                      <Panel
                        header="What will be your paid plan like?"
                        key="3"
                        className="card"
                        style={{
                          marginTop: "1rem",
                          marginBottom: "1rem",
                          padding: "1rem",
                        }}
                      >
                        <div class="card__body">
                          <p>
                            SigNoz will be always open-source and free to be
                            self-hosted for smaller teams. We will have role
                            based Pricing for our enterprise edition which will
                            have advanced features needed by bigger teams.
                            <br></br>
                            Though for users who want hosted version of SigNoz,
                            we do have cloud plans.
                          </p>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container" style={{ marginBottom: "2rem" }}>
              <div class="row">
                <div class="col col--6">
                  <p className="bottom_cta_interested text--center margin--md">
                    Interested in trying out SigNoz?{" "}
                  </p>
                </div>
                <div class="col col--6">
                  <div>
                    <Link
                      className="button button--primary margin--md "
                      //  onClick={setShowTrySignozModal.bind(this,true)}>
                      href={"/docs/deployment/docker"}
                    >
                      Get Started
                    </Link>
                    <Link
                      className="button button--secondary margin--md"
                      href={"https://github.com/SigNoz/signoz"}
                      onClick={requestDemoClicked}
                    >
                      GitHub Repo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
      <div id={"modal-root"}></div>
    </>
  );
}

export default Home;
