module.exports = {
  title: 'SigNoz',
  tagline: 'Open source Observability platform',
  url: 'https://signoz.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SigNoz', // Usually your GitHub org/user name.
  projectName: 'signoz', // Usually your repo name.
  themeConfig: {
    // googleAnalytics: {
    //   trackingID: 'UA-152867655-1',
    //   // Optional fields.
    //   // anonymizeIP: true, // Should IPs be anonymized?
    // },
    posthog: {
      apiKey: "H-htDCae7CR3RV57gUzmol6IAKtm5IMCvbcm_fwnL-w",
      appUrl: "https://app.posthog.com",  // optional
      enableInDevelopment: true  // optional
    },
    image: 'img/HeroShot-3.jpg',
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',
    },
    navbar: {
      title: 'SigNoz',
      logo: {
        alt: 'My Site Logo',
        src: 'img/SigNozLogo-orange.svg',
      },
      items: [
        {
          to: 'pricing/',
          activeBasePath: 'pricing',
          label: 'Pricing',
          position: 'right',
        },
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        //docusaurus expects href elements to be full links
        //https://stackoverflow.com/questions/63268853/how-do-i-link-to-non-docusaurus-defined-routes-from-a-docusuarus-footer
        {href: 'https://signoz.io/blog/', label: 'Blog', position: 'left'},
        {
          to: 'about-us/',
          label: 'About',
          position: 'right',
        },
        {
          href: 'https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA',
          label: 'Slack',
          position: 'right',
        },
        {
          href: 'https://github.com/SigNoz/signoz',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/',
            },
            {
              label: 'Contributing',
              to: 'docs/contributing',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/signoz',
            // },
            {
              label: 'Slack',
              href: 'https://join.slack.com/t/signoz-community/shared_invite/zt-lrjknbbp-J_mI13rlw8pGF4EWBnorJA',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/SigNozHQ',
            },
            {
              label: 'hello@signoz.io',
              href: 'mailto:hello@signoz.io',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://signoz.io/blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/SigNoz/signoz',
            },
            {
              label: 'Support',
              to: 'support/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SigNoz, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: ["posthog-docusaurus"],
  
  // plugins: ['@docusaurus/plugin-google-analytics'],
  // plugins: [
  //   [
  //     '@docusaurus/plugin-sitemap',
  //     {
  //       cacheTime: 600 * 1000, // 600 sec - cache purge period
  //       changefreq: 'weekly',
  //       priority: 0.5,
  //       trailingSlash: false,
  //     },
  //   ],
  // ],
  
};
