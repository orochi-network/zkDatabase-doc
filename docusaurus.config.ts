import "dotenv/config";
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind-config.cjs";

export type TBuildMode = "production" | "development";

export type TCustomField = {
  ZKDATABASE_GRAPHQL_ENDPOINT: string;
  ZKDATABASE_GUI: string;
};

export type TDocConfig = Config & { customFields: TCustomField };

const buildMode = process.env.BUILD_MODE;

const customFields: Record<TBuildMode, TCustomField> = {
  production: {
    ZKDATABASE_GRAPHQL_ENDPOINT: "https://api.zkdatabase.org/graphql",
    ZKDATABASE_GUI: "https://app.zkdatabase.org/",
  },
  development: {
    ZKDATABASE_GRAPHQL_ENDPOINT:
      "https://test-serverless.zkdatabase.org/graphql",
    ZKDATABASE_GUI: "https://test-ui.zkdatabase.org/",
  },
};

const url: Record<TBuildMode, string> = {
  development: "https://test-doc.zkdatabase.org",
  production: "https://doc.zkdatabase.org",
};

const config: TDocConfig = {
  title: "zkDatabase",
  tagline: "Orochi Network",
  favicon: "img/zklogo.svg",
  customFields: customFields[buildMode],
  url: url[buildMode],
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Orochi Network", // Usually your GitHub org/user name.
  projectName: "zkDatabase", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [tailwindPlugin],

  // meta in headTags will override those in themeConfig
  headTags: [],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/thumbnail.png",
    // if twitter: doesn't specified it will fall back to using og:
    metadata: [],
    navbar: {
      title: "zkDatabase",
      logo: {
        alt: "zkDatabase Logo",
        src: "img/zklogo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          label: "Document",
        },
        {
          to: "https://docs.orochi.network/zkdatabase/chapter",
          label: "Cookbook",
        },
        {
          to: "https://orochi.network/blog",
          label: "Blog",
        },
        {
          to: "https://magical-caravel-b75.notion.site/Orochi-Network-Onboarding-Document-38c050910d2e4da4b92709bc867e790c",
          label: "Collaborate",
        },
        {
          position: "right",
          label: "Get started",
          to: "/",
          className:
            "button button--primary button--lg text-white text-size-sm font-bold pr-[20px]",
          style: { color: "white" },
        },
      ],
    },
    footer: {
      links: [
        {
          title: "DEVELOPERS",
          items: [
            {
              label: "Homepage",
              to: "/intro",
            },
            {
              label: "Github",
              href: "https://github.com/orochi-network/zkDatabase",
            },
            {
              label: "Cookbook",
              to: "https://docs.orochi.network/zkdatabase/chapter",
            },
            {
              label: "Get started",
              to: "https://test-app.zkdatabase.org",
            },
          ],
        },
        {
          title: "ECOSYSTEM",
          items: [
            {
              label: "Explore",
              href: "https://orochi.network/about",
            },
            {
              label: "Collaborate",
              href: "https://magical-caravel-b75.notion.site/Orochi-Network-Onboarding-Document-38c050910d2e4da4b92709bc867e790c",
            },
          ],
        },
        {
          title: "RESOURCE",
          items: [
            {
              label: "Blog",
              href: "https://orochi.network/blog",
            },
            {
              label: "npm package",
              href: "https://www.npmjs.com/package/zkdb",
            },
            {
              label: "MIPs",
              href: "https://forums.minaprotocol.com/t/draft-mina-data-availability-layer/6150",
            },
            {
              label: "RamenPasta",
              href: "https://eprint.iacr.org/2024/336",
            },
          ],
        },
      ],
      logo: {
        alt: "zkDatabase Logo",
        src: "img/zkLogoWithText.svg",
        srcDark: "img/zkLogoWithTextDark.svg",
        width: 200,
      },
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
