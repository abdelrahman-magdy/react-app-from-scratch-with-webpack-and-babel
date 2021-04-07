const path = require('path');

const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports=env => {
  // Use the `env` argument to create some helpful constants.
  const environment = env.environment;
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';
  return {
    mode: environment,
    entry:{
      main:"./src/index.js",
    },
    output:{
      filename:'index.[contentHash].js',
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      // new MiniCssExtractPlugin(),
      new CleanWebpackPlugin()
    ],
    // optimization: {
    //   minimizer: [
    //     new OptimizeCssAssetsPlugin(),
    //     // new TerserPlugin(),
    //     // new HtmlWebpackPlugin({
    //     //   template: "./src/template.html",
    //     //   minify: {
    //     //     removeAttributeQuotes:true,
    //     //     collapseWhitespace: true,
    //     //     removeComments:true
    //     //   }
    //     // }),
    //   ]
    // },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', {
                  
                  // Specify which environments we support/target for our project.
                  "targets": {
                    // "> 1%"
                    "browsers": ["ie >= 11", "last 2 versions"]
                  },
                  debug: false, // Output the targets/plugins used when compiling
                  // Configure how @babel/preset-env handles polyfills from core-js.
                  // https://babeljs.io/docs/en/babel-preset-env
                  useBuiltIns: 'usage',

                  // Specify the core-js version. Must match the version in package.json
                  corejs: 3,

                }],
              ],
            },
          }
        },
        // {
        //   test: /\.html$/,
        //   use:['html-loader']
        // },
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
          test:/\.css$/,
          use:[
            // {
            //   loader : MiniCssExtractPlugin.loader
            // },
            {
              loader :"style-loader"
            }, //3. Inject styles into DOM
            {
              loader : "css-loader",
              options: {
                importLoaders: 1,
                localIdentName: "[name]__[local]--[hash:base64:10]",
                modules: true,
                sourceMap: true,
                camelCase: true,
              } //this to use modules in react
            } //2. Turns css into commonjs
            ,"sass-loader" //1. Turns sass into css
          ]
        }
      ]
    }
  }

}