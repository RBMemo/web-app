const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function override(config, env) {
  config.plugins = [
    ...config.plugins,
		new NodePolyfillPlugin({
      excludeAliases: ["console"]
    })
	];

  config.module.rules = [
    config.module.rules[1],
    shouldUseSourceMap && {
      enforce: 'pre',
      exclude: [/@babel(?:\/|\\{1,2})runtime/, /node_modules/],
      test: /\.(js|mjs|jsx|ts|tsx|css)$/,
      loader: require.resolve('source-map-loader'),
    }
  ];

  return config;
}