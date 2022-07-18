/* eslint-disable import/no-anonymous-default-export */
export default {
  // Project Repo
  projectLink: "https://github.com/adaptui",
  // Docs Repo
  docsRepositoryBase: "https://github.com/adaptui/react-tailwind-docs",
  // Docs Path in the above repo
  titleSuffix: " – AdaptUI",
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  feedbackLink: "Question? Give us feedback →",
  feedbackLabels: "feedback",
  logo: (
    <span className="mr-2 hidden font-extrabold md:inline">AdaptUI Docs</span>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="og:title" content="AdaptUI Docs" />
      <meta
        name="description"
        content="Collection of headless components/hooks that are accessible, composable, customizable from low level to build your own UI & Design System powered by Ariakit."
      />
      <meta
        name="og:description"
        content="Collection of headless components/hooks that are accessible, composable, customizable from low level to build your own UI & Design System powered by Ariakit."
      />
    </>
  ),
  footer: true,
  footerEditLink: "Edit this page on GitHub →",
  footerText: <>MIT {new Date().getFullYear()} © Timeless.</>,
};
