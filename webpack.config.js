const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const DeletePlugin = require("./deletePlugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "production",
  entry: {
    main: "./src/main.js",
  },
    devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]_[fullhash:8].js",
    assetModuleFilename: 'assets/[name]_[hash:8][ext][query]',
    clean: true,
  },
  resolve: {
    extensions: [".js", ".vue", ".json"], // import引用文件省略后缀
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  devServer: {
    static: {
      // 配置静态资源存放位置
      directory: path.resolve(__dirname, "public"), // 根目录下文件
    },
    open: true,
  },
  cache: {
    type: "filesystem",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // 注：style-loader、MiniCssExtractPlugin.loader不能同时使用
          "css-loader",
          // {
          //     loader: "postcss-loader",
          //     options: {
          //         sourceMap: true,
          //         postcssOptions: {
          //             path: 'postcss.config.js'
          //         }
          //     }
          // }
        ],
      },
      {
        test: /\.(gif|png|svg|jpe?g)(\?.*)?$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "./index.html"),
      inject: "body",
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[fullhash:8].css",
      chunkFilename: "css/[id].[fullhash:8].css",
    }),
    new DeletePlugin(),
  ],
};
