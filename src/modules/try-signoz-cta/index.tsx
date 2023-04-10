import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ReactGA from "react-ga";
import styles from "./styles.module.css";
import clsx from "clsx";

export const TrySigNozCTA = () => {
  const handleClick = (message) => {
    ReactGA.event({
      category: "User",
      action: message,
    });
  };
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <h3 className={styles.tagline}>Give SigNoz a try</h3>
          <a
            className={clsx({
              'button': true,
              'button--secondary': true,
              [styles.ctaBtn]: true,
            })}
            target="_blank"
            href="https://forms.gle/yYSkntXRRPU3MHRL7"
            onClick={() => handleClick("SigNozCloud")}
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};
