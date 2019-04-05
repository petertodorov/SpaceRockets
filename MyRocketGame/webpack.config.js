const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  module:  {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: [/.css$|.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images'
            }
          }
        ]
      }

    ]
  },
  entry: './src/index.js',
  //
  node: {
    fs: "empty"
},
  //
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Rocket Louncher',
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CopyWebpackPlugin([{
      from: './src/assets/',
      to: 'assets/'
    }]),
  ],
  

};