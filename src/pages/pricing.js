import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import {Conditional} from "../components/conditional";
import Link from "@docusaurus/core/lib/client/exports/Link";
import {IS_PRODUCTION} from "../utils/env";
import {CaretRightOutlined} from '@ant-design/icons';
import {Collapse} from 'antd';

const { Panel } = Collapse;

const TABS = {
    CLOUD: "Cloud",
    OPEN_SOURCE: "Open source"
};

function TabsHeader({selectedTab, onSelectTab}){

     const items = (<>
                <li className={`tabs__item ${selectedTab === TABS.CLOUD ? "tabs__item--active" : ""}`} onClick={onSelectTab.bind(this,TABS.CLOUD)}>Cloud</li>
                    <li className={`tabs__item ${selectedTab === TABS.OPEN_SOURCE ? "tabs__item--active" : ""}`} onClick={onSelectTab.bind(this,TABS.OPEN_SOURCE)}>Open Source</li>
                </>)

    return (
        <ul className="tabs">
            {items}
        </ul>
    );
}

function PricingCard(props) {
    const {title, image, price, buttonText, features, info, isFreeTrial} = props;
    const featuresListItems = features.map(feature => {
        return (<li key={feature}>{feature}</li>);
    })

    const onButtonClick = ()=>{
        window.location = `https://${IS_PRODUCTION?"app.signoz.io":"stagingapp.signoz.io"}?plan_type=${title.toLowerCase()}`
    }

    return (
        <div className="card-demo" style={{background: "#fff", color: "#333333", borderRadius: "0.4rem", height: "100%"}}>
            <div className="card" style={{background: "#fff", color: "#333333", height: "100%"}}>
                <div className="card__header">
                    <h3 style={{textAlign: "center"}}>{title}</h3>
                </div>
                <div className="card__image" style={{display: "flex", justifyContent: "center"}}>
                    <img
                        src={image}
                        style={{height: "5.25rem"}}
                        alt="Image alt text"
                        title="Logo Title Text 1"
                    />
                </div>
                <div className="card__body margin-vert--lg">
                    <Conditional If={price}>
                        <h4 style={{textAlign: "center"}}>{price}</h4>
                    </Conditional>
                    <Conditional If={info}>
                        <h6 style={{textAlign: "center"}}>{info}</h6>
                    </Conditional>
                    <ul>
                        {featuresListItems}
                    </ul>
                </div>
                <div className="card__footer">
                    {isFreeTrial && (
                        <div style={{fontSize:"0.8rem",textAlign: "center"}}>
                            30 day free trial. No credit card required
                        </div>
                    )}
                    <button style={{background: "#2D9CDB", borderWidth: 0}} className="button button--primary button--block" onClick={onButtonClick}>{buttonText}</button>
                </div>
            </div>
        </div>
    )
}

