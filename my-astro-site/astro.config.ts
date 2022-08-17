import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// import pkg from './src/astro-code.js';

// const {hej} = pkg;

// import * as hej from './integrations/lol.ts';
import codeTitle from "./integrations/astro-code-snippets";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      // apply remark-toc alongside GitHub-flavored markdown and Smartypants
      remarkPlugins: {
        extends: [
          codeTitle({
            classes: "px-5 py-2 bg-black w-min text-white rounded-t-md text-md",
          }),
        ],
      },
    }),
    react(),
    tailwind(),
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
