import React, {useEffect, useState} from 'react';
import ReactModal from "react-modal";
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {Collapse} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import ReactGA from 'react-ga';
// import createHistory from 'history/createBrowserHistory';
import styles from './styles.module.css';
// import CodeSnippet from "@site/src/theme/CodeSnippet";
// import Tabs from '@theme/Tabs';
// import TabItem from '@theme/TabItem';//in markdown features
import styled from 'styled-components'
import {InstrumentationModal} from "../components/InstrumentationModal";

const { Panel } = Collapse;

// const history = createHistory();
ReactGA.initialize('UA-152867655-1');// How to make it appear only for production?
// useEffect(() => {
ReactGA.pageview('Home Page')
// }, [])
// history.listen((location, action) => {
//   ReactGA.pageview(location.pathname + location.search);
//   console.log(location.pathname)
// });
ReactGA.event({
  category: 'User',
  action: 'Opened Main page'
})

const getStartedClicked = () => {
  ReactGA.event({
    category: 'User',
    action: 'Clicked get started button'
  })
}

const requestDemoClicked = () => {
  ReactGA.event({
    category: 'User',
    action: 'Request Demo Clicked'
  })
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const snippets = [
  {
    label: 'Mapping',
    further: '/docs/',
    config: `input:
  gcp_pubsub:
    project: foo
    subscription: bar
pipeline:
  processors:
    - bloblang: |
        root.message = this
        root.meta.link_count = this.links.length()
        root.user.age = this.user.age.number()
output:
  redis_streams:
    url: tcp://TODO:6379
    stream: baz
    max_in_flight: 20`,
  },
  {
    label: 'Multiplexing',
    further: '/docs/',
    config: `input:
  kafka:
    addresses: [ TODO ]
    topics: [ foo, bar ]
    consumer_group: foogroup
output:
  switch:
    cases:
      - check: doc.tags.contains("AWS")
        output:
          aws_sqs:
            url: https://sqs.us-west-2.amazonaws.com/TODO/TODO
            max_in_flight: 20
      - output:
          redis_pubsub:
            url: tcp://TODO:6379
            channel: baz
            max_in_flight: 20`,
  },
  {
    label: 'Enrichments',
    further: '/docs',
    config: `input:
  mqtt:
    urls: [ tcp://TODO:1883 ]
    topics: [ foo ]
pipeline:
  processors:
    - branch:
        request_map: |
          root.id = this.doc.id
          root.content = this.doc.body
        processors:
          - aws_lambda:
              function: sentiment_analysis
        result_map: root.results.sentiment = this
output:
  aws_s3:
    bucket: TODO
    path: '\${! meta("partition") }/\${! timestamp_unix_nano() }.tar.gz'
    batching:
      count: 100
      period: 10s
      processors:
        - archive:
            format: tar
        - compress:
            algorithm: gzip`,
  },
];

const WhySigNoz = () => {

  const [feature, setFeature] = useState('pricing');

  const handlePricing =()=>{
    setFeature('pricing');
    console.log(feature);
  }

  const handlePrivacy =()=>{
    setFeature('olap');
    console.log(feature);
  }

  const handleExtendibility =()=>{
    setFeature('tag-filtering');
    console.log(feature);
  }

  return(
  <div className='container'>
      <div className="container">
          <div className='row'>
              <div className={clsx('col col--4', styles.menu__list)}>
                  <button onClick={handlePricing} class="button button--primary button--lg " style={{marginBottom: 20, marginTop:0, whiteSpace: 'normal'}}>Integrated UI for metrics and traces</button>
                  <button onClick={handlePrivacy} class="button button--primary button--lg" style={{marginBottom: 20, marginTop:20, whiteSpace: 'normal'}} >Run business specific queries </button>
                  <button onClick={handleExtendibility} class="button button--primary button--lg" style={{marginBottom: 20, marginTop:20 , whiteSpace: 'normal'}} >Run aggregates on custom tags</button>


              </div>
              <div className='col col--8'>
              <div className="hero__screenshot" style={{display:feature==='pricing'?'block':'none'}}>
                <img src={useBaseUrl("img/metrics-tooltip-traces.jpg")} alt="SigNoz screenshot" />
              </div>
              <div className="hero__screenshot" style={{display:feature==='olap'?'block':'none'}}>
                <img src={useBaseUrl("img/business-metrics-light.jpg")} alt="SigNoz screenshot" />
              </div>
              <div className="hero__screenshot" style={{display:feature==='tag-filtering'?'block':'none'}}>
                <img src={useBaseUrl("img/custom-aggregates.jpg")} alt="SigNoz screenshot" />
              </div>

              </div>
          </div>
      </div>
  </div>


  )




}


// function Snippet({label, config}) {
//   return (
//     <CodeSnippet className={styles.configSnippet}  snippet={config}></CodeSnippet>
//   );
// }

const features = [
  {
    title: 'Your data in your boundary',
    imageUrl: 'img/Vector_1.svg',
    description: (
      <>
        No need to worry about GDPR and other data protection laws.
        All your tracing and monitoring data is now in YOUR infra.
      </>
    ),
  },
  {
    title: 'Forget HUGE SaaS bills',
    imageUrl: 'img/Vector_2.svg',
    description: (
      <>
        No abrupt pricing changes. No unexpected month-end bills. Get transparent usage data.
      </>
    ),
  },
  {
    title: 'Take Control',
    imageUrl: 'img/Vector_3.svg',
    description: (
      <>
        No need to spend weeks in vendor slack for that one small feature. Extend SigNoz to suit your needs.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 >{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ModalCard(props) {
  const {title, desc, info, link, button} = props;

  return (
  <div className="card-demo" style={{width: "100%",  marginTop: "1.5rem", maxWidth: "14rem"}}>
    <div className="card"style={{ color: "#000", height: "15rem"}}>
      <div className="card__header">
        <h3 style={{color: "#333333"}}>{title}</h3>
      </div>
      <div className="card__body">
        <p>
          {desc}
        </p>
      </div>
      <div className="card__footer" style={{color: "#2F80ED"}}>
        {info}
      </div>
      {button}
    </div>

  </div>);
}

function TrySignozModal(props){
  const {isOpen, onClose} = props;

  return (
      <ReactModal
          isOpen={isOpen}
          contentLabel="onRequestClose Example"
          onRequestClose={onClose}
          className="Modal try-signoz-modal"
          overlayClassName="Overlay"
      >
       <h1 style={{marginTop: "2rem", textAlign: "center", color: "#333333"}}>Try SigNoz for free</h1>
       <div className={"container"}>
          <div className={"row"}>
            <div className={"col col--6"} style={{display: "flex", justifyContent: "center"}}>
                <ModalCard
                    button={(
                        <Link style={{"margin": "6px", marginTop:20, marginBottom:20}}
                              className="button button--primary "
                              href={"https://app.signoz.io"}>
                          Continue
                        </Link>
                    )}
                    title={"Cloud"} desc={"Small business or low volume & don’t want hassle?"} info={"This is the simplest way to get started. Create an account"}/>

            </div>
            <div className={"col col--6"} style={{display: "flex", justifyContent: "center"}}>
              <ModalCard title={"Open source"} desc={"Want to use our free open-source product?"} info={<div>Deploy SigNoz to your infrastructure. Free <div>forever</div></div>}/>
            </div>
          </div>
       </div>
      </ReactModal>
  )
}


function Home() {
  const[showTrySignozModal, setShowTrySignozModal] = useState(false);

  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  useEffect(() => {
    ReactModal.setAppElement("#modal-root");
  }, []);

  const closeTrySignozModal = () => {
    setShowTrySignozModal(false);
  };

  return (
    <>
    <Layout
      // title={`Hello from ${siteConfig.title}`}

      title={`Open source Observability platform`}
      description="SigNoz is an opensource observability platform to help you find issues in your deployed applications & solve them quickly.
      It provides an integrated UI for metrics and traces with deep filtering and aggregation to pin down specific issues very quickly.
      Built on Kafka and Druid, it is designed to handle enterprise scale.">
      <TrySignozModal isOpen={showTrySignozModal} onClose={closeTrySignozModal}/>
      {/*<InstrumentationModal isOpen={showTrySignozModal} onClose={closeTrySignozModal}/>*/}
      <header className="hero hero--dark">
      {/* {console.log(window)} */}
        <div className="container">
          <div className="row">
          <div className="col col--4">
              <p className="hero__title " style={{"fontWeight": "bold"}}>Open-source Observability platform</p>
              <p className="hero__subtitle">Understand issues in your deployed applications & solve them quickly</p>
              <div style={{"margin": "1rem 0"}}>
                <Link style={{"margin": "6px"}}
                  className="button button--secondary"
                      onClick={setShowTrySignozModal.bind(this,true)}>

                  Get Started
                </Link>
                <Link style={{"margin": "6px"}}
                  className="button button--primary "
                  href={'https://v6fhsfo1g0y.typeform.com/to/wTs4Mbzi'} onClick={requestDemoClicked}>
                  Request Demo
                </Link>
              </div>
              <p className="open-source-label">SigNoz is <strong>free</strong> and <strong>open-source</strong></p>

              {/* <iframe
                className="display--tablet"
                src={`https://ghbtns.com/github-btn.html?user=infracost&repo=infracost&type=star&count=true&size=large`}
                frameBorder="0"
                scrolling="0"
                width="160"
                height="30"
                title="Star SigNoz on GitHub">
              </iframe> */}
            </div>
            <div className="col col--8">
              <div className="hero__screenshot">
                <img src={useBaseUrl("img/hero-recording.gif")} alt="SigNoz screenshot" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container" style={{marginTop: '4rem', marginBottom:'4rem'}}>
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          fontSize: '20px',
        }}>
        <p>
          Edit <code>pages/hello.js</code> and save to reload.
        </p>
      </div> */}


        {/* <Title> Why SigNoz! </Title>
      <div className="container">
        <ul class="pills pills--block">
          <li class="pills__item pills__item--active">Alpha</li>
          <li class="pills__item">Beta</li>
          <li class="pills__item">Gamma</li>
          <li class="pills__item">Zeta</li>
        </ul>
      </div> */}

        {/* Tab Switcher component */}
    {/* <div className="container">
      <div className={'col col--6'}>
      {snippets && snippets.length && (
                  <section className={styles.configSnippets}>
                    <Tabs defaultValue={snippets[0].label} values={snippets.map((props, idx) => {
                      return {label:props.label, value:props.label};
                    })}>
                      {snippets.map((props, idx) => (
                        <TabItem value={props.label}>
                          <>
                          <Snippet key={idx} {...props} />
                          <Link
                            className={clsx('button button--outline button--secondary')}
                            to={props.further}>
                            Read more
                          </Link>
                          </>
                        </TabItem>))}

                    </Tabs>
                  </section>
                )}
        </div>
      </div> */}


    <section>
      <div className="container" style={{marginTop: '4rem', marginBottom:'4rem'}}>
        {/* <p className="hero__title ">Single pane for complete metrics and traces, no need to shift to different systems</p> */}
        <h1 class="text--center">
        Single pane for complete metrics and traces, no need to shift to different systems </h1>
        <p className="hero__subtitle text--center">No disparate UI for Prometheus & Jaeger</p>
      </div>
    </section>

      <WhySigNoz />

    <section>
      <div className="container" style={{marginTop: '8rem', marginBottom:'4rem'}}>
        <h1 class="text--center margin-vert--lg"> Why get locked-in with SaaS vendors like DataDog when you can use Open source?</h1>
        <div class="row">
          <div class="col col--4">
            <div class="card-demo margin--md">
              <div class="card">
                {/* <div class="card__header">
                  <h3>Lorem Ipsum 1</h3>
                </div> */}
                <div class="card__body">
                  <p>
                  No fear of SaaS service getting hacked and your customer’s data getting compromised. Have complete control on your data.
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
                  Your data strorage cost is only depended on your application load, rather than factors like number of nodes, which is an architectural preference.
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
                    No compliance needed to use SigNoz. No need to go through multiple rounds with legal/security teams just for trying it out.
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
      <div className="container" style={{marginTop: '8rem', marginBottom:'4rem'}}>
        <h1 class="text--center margin-vert--lg"> Why SigNoz?</h1>
        <div class="row">
          <div class="col col--6">
            <div class="card-demo margin--md">
              <div class="card">
                <div class="card__body padding--md">
                  <p>
                    Native support for OpenTelemetry, emerging industry standard for instrumentation
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
                  Monitor your usage & set your own retention period and sampling rate based on your needs
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
                  Industry trusted Kafka & Druid to handle enterprise scale. No scaling pains. Ever.
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
                  Built on latest stack - Golang & React-Typescript loved by developers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="container" style={{marginTop: '6rem', marginBottom:'6rem'}}>
        <div class="row">
          <div class="col col--4">
            <p className="faq_left_panel text--center margin--md" >Open source & free for unlimited users</p>
          </div>

          <div class="col col--8">
            <p className="hero__subtitle margin--md">Frequently Asked Questions</p>
            <div class="card-demo margin--md">
            <Collapse
              bordered={false}
              // defaultActiveKey={['1']}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              className="site-collapse-custom-collapse"
            >
              <Panel header=" I am looking for an application monitoring tool, is SigNoz an APM?" key="1" className="card" style={{marginTop:'1rem', marginBottom:'1rem', padding:'1rem'}}>
                <div class="card__body">
                  <p>
                      SigNoz is more than an APM. We provide all features like
                      metrics and request traces which APMs provide. On top
                      of that. we provide advanced filtering on trace data and
                      custom aggregation on it
                  </p>
                </div>
              </Panel>

              <Panel header="How does SigNoz compare to Jaeger?" key="2" className="card" style={{marginTop:'1rem', marginBottom:'1rem', padding:'1rem'}}>
                <div class="card__body">
                  <p>
                      Few ways in which SigNoz is more advanced than Jaeger : Jaeger UI doesn’t show any metrics on traces
                      or on filtered traces, and Jaeger can’t get aggregates on filtered traces. For example, Cassandra doesn’t
                      support Group By, Max, etc.</p>
                </div>
              </Panel>

              <Panel header="What will be your paid plan like?" key="3" className="card" style={{marginTop:'1rem', marginBottom:'1rem', padding:'1rem'}}>
                <div class="card__body">
                  <p>
                  SigNoz will be always open-source and free for smaller teams. We will have role based pricing for our enterprise
                  edition which will have advanced features needed by bigger teams.</p>
                </div>
              </Panel>

            </Collapse>

            </div>
          </div>

        </div>
      </div>
    </section>
        <section>
          <div className={"padding--md"} style={{background: "#030201"}}>
            <div style={{display: "flex"}}>
              <div style={{display: "flex", alignItems: "center"}}>
                <img src={"/img/yc-logo.png"}/>
              </div>
              <div  style={{color: "#F2F2F2", display: "flex", alignItems: "center", padding: 0, marginLeft: "2rem", fontWeight: 700}}>
                Backed by Y Combinator
              </div>
              <div style={{display: "flex", alignItems: "center", marginLeft: "auto", width: "4rem", height: "4rem", background: "#C4C4C4", borderRadius: "2rem", color: "#000", fontSize: 14, justifyContent: "center", fontWeight: 600}}>
                <div><div>Join us</div><div>on slack</div></div>
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
