const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization:{
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    new CopyPlugin({
        patterns: [{from: ".", to: ".", context: "public"}]
    }),
    new MiniCssExtractPlugin({filename: `App.css`,}),
  ],
};