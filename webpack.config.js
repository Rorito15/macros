const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    server: ["@babel/polyfill", "./server/server.js"],
    app: ["./client/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name]-bundle.js"
  },
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
};
