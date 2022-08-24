import {defineConfig} from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://magnuswahlstrand.github.io/demo",
    base: "https://magnuswahlstrand.github.io/demo",
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
