import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";

// import pkg from './src/astro-code.js';
// import rehypeCodeTitles from "rehype-code-titles";
// import rehypeCodeTitle from "rehype-code-title";
// import rehypePrism from '@mapbox/rehype-prism';
// const {hej} = pkg;
// import * as hej from './integrations/lol.ts';
import { CodeSnippetTagname, LOL } from "./integrations/astro-code-snippets";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      // apply remark-toc alongside GitHub-flavored markdown and Smartypants
      // remarkPlugins: {
      //   extends: [
      //     LOL({
      //       classes: "px-5 py-2 bg-black w-min text-white rounded-t-md text-md",
      //     }),
      //   ],
      // },
    }),
    react(),
    tailwind(),
    // astroCodeSnippets(),
  ],
  vite: {
    ssr: {
      noExternal: ["@fontsource/open-sans"],
    },
  },
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: "prism",
  },
});
