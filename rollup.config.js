import vue from "rollup-plugin-vue";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

/** @type { import("rollup").RollupOptions[] } */
export default [
  {
    input: "src/cli.ts",
    output: {
      format: "cjs",
      file: "dist/cli.js",
      sourcemap: "inline",
    },
    external: ["@vue", "vue", "yoga-layout-prebuilt"],

    plugins: [
      json(),
      vue(),
      typescript(),
      resolve(),
      commonjs(),
      replace({
        preventAssignment: true,
        values: {
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false,
        },
      }),
    ],
  },
  {
    input: "src/runtime-vink.ts",
    output: {
      format: "cjs",
      file: "dist/runtime-vink.js",
      sourcemap: "inline",
    },
    external: ["@vue", "vue", "yoga-layout-prebuilt"],
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      replace({
        preventAssignment: true,
        values: {
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false,
        },
        __DEV__: false,
      }),
    ],
  },
];
