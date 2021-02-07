import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import {Conditional} from "../components/conditional";
import Link from "@docusaurus/core/lib/client/exports/Link";
import {IS_PRODUCTION} from "../utils/env";

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
                <div className="card__footer">
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
const STARTER_FEATURES = ["Upto 100 mn events", "3 day retention", "Community Support"];
const PROFESSIONAL_FEATURES = ["3 day retention - USD 0.1/mn spans", "7 day retention - USD 0.25/mn spans", "14 day retention - USD 0.45/mn spans", "30 day retention - USD 0.8/mn spans"];
const OPEN_SOURCE = ["For people happy to manage their own infrastructure", "Community support"];

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
                                <PricingCard title={"Hobby"} image={"/img/hobby-pricing.png"} price={"Free"} features={HOBBY_FEATURES} buttonText={"Create free account"}/>
                            </div>
                            <div className={"col col--4 margin-vert--md"}>
                                <PricingCard title={"Starter"} image={"/img/hobby-pricing.png"} price={"USD 19/month"} features={STARTER_FEATURES} buttonText={"Start free trial"}/>
                            </div>
                            <div className={"col col--4 margin-vert--md "}>
                                <PricingCard title={"Professional"} image={"/img/professional-pricing.png"} features={PROFESSIONAL_FEATURES} buttonText={"Start free trial"}/>
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

                <div className={"row"} style={{display: 'flex', justifyContent: 'center'}}>
                    <div className={"col col--4 margin-vert--md "}>
                        <DescriptionCard title={"Professional"} image={"/img/professional-pricing.png"} features={PROFESSIONAL_FEATURES} buttonText={"Start free trial"}/>
                    </div>
                    <div className={"col col--4 margin-vert--md "}>
                        <DescriptionCard title={"Professional"} image={"/img/professional-pricing.png"} features={PROFESSIONAL_FEATURES} buttonText={"Start free trial"}/>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Pricing;
