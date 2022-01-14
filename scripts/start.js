const path = require("path");
const rewire = require("rewire");
const webpack = require("webpack");

process.chdir(path.join(__dirname, ".."));

const start = rewire("react-scripts/scripts/start.js");
const configFactory = start.__get__("configFactory");
const configFactoryMock = (webpackEnv) => {
  const config = configFactory(webpackEnv);

  // display errors for child compilations
  config.stats = {
    ...config.stats,
    children: true,
  };
  config.resolve = {
    ...config.resolve,
    fallback: {
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      assert: require.resolve("assert/"),
      url: require.resolve("url/"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer/"),
    },
  };

  config.plugins = [
    ...config.plugins,
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  return config;
};

start.__set__("configFactory", configFactoryMock);
