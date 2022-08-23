import React from "react";
import Card from "./Card";

const FAQBody = () => (
  <>
    <Card
      body="Yes, feel free to reach out to us on <a mailto='hello@signoz.io'>hello@signoz.io</a> if you need a dedicated support plan or paid support for setting your initial SigNoz setup"
      title="Do you offer enterprise support plans?"
    />
    <Card
      body="The framework behind deciding which features will be in open source and which will be in enterprise plan is that if a feature is needed by an individual developer or small team running the product it should be in open source.
      <br/><br/>
      If a capability is uniquely valuable to enterprise requirements and are especially important when used in production and at scale like SSO, LDAP/SAML support,  audit logs, etc. would likely be in an enterprise plan.
      Read more on our thoughts on pricing <a href='https://signoz.notion.site/Our-Thoughts-on-Pricing-73f5e6939c1f42be905fe937b4107dad'>here</a> "
      title="What type of features will be there in paid plans?"
    />
    <Card
      body="Teams which need enterprise support or features like SSO, Audit logs, etc. may find our enterprise plans valuable"
      title="Who should use Enterprise plans?"
    />
  </>
);

export default FAQBody;
