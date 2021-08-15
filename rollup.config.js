import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import ignore from "rollup-plugin-ignore";

export default {
  input: "svgo.js",
  output: {
    file: "src/svgo.js",
  },
  plugins: [ignore(["fs", "path", "os"]), nodeResolve(), commonjs(), json()],
};
