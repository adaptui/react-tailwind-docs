/* eslint-disable import/no-anonymous-default-export */
export default {
  // Project Repo
  repository: "https://github.com/timelessco/renderlesskit-react-tailwind",
  // Docs Repo
  docsRepositoryBase:
    "https://github.com/timelessco/renderlesskit-tailwind-docs",
  // Docs Path in the above repo
  titleSuffix: " – Timeless",
  search: true,
  UNSTABLE_stork: false,
  floatTOC: true,
  logo: (
    <span className="hidden mr-2 font-extrabold md:inline">
      RenderlessKit React Tailwind
    </span>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="og:title" content="Renderlesskit React Tailwind" />
      <meta name="description" content="Renderlesskit React Tailwind" />
      <meta name="og:description" content="Renderlesskit React Tailwind" />
    </>
  ),
  footer: true,
  footerEditLink: "Edit this page on GitHub",
  footerText: <>MIT {new Date().getFullYear()} © Timeless.</>,
  darkMode: true,
  nextLinks: true,
  prevLinks: true,
};
