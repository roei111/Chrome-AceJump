const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    background_script: path.join(__dirname, "src/backgroundScript/index.ts"),
    content_script: path.join(__dirname, "src/contentScript/index.ts"),
    options: path.join(__dirname, "src/options/index.tsx"),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "ts-loader",
        test: /\.tsx?$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          filename: '[name].js',
        },
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: "public",
          from: "**/*",
          to: path.join(__dirname, "dist/"),
        },
      ],
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/build"),
  },
};