import React,{useState, useCallback} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import CodeSnippet from "@site/src/theme/CodeSnippet";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';//in markdown features
import Button from "@site/src/theme/Button"

import styled from 'styled-components'

import prCss from "../css/property.module.css"
import seCss from "../css/section.module.css"
import meCss from "../css/index/menu.module.css"

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const snippets = [
  {
    label: 'Mapping',
    further: '/docs/guides/bloblang/about',
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
    further: '/docs/components/outputs/about#multiplexing-outputs',
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
    further: '/cookbooks/enrichments',
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

  const [feature, setFeature] = useState('privacy');

  const handlePricing =()=>{
    setFeature('pricing');
    console.log(feature);
  }

  const handlePrivacy =()=>{
    setFeature('privacy');
    console.log(feature);
  }

  const handleExtendibility =()=>{
    setFeature('extendibility');
    console.log(feature);
  }

  return(

  <div className='container'>
      <div className="container">
          <div className='row'>
              <div className={clsx('col col--4', styles.menu__list)}>
                  <button onClick={handlePricing} class="button button--primary button--lg " style={{marginBottom: 20, marginTop:20}}>Pricing</button>
                  <button onClick={handlePrivacy} class="button button--primary button--lg" style={{marginBottom: 20, marginTop:20}} >Privacy</button>
                  <button onClick={handleExtendibility} class="button button--primary button--lg" style={{marginBottom: 20, marginTop:20}} >Extendibility</button>
              </div>
              <div className='col col--8'>
              <div className="hero__screenshot" style={{display:feature==='pricing'?'block':'none'}}>
                <img src={useBaseUrl("img/SigNoz-hero-shot.jpg")} alt="SigNoz screenshot" />
              </div>

              </div>
          </div>
      </div>
  </div>


  )

  


}

const Why = () => {
  const [opened, setOpened] = useState(
    "digital",
  )
  const handleClickIs = useCallback(() => {
    setOpened("digital")
  }, [])
  const handleClickGoodFor = useCallback(() => {
    setOpened("realtime")
  }, [])
  const handleClickIsNot = useCallback(() => {
    setOpened("integration")
  }, [])

  return (
    <section className={clsx(seCss.section, seCss["section--odd"])}>
      <div className={clsx(seCss["section--inner"], seCss["section--center"])}>
        <h2
          className={clsx(
            seCss.section__title,
            seCss["section__title--wide"],
            "text--center",
          )}
        >
          Why QuestDB?
        </h2>

        <div
          className={clsx(seCss.section__footer, seCss["section__footer--why"])}
        >
          <div className={meCss.menu__list}>
            <Button
              className={meCss.menu__button}
              onClick={handleClickIs}
              size="small"
              variant={opened === "digital" ? "primary" : "tertiary"}
            >
              Digital transformation
            </Button>
            <Button
              className={meCss.menu__button}
              onClick={handleClickGoodFor}
              size="small"
              variant={opened === "realtime" ? "primary" : "tertiary"}
            >
              Real-time insights
            </Button>
            <Button
              className={meCss.menu__button}
              onClick={handleClickIsNot}
              size="small"
              variant={opened === "integration" ? "primary" : "tertiary"}
            >
              Enterprise integration
            </Button>
          </div>

          <div className={meCss.menu__content}>
            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "digital",
              })}
            >
              <p className={prCss.property}>Reduce hardware costs</p>
              <p className={prCss.property}>Contain operational complexity</p>
              <p className={prCss.property}>Decrease development costs</p>
              <p className={prCss.property}>Cloud native (AWS, Azure, GCP)</p>
              <p className={prCss.property}>On premises or embedded</p>
            </div>

            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "realtime",
              })}
            >
              <p className={prCss.property}>Streaming</p>
              <p className={prCss.property}>Operational analytics / OLAP</p>
              <p className={prCss.property}>Monitoring and observability</p>
              <p className={prCss.property}>Predictive analytics</p>
            </div>

            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "integration",
              })}
            >
              <p className={prCss.property}>Active directory</p>
              <p className={prCss.property}>High performance replication</p>
              <p className={prCss.property}>High availability</p>
              <p className={prCss.property}>Clustering</p>
              <p className={prCss.property}>Enterprise security</p>
              <p className={prCss.property}>Postgres compatible/API</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Snippet({label, config}) {
  return (
    <CodeSnippet className={styles.configSnippet}  snippet={config}></CodeSnippet>
  );
}

const features = [
  {
    title: 'Easy to Use',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
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
      <h3 className="text--center">{title}</h3>
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
              <p className="hero__title">Observability of your application</p>
              <p className="hero__subtitle">with deep filtering of traces</p>
              <div style={{"margin": "2rem 0"}}>
                <Link
                  className="button button--primary button--lg"
                  to={useBaseUrl('docs/')}>
                  Get Started
                </Link>
              </div>
              <p className="open-source-label">SigNoz is <strong>free</strong> and <strong>open-source</strong></p>
             
              <iframe
                className="display--tablet"
                src={`https://ghbtns.com/github-btn.html?user=infracost&repo=infracost&type=star&count=true&size=large`}
                frameBorder="0"
                scrolling="0"
                width="160"
                height="30"
                title="Star SigNoz on GitHub">
              </iframe>
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
        <div
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
      </div>

        
        <Title> Why SigNoz! </Title>
      <div className="container">
        <ul class="pills pills--block">
          <li class="pills__item pills__item--active">Alpha</li>
          <li class="pills__item">Beta</li>
          <li class="pills__item">Gamma</li>
          <li class="pills__item">Zeta</li>
        </ul>
      </div>

        {/* Tab Switcher component */}
    <div className="container">
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
    </div>


      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          fontSize: '28px',
        }}>
        <p>
        Is the clunky, overpriced application monitoring tool you're using today honestly worth it?
        </p>
      </div>

    

      <WhySigNoz />

      </main>
    </Layout>
  );
}

export default Home;
