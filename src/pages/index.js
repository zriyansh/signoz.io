import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import CodeSnippet from "@site/src/theme/CodeSnippet";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
                title="Star Infracost on GitHub">
              </iframe>
            </div>
            <div className="col col--8">
              <div className="hero__screenshot">
                <img src={useBaseUrl("img/SigNoz-hero-shot.jpg")} alt="SigNoz screenshot" />
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

        {/* Tab Switcher component */}

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
      </main>
    </Layout>
  );
}

export default Home;
