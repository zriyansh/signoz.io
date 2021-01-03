module.exports = {
  title: 'SigNoz',
  tagline: 'Software infra is getting more complex. Don’t just be reactive to issues but detect issues proactively. Great customer experience implies better customer satisfaction & retention',
  url: 'https://signoz.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SigNoz', // Usually your GitHub org/user name.
  projectName: 'signoz', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'SigNoz',
      logo: {
        alt: 'My Site Logo',
        src: 'img/SigNozLogo-200x200.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {href: 'blog/', label: 'Blog', position: 'left'},
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
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/signoz',
            },
            {
              label: 'Slack',
              href: 'https://signoz-community.slack.com/join/shared_invite/zt-kj26gm1u-Xe3CYxCu0bGXCrCqKipjOA#/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/SigNozHQ',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/SigNoz/signoz',
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
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
