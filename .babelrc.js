const env = process.env.NODE_ENV || "development";

const envConfig = {
  modules: false,
  useBuiltIns: "entry",
};

const config = {
  presets: [
    ["@babel/preset-env", envConfig],
    "@babel/preset-stage-3",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    // [TODO]
    // "react-hot-loader/babel",
    // [
    //   "react-css-modules",
    //   {
    //     filetypes: {
    //       ".scss": {
    //         syntax: "postcss-scss"
    //       }
    //     },
    //     webpackHotModuleReloading: env === "development",
    //     generateScopedName: "[name]--[local]",
    //     handleMissingStyleName: "warn"
    //   }
    // ],
    "babel-plugin-styled-components",
    "babel-plugin-transform-decorators-legacy",
  ].filter(Boolean),
};

module.exports = config;
