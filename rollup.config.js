import vue from "rollup-plugin-vue";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

export default [
  {
    input: "src/cli.ts",
    output: {
      format: "cjs",
      file: "dist/cli.js",
    },
    external: ["vue", "yoga-layout-prebuilt"],
    plugins: [json(), vue(), commonjs(), resolve(), typescript()],
  },
  {
    input: "src/runtime-vink.ts",
    output: {
      format: "cjs",
      file: "dist/runtime-vink.js",
    },
    external: ["yoga-layout-prebuilt"],
    plugins: [json(), typescript(), commonjs(), resolve()],
  },
];
