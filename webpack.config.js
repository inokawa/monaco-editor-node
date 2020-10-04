const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src",
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    library: "[name]",
    libraryTarget: "umd",
  },
  target: "node",
  plugins: [new webpack.IgnorePlugin(/canvas/, /jsdom/)],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
};
