import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

//getting the NODE_ENV from package.json
const isDevelopment = process.env.NODE_ENV !== "production";

const plugins: webpack.WebpackPluginInstance[] = [
  new HTMLWebpackPlugin({
    template: "./public/index.html", // you have to have the template file
  }),
];
isDevelopment
  ? plugins.push(new ReactRefreshWebpackPlugin())
  : plugins.push(new MiniCssExtractPlugin());

const config = {
  mode: isDevelopment ? "development" : "production",
  devServer: {
    hot: true,
    port: 3000,
  },
  entry: "./src/index.tsx", // codes will be inside src folder
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  plugins,
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    // automatically resolve certain extensions
    extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
    alias: {
      // absolute path importing files
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i, // .sass or .scss
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // for Tailwind CSS
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};

export default config;
