const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/nightOwl')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'NextShield',
  tagline: 'The shield that every Next.js app needs.',
  url: 'https://imjulianeral.github.io',
  baseUrl: '/next-shield/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'imjulianeral', // Usually your GitHub org/user name.
  projectName: 'next-shield', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'NextShield',
      logo: {
        alt: 'NextShield Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/imjulianeral/next-shield',
          label: 'GitHub',
          position: 'right',
        },
        // {
        //   type: 'docsVersionDropdown',
        // },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/imjulianeral',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/imjulianeral',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/next-shield',
            },
            {
              label: 'Illustrations',
              href: 'https://storyset.com/technology',
            },
          ],
        },
      ],
      copyright: `${new Date().getFullYear()} NextShield. Built with 💙 by @imjulianeral.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
