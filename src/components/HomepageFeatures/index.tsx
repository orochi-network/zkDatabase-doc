import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
  url: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Homepage",
    Svg: require("@site/static/img/Homepage.svg").default,
    url: "http://zkdatabase.org",
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: "Cookbook",
    Svg: require("@site/static/img/Cookbook.svg").default,
    url: "https://docs.orochi.network/zkdatabase/chapter",
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: "Blog",
    Svg: require("@site/static/img/Blog.svg").default,
    url: "https://orochi.network/blog",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
  {
    title: "Collab",
    Svg: require("@site/static/img/Collab.svg").default,
    url: "https://magical-caravel-b75.notion.site/Orochi-Network-Onboarding-Document-38c050910d2e4da4b92709bc867e790c",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ title, Svg, description, url }: FeatureItem) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  return (
    <a
      href={url}
      target="_blank"
      className={`flex flex-row gap-8 items-center border-solid border-[1px] rounded-2xl px-5 min-w-fit w-[70%] shadow-md hover:shadow-[0px_0px_10px_8px_${
        isDarkMode ? "#ffffff24" : "#00000024"
      }] hover:no-underline ${
        isDarkMode
          ? "bg-[#3e3e42] border-[#3e3e42]"
          : "bg-transparent border-neutral-300"
      }`}
    >
      <Svg role="img" />
      <div className="flex flex-col gap-4 py-4 items-start no-underline">
        <div
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-neutral-50" : "text-black"
          }`}
        >
          {title} →
        </div>
        <div className={`${isDarkMode ? "text-neutral-50" : "text-black"}`}>
          Run zkDatabase on a multi-cloud developer data platform that
          accelerates and simplifies working with operational data.
        </div>
      </div>
    </a>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  return (
    <main
      className={`${
        isDarkMode ? "bg-[#1c1c1d]" : "bg-white"
      } lg:px-20 sm:px-10 pt-10`}
    >
      <section className={styles.features}>
        {/* <div className="container"> */}
        <div className="flex flex-col gap-7 justify-center items-center w-full">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        {/* </div> */}
      </section>
    </main>
  );
}
