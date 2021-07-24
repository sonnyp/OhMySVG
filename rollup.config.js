import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import nodeBuiltins from "rollup-plugin-node-builtins";

export default {
  input: "svgo.js",
  output: {
    file: "src/svgo.js",
  },
  plugins: [nodeBuiltins(), nodeResolve(), commonjs(), json()],
};
