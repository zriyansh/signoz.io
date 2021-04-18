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
import {PlaySVG} from "../svgs/common";

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
  }

  const handlePrivacy =()=>{
    setFeature('olap');
  }

  const handleExtendibility =()=>{
    setFeature('tag-filtering');
  }

  return(
  <div className='container'>
      <div className="container">
          <div className='row'>
              <div className={clsx('col col--4', styles.menu__list)}>
                  <button onClick={handlePricing} className={`button button--lg ${feature === "pricing"? "feature-tab-css__selected":"feature-tab-css"}`}  style={{marginBottom: 20, marginTop:0, whiteSpace: 'normal'}}>Integrated UI for metrics and traces</button>
                  <button onClick={handlePrivacy} className={`button button--lg ${feature === "olap"? "feature-tab-css__selected":"feature-tab-css"}`} style={{marginBottom: 20, marginTop:20, whiteSpace: 'normal'}} >Run business specific queries </button>
                  <button onClick={handleExtendibility} className={`button button--lg ${feature === "tag-filtering"? "feature-tab-css__selected":"feature-tab-css"}`}  style={{marginBottom: 20, marginTop:20 , whiteSpace: 'normal'}} >Run aggregates on custom tags</button>


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
    imageUrl: 'img/Vector_3v5.svg',
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
              <Link style={{textDecoration: "none"}} href={"/docs/deployment/docker"}>
              <ModalCard title={"Open source"} desc={"Want to use our free open-source product?"} info={<div>Deploy SigNoz to your infrastructure. Free <div>forever</div></div>}/>
              </Link>
              </div>
            
              <div className={"col col--6"} style={{display: "flex", justifyContent: "center"}}>
              <Link style={{textDecoration: "none"}}
                    href={"/pricing"}>
                <ModalCard
                    title={"Cloud"} desc={"Small business or low volume & don’t want hassle?"} info={"This is the simplest way to get started. Create an account"}/>

              </Link>
            </div>
          </div>
       </div>
      </ReactModal>
  )
}


function SubscribeNearFold() {
  const [nemail, setNEmail] = useState('')

  const onSubscribeN = ()=>{
    if(nemail.length<4){
      // alert("Please add correct email")
      setNEmail('Please add correct email')
    }else{
      fetch(`https://api.telegram.org/bot1641579317:AAGHqzQKOT9R3Wcxx7ZgHZcI0Vi6CzjmncY/sendMessage?chat_id=521831111&text=Email subscription - ${nemail}`).then(()=>{
        // alert("Subscribed successfully.")
        setNEmail('Thanks, you are on the list!')
      }).catch((e)=>{
        // alert("Some error occurred. Please try again.")
        setNEmail("Some error occurred. Please try again.")
      })
    }

  

  }

  return (
  <section style={{background:'#060606'}}>
  <div className="container" style={{paddingTop: '1rem', paddingBottom:'1rem',}}>
  <div class="row">
      <div class="col col--12"   style={{
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center'}}>
        Interested?
      </div>
  </div>
  <div class="row">
    <div class="col col--8"   style={{
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center'}}>
      <input placeholder="Add your email to get updates about the project" className={"nearfold-newsletter"} value={nemail} onChange={(e)=>{
        setNEmail(e.target.value);console.log(e.target.value)
      }}/>
    </div>
    <div class="col col--4"
    style={{
      display: 'flex',
      alignItems: 'center'}}>
      <button className={"button button--secondary"} style={{marginBottom:'20px', marginTop:'12px'}} onClick={onSubscribeN} >Subscribe</button>
    </div>
  </div>
  </div>
</section>)


}

function Home() {
  const[showTrySignozModal, setShowTrySignozModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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
      <header className="hero hero--dark">
        <div className="container">
          <div className="row">
          <div className="col col--4">
              <p className="hero__title " style={{"fontWeight": "bold"}}>Open-source Observability platform</p>
              <p className="hero__subtitle">Understand issues in your deployed applications & solve them quickly</p>
              <div style={{"margin": "1rem 0"}}>
                <Link style={{"margin": "6px","paddingLeft":"10px","paddingRight":"10px"}}
                  className="button button--primary "
                     // onClick={setShowTrySignozModal.bind(this,true)}
                  href={"/docs/deployment/docker"}
                  onClick={getStartedClicked}>

                  Get Started for free
                </Link>
                <Link style={{"margin": "6px", "paddingLeft":"10px","paddingRight":"10px"}}
                  className="button button--outline button--secondary "
                  href={'https://github.com/SigNoz/signoz'} onClick={requestDemoClicked}>
                  GitHub Repo 
                </Link>
              </div>


              {/* <p className="open-source-label">SigNoz is <strong>free</strong> and <strong>open-source</strong></p> */}
            <div style={{display: "flex", alignItems: "center", "marginBottom": "16px"}}>
              <img src={"/img/yc-logo-white.svg"} height={24} style={{marginRight: 16}}/> Backed by Y Combinator
            </div>

            </div>
            <div className="col col--8">
              <div className="hero__screenshot">
                <div style={{ width: "100%"}}>
                  {
                    showVideo === false ? (
                        <div id={"demo-video-cover"} onClick={setShowVideo.bind(this, true)} style={{
                          background: "url('/videos/demo_cover.png')",
                          height: 426,
                          width: "100%"
                        }}>
                          <div id={"demo-overlay"}></div>
                          <div id={"demo-content"}>
                            <div style={{fontSize: 18, fontWeight: 600, marginBottom: 20}}>SigNoz - Quick Intro</div>
                            <PlaySVG/>
                          </div>
                        </div>
                    ) : (
                        <div>
                          <video width="100%" height="420" autoPlay controls id={"demo-video-player"}>
                            <source src="https://demo-video-1.s3.us-east-2.amazonaws.com/demo.mp4" type="video/mp4"/>
                            Your browser does not support the video tag.
                          </video>
                        </div>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        
        
        <SubscribeNearFold />

        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container" style={{marginTop: '2rem', marginBottom:'2rem'}}>
            {/* <div className="container" class="margin--md">  */}

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
      <div className="container" style={{marginTop: '2rem', marginBottom:'2rem'}}>
        {/* <p className="hero__title ">Single pane for complete metrics and traces, no need to shift to different systems</p> */}
        <h1 class="text--center">
        Single pane for complete metrics and traces, no need to shift to different systems </h1>
        <p className="hero__subtitle text--center">No disparate UI like Prometheus & Jaeger</p>
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
                  Your data storage cost is only dependent on your application load, rather than factors like number of nodes, which is an architectural preference.
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


        {/* <section style={{width: '70%', margin: '0px auto -30px auto',}}>
          <div className="row">
            <div className="col col--3" style={{textAlign: 'center'}}>
              <img src={"/img/partners/aws1.png"} width={60}/>
            </div>
            <div className="col col--3" style={{textAlign: 'center'}} >
              <img src={"/img/partners/druid1.png"}  width={120}/>
            </div>
            <div className="col col--3" style={{textAlign: 'center'}}>
              <img src={"/img/partners/google-cloud1.png"}  width={140}/>
            </div>
            <div className="col col--3" style={{textAlign: 'center'}}>
              <img src={"/img/partners/opentelemetry-stacked-color1.png"}  width={100}/>
            </div>
          </div>
        </section> */}


        <section>
      <div className="container" style={{marginTop: '6rem', marginBottom:'3rem'}}>
        <div class="row">
          <div class="col col--4">
            <p className="faq_left_panel text--center margin--md" >Open source and Free to self-host </p>
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
                  SigNoz will be always open-source and free to be self-hosted for smaller teams. We will have role based Pricing for our enterprise
                  edition which will have advanced features needed by bigger teams.<br></br>
                  Though for users who want hosted version of SigNoz, we do have cloud plans.</p>
                </div>
              </Panel>

            </Collapse>

            </div>
          </div>

        </div>
      </div>
    </section>


    <section>
      <div className="container" style={{ marginBottom:'2rem'}} >

      <div class="row">
          <div class="col col--6">
          <p className="bottom_cta_interested text--center margin--md">Interested in trying out SigNoz? </p>
          </div>
            <div class="col col--6">
              <div>
                        <Link 
                          className="button button--primary margin--md "
                             onClick={setShowTrySignozModal.bind(this,true)}>
                                href={'https://github.com/SigNoz/signoz'}

                          Get Started
                        </Link>
                        <Link 
                          className="button button--secondary margin--md"
                          href={'https://github.com/SigNoz/signoz'} onClick={requestDemoClicked}>
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
