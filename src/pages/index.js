import React,{useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
// import CodeSnippet from "@site/src/theme/CodeSnippet";
// import Tabs from '@theme/Tabs';
// import TabItem from '@theme/TabItem';//in markdown features

import styled from 'styled-components'



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
                  <button onClick={handlePrivacy} class="button button--primary button--lg" style={{marginBottom: 20, marginTop:20, whiteSpace: 'normal'}} >Run business specific queries (e.g. customer types)</button>
                  <button onClick={handleExtendibility} class="button button--primary button--lg" style={{marginBottom: 0, marginTop:20 , whiteSpace: 'normal'}} >Run aggregates on custom tags</button>


              </div>
              <div className='col col--8'>
              <div className="hero__screenshot" style={{display:feature==='pricing'?'block':'none'}}>
                <img src={useBaseUrl("img/metrics-traces.jpg")} alt="SigNoz screenshot" />
              </div>
              <div className="hero__screenshot" style={{display:feature==='olap'?'block':'none'}}>
                <img src={useBaseUrl("img/business-query.jpg")} alt="SigNoz screenshot" />
              </div>
              <div className="hero__screenshot" style={{display:feature==='tag-filtering'?'block':'none'}}>
                <img src={useBaseUrl("img/SigNoz-Hero-shot.jpg")} alt="SigNoz screenshot" />
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
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        No need to worry about GDPR and other data protection laws. 
        All your tracing and monitoring data is now in YOUR infra.
      </>
    ),
  },
  {
    title: 'Forget HUGE SaaS bills',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        No abrupt pricing changes. No unexpected month-end bills. Get transparent usage data.
      </>
    ),
  },
  {
    title: 'Take Control',
    imageUrl: 'img/undraw_docusaurus_react.svg',
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

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className="hero hero--dark">
        <div className="container">
          <div className="row">
          <div className="col col--4">
              <p className="hero__title " style={{"font-weight": "bold"}}>Open-source Observability platform</p>
              <p className="hero__subtitle">Understand issues in your deployed applications & solve them quickly</p>
              <div style={{"margin": "2rem 0"}}>
                <Link
                  className="button button--primary button--lg"
                  to={useBaseUrl('docs/')}>
                  Get Started
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
            <div className="container">
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
      <div className="container">
        {/* <p className="hero__title ">Single pane for complete metrics and traces, no need to shift to different systems</p> */}
        <h1 class="text--center">
        Single pane for complete metrics and traces, no need to shift to different systems </h1>
        <p className="hero__subtitle text--center">No disparate UI for Prometheus & Jaeger</p>
      </div>
    </section>

      <WhySigNoz />
    
    <section>
      <div className="container margin-vert--md">
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
                  Your data strorage cost is only depended on your application load, rather than arcane things like number of nodes.
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
      <div className="container margin-vert--md">
        <h1 class="text--center margin-vert--lg"> Why SigNoz?</h1>
        <div class="row"> 
          <div class="col col--6">
            <div class="card-demo margin--md">
              <div class="card">
                <div class="card__body padding--md">
                  <p>
                    Native support for OpenTelemetry
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
                  Monitor your usage & set your own retention period 
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
                  Industry trusted Kafka & Druid to handle enterprise scale
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
                  </p>
                </div>
              </div>  
            </div>
          </div>
          

        </div>
      </div>
    </section>

      

      </main>
    </Layout>
  );
}

export default Home;