function DescriptionCard(props) {
    const {title, image, price, buttonText, features} = props;
    const featuresListItems = features.map(feature => {
        return (<li key={feature}>{feature}</li>);
    })

    const onButtonClick = ()=>{
        window.location = `https://${IS_PRODUCTION?"app.signoz.io":"stagingapp.signoz.io"}?plan_type=${title.toLowerCase()}`
    }

    return (
        <div className="card-demo" style={{background: "#fff", color: "#333333", borderRadius: "0.4rem", height: "100%"}}>
            <div className="card" style={{background: "#fff", color: "#333333", height: "100%"}}>
                <div className="card__header">
                    <h3 style={{textAlign: "center"}}>{title}</h3>
                </div>
                <div className="card__image" style={{display: "flex", justifyContent: "center"}}>
                    <img
                        src={image}
                        style={{height: "5.25rem"}}
                        alt="Image alt text"
                        title="Logo Title Text 1"
                    />
                </div>
                <div className="card__body margin-vert--lg">
                    <Conditional If={price}>
                        <h4 style={{textAlign: "center"}}>{price}</h4>
                    </Conditional>
                    <ul>
                        {featuresListItems}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function OpenSourceCard(props) {
    const {title, image, price, buttonText, features} = props;
    const featuresListItems = features.map(feature => {
        return (<li key={feature}>{feature}</li>);
    })

    return (
        <div className="card-demo" style={{background: "#fff", color: "#333333", borderRadius: "0.4rem", height: "100%"}}>
            <div className="card" style={{background: "#fff", color: "#333333", height: "100%"}}>
                <div className="card__header">
                    <h3 style={{textAlign: "center"}}>{title}</h3>
                </div>
                <div className="card__image" style={{display: "flex", justifyContent: "center"}}>
                    <img
                        src={image}
                        style={{height: "5.25rem"}}
                        alt="Image alt text"
                        title="Logo Title Text 1"
                    />
                </div>
                <div className="card__body margin-vert--lg">
                    <Conditional If={price}>
                        <h4 style={{textAlign: "center"}}>{price}</h4>
                    </Conditional>
                    <ul>
                        {featuresListItems}
                    </ul>
                </div>
                <div className="card__footer">
                    <Link href={"/docs/deployment/docker"}>
                        <button style={{background: "#2D9CDB", borderWidth: 0}} className="button button--primary button--block" >{buttonText}</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}


const HOBBY_FEATURES = ["Upto 100 mn events", "3 day retention", "Community Support"];
const STARTER_FEATURES = ["Upto 300 mn events", "3 day retention", "Email Support",];
const PROFESSIONAL_FEATURES = ["3 day retention : $0.1/mn events", "7 day  : $0.25/mn events", "14 day : $0.45/mn events", "30 day : $0.8/mn events", "Email Support"];
const OPEN_SOURCE = ["For companies with large volumes & enterprise workloads", "Community support"];

function Pricing() {
    const [selectedTab, setSelectedTab] = useState(TABS.CLOUD);

    return (
        <Layout title="Pricing">
            <section>
                <div className="container" style={{marginTop: '2rem', marginBottom:'4rem'}}>
                    <div className={"row"}>
                        <div className={"pricingTabsContainer col col--12"} style={{display: "flex", justifyContent:"center"}}>
                            <TabsHeader onSelectTab={setSelectedTab} selectedTab={selectedTab}/>
                        </div>
                    </div>
                    <div className={"margin-vert--lg"}>
                    <Conditional If={selectedTab === TABS.CLOUD}>
                        <div className={"row"}>
                            <div className={"col col--4 margin-vert--md"}>
                                <PricingCard title={"Hobby"} image={"/img/hobby-new.png"} price={"Free"} features={HOBBY_FEATURES} buttonText={"Create free account"}/>
                            </div>
                            <div className={"col col--4 margin-vert--md"}>
                                <PricingCard isFreeTrial={true} title={"Starter"} image={"/img/hobby-pricing.png"} price={"USD 19/month"} features={STARTER_FEATURES} buttonText={"Start free trial"}/>
                            </div>
                            <div className={"col col--4 margin-vert--md "}>
                                <PricingCard isFreeTrial={true} title={"Professional"} image={"/img/professional-pricing.png"} price={"Billed monthly"} info={"For >300mn spans or >3 day retention"} features={PROFESSIONAL_FEATURES} buttonText={"Start free trial"}/>
                            </div>
                        </div>
                    </Conditional>

                        <Conditional If={selectedTab === TABS.OPEN_SOURCE}>
                            <div className={"row"} style={{display: "flex", justifyContent: "center"}}>
                                <div className={"col col--4 margin-vert--md"}>
                                    <OpenSourceCard title={"Free"} image={"/img/hobby-pricing.png"} price={"Free"} features={OPEN_SOURCE} buttonText={"Get started for free"}/>
                                </div>
                            </div>
                        </Conditional>
                    </div>
                </div>
            </section>


            <section>
                    <div className="container" style={{marginTop: '4rem', marginBottom:'4rem'}}>
                        {/* <p className="hero__title ">Single pane for complete metrics and traces, no need to shift to different systems</p> */}
                        <h1 class="text--center" style={{padding:'1rem'}}>Frequently Asked Questions</h1>

                        <div class="card-demo margin--md">
                            <Collapse
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            className="site-collapse-custom-collapse"
                            >
                                <Panel header=" When should one chose cloud version and when open source version?" key="1" className="card" style={{marginTop:'1rem', marginBottom:'1rem', padding:'1rem'}}>
                                    <div class="card__body">
                                    <p> Cloud version is suited if you want to get up and running quickly and have smaller volume. For bigger enterprises and higher workloads, we 
                                        recommend to self-host open-source version. Self-hosted version will be installed in your infrastructure.
                                    </p>
                                    </div>
                                </Panel>

                                <Panel header=" What is an event?" key="2" className="card" style={{marginTop:'1rem', marginBottom:'1rem', padding:'1rem'}}>
                                    <div class="card__body">
                                    <p> An event represents an individual unit of work done in a distributed system. If you are aware of distributed tracing, what we call 'events' are called 'spans' in distributed tracing. 
                                    Each component of the distributed system contributes a span - a named, timed operation representing a piece of the workflow. 
                                    </p>
                                    </div>
                                </Panel>

                                <Panel header=" How many events will I use in a month?" key="3" className="card" style={{marginTop:'1rem', marginBottom:'1rem', padding:'1rem'}}>
                                    <div class="card__body">
                                    <p> The exact number of events depends on your traffic and architecture. Typically a single request generates around 10 to 30 spans, based on your archiecture.
                                        So, if you serve 5 request per sec on an average - that is approx. 5x24x60x60x30x20 spans = ~259 mn spans in a month. This can be reduced by factors if you sample the traces you send.
                                    </p>
                                    </div>
                                </Panel>


                                <Panel header=" I have a few questions. How do I reach out to you?" key="4" className="card" style={{marginTop:'1rem', marginBottom:'1rem', padding:'1rem'}}>
                                    <div class="card__body">
                                    <p> Please write to us at <a href="mailto:support@signoz.io">support@signoz.io</a> or join our <a href="https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA">Slack Community</a></p>
                                    </div>
                                </Panel>

                            </Collapse>
                        </div>
                    </div>
                </section>

              

                
        </Layout>
    );
}

export default Pricing;
