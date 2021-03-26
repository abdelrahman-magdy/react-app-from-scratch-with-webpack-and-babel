const path = require('path');

const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
  mode:"production",
  entry:{
    main:"./src/index.js",
    vendor: "./src/vendor.js"
  },
  output:{
    filename:'[name].[contentHash].js',
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/template.html"
    // }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: {
          removeAttributeQuotes:true,
          collapseWhitespace: true,
          removeComments:true
        }
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use:['html-loader']
      },
      {
        test:/\.(svg|png|jpg|gif)$/i,
        use:{
          loader: "file-loader",
          options:{
            name: "[name].[ext]",
            outputPath: "imgs"
          }
        }
      },
      {
        test:/\.scss$/,
        use:[
          MiniCssExtractPlugin.loader,
          // "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }

}