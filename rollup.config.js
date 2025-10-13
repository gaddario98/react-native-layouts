import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

import strip from "@rollup/plugin-strip";
import json from "@rollup/plugin-json";
export default {
  input: "index.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    strip({
      include: ["**/*.mjs", "**/*.ts", "**/*.tsx", "**/*.js"], // Include all files
      labels: ["use client"], // Rimuove la direttiva
    }),
    json(),
  ],
};
