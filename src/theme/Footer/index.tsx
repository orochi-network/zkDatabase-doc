import React, { JSX } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import { Telegram } from "@site/static/svg-icons/Telegram";
import FooterLogo from "@theme/Footer/Logo";
import clsx from "clsx";
import { Discord } from "@site/static/svg-icons/Discord";
import { Twitter } from "@site/static/svg-icons/Twitter";
import { Github } from "@site/static/svg-icons/Github";

function FooterNavigate() {
  const navigate = [
    {
      title: "Developers",
      links: [
        {
          href: "/intro",
          label: "Homepage",
        },
        {
          href: "https://github.com/orochi-network/zkDatabase",
          label: "Github",
        },
        {
          href: "https://docs.orochi.network/zkdatabase/chapter",
          label: "Cookbook",
        },
        {
          href: "https://test-app.zkdatabase.org/getting-started/installation",
          label: "Get started",
        },
      ],
    },
    {
      title: "Ecosystem",
      links: [
        {
          href: "https://www.orochi.network/ecosystem",
          label: "Explore",
        },
        {
          href: "https://magical-caravel-b75.notion.site/Orochi-Network-Onboarding-Document-38c050910d2e4da4b92709bc867e790c",
          label: "Collaborate",
        },
      ],
    },
    {
      title: "Resource",
      links: [
        {
          href: "https://www.orochi.network/blog",
          label: "Blog",
        },
        {
          href: "https://www.npmjs.com/package/zkdb",
          label: "npm package",
        },
        {
          href: "https://forums.minaprotocol.com/t/draft-mina-data-availability-layer/6150",
          label: "MIPs",
        },
        {
          href: "https://eprint.iacr.org/2024/336",
          label: "RamenPasta",
        },
      ],
    },
  ];

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-y-8 gap-x-8 lg:justify-start sm:justify-center lg:items-start sm:items-center">
      {navigate.map((nav, index) => (
        <ul
          key={"navigate-" + index}
          className="space-y-2 lg:space-y-4 hover:no-underline"
        >
          <div
            className={`font-bold text-[13px] small-caps text-wrap uppercase ${
              isDarkMode ? "text-neutral-500" : "text-neutral-500"
            }`}
          >
            {nav.title}
          </div>
          {nav.links.map((link, indexLink) => (
            <div key={"links-" + indexLink}>
              <Link
                aria-label={link.label}
                href={link.href}
                target={link.label === "Homepage" ? "" : "_blank"}
                className={`hover:no-underline block text-start break-words font-semibold  text-[.875rem] ${
                  isDarkMode ? "text-neutral-50" : "text-black"
                }`}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function SocialLink({ isDarkMode }) {
  const socials = [
    {
      href: "https://x.com/intent/follow?screen_name=zkDatabase",
      icon: <Twitter color={isDarkMode ? "#ffffff" : ""} />,
    },
    {
      href: "https://discord.com/invite/sTU4TUh8H3",
      icon: <Discord color={isDarkMode ? "#ffffff" : ""} />,
    },
    {
      href: "https://github.com/orochi-network/zkDatabase",
      icon: <Github color={isDarkMode ? "#ffffff" : ""} />,
    },
    {
      href: "https://t.me/OrochiNetwork",
      icon: <Telegram color={isDarkMode ? "#ffffff" : ""} />,
    },
  ];

  return (
    <div className="grid auto-cols-max grid-flow-col gap-8 sm:py-10">
      {socials.map((social, index) => (
        <a
          href={social.href}
          key={index}
          className="block h-6 w-6"
          target="_blank"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

function Footer(): JSX.Element | null {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { logo } = footer;
  const year = new Date().getFullYear();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <footer
      className={clsx(
        "w-full grid gap-8 px-6 py-[1rem] h-full",
        "w-full lg:gap-14 lg:py-[3rem]",
        `${isDarkMode ? "bg-[#1c1c1d]" : "bg-transparent"}`
      )}
    >
      <div className={"mx-auto max-w-[1480px]"}>
        {/* <div className='grid lg:grid-cols-[auto,minmax(0,1fr)] lg:gap-[11.375rem] justify-between'> */}
        <div className="flex lg:flex-row lg:justify-between sm:flex-col sm:justify-center w-full lg:gap-[20rem]">
          <div className="flex flex-col lg:justify-between lg:items-start sm:items-center h-full justify-between gap-y-10">
            <div className="flex flex-col gap-5 sm:items-center lg:items-start">
              <Link href="https://orochi.network/" className="block">
                <FooterLogo logo={logo} />
              </Link>
              <div className="text-10 text-neutral-400 max-w-[600px]">
                zkDatabase is the world first verifiable database for the new
                internet.
              </div>
            </div>
            <SocialLink isDarkMode={isDarkMode} />
          </div>
          <FooterNavigate />
        </div>

        <hr
          className={`m-0 h-[1px] w-full border-none ${
            isDarkMode ? "bg-neutral-600" : "bg-neutral-300"
          }`}
        />

        <div className="flex flex-wrap items-center justify-between gap-8 pt-10 sm:justify-center sm:items-center lg:justify-between">
          <div className="flex flex-row gap-2 h-fit items-center">
            <Link
              href="https://www.orochi.network/privacy-policy"
              target="_blank"
              className={`font-semibold hover:no-underline ${
                isDarkMode ? "text-neutral-500" : "text-black"
              }`}
            >
              Privacy Policy
            </Link>
            <div className="w-[1px] h-[20px] bg-neutral-400"></div>
            <Link
              href="https://www.orochi.network/term-of-service"
              target="_blank"
              className={`font-semibold hover:no-underline ${
                isDarkMode ? "text-neutral-500" : "text-black"
              }`}
            >
              Term of Service
            </Link>
          </div>

          <p className="text-sm text-neutral-600 lg:text-base lg:text-neutral-500 pt-5 lining-nums">
            © {year} zkDatabase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
