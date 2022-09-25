import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import nodePolyfills from 'rollup-plugin-node-polyfills';
import replace from '@rollup/plugin-replace';

import React from 'react';
import ReactIs from 'react-is';
import ReactDOM from 'react-dom';



const packageJson = require("./package.json");


export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
          "process.env.NODE_ENV": JSON.stringify("development")
      }),
      nodePolyfills(),
      resolve({
        browser : true
      }),
      commonjs({
        include: [
          "node_modules",
          "node_modules/**",
          "node_modules/**/*",
        ],
        namedExports: {
            'react-is': Object.keys(ReactIs),
            'react': Object.keys(React),
            'react-dom': Object.keys(ReactDOM),
            'styled-components': [ 'styled', 'css', 'ThemeProvider' ]
        }
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];