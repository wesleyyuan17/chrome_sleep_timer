const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: "production",
  entry: {
    background: path.resolve(__dirname, "..", "src", "background.tsx"),
    popup: path.resolve(__dirname, "..", "src", "popup.tsx"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".js"],
  },
  module: {
    rules: [
      {
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        loader: "css-loader",
        exclude: /node_modules/,
      },
      {
        test: /\@mantine\/core\/styles\.css?$/,
        loader: "css-loader",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
        patterns: [{from: ".", to: ".", context: "public"}]
    }),
  ],
};