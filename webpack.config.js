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
