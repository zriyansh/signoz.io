import React from "react";
import Card from "./Card";

const FAQBody = () => (
  <>
    <Card
      body="Features like SSO, Granular RBAC, "
      title="What type of features will be there in paid plans?"
    />
    <Card
      body="Few ways in which SigNoz is more advanced than Jaeger : Jaeger UI doesn’t show any metrics on traces or on filtered traces, and Jaeger can’t get aggregates on filtered traces. For example, Cassandra doesn’t support Group By, Max, etc."
      title="Who should use Enterprise plans?"
    />
    <Card
      body="SigNoz will be always open-source and free to be self-hosted for smaller teams. We will have role based Pricing for our enterprise edition which will have advanced features needed by bigger teams.
Though for users who want hosted version of SigNoz, we do have cloud plans."
      title="What will be your paid plan like?"
    />
  </>
);

export default FAQBody;
