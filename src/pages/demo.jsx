import React from "react";
import Layout from "@theme/Layout";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

function demo() {
  return (
    <Layout title="Book a Call">

      <section>
        <div
          className="container"
          style={{ marginTop: "8rem", marginBottom: "4rem" }}
        >


<div class="hero shadow--lw">
  <div class="container">
    <h1 class="hero__title">SigNoz Demo</h1>
    <p class="hero__subtitle"> An expert will reach out shortly to understand your requirements and get you started with your SigNoz cloud instance.
    </p>


    <LiteYoutubeEmbed id="jD36hjfL1x0" mute={false} />


  </div>
</div>
        

         

        </div>
      </section>
    </Layout>
  );
}

export default demo;