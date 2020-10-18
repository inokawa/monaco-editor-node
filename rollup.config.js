import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: pkg.name,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    css({
      output: () => {
        // Do not output
      },
    }),
    terser(),
  ],
  inlineDynamicImports: true,
};
