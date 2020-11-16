const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключили плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 


module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif|woff2|woff)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // аналогично добавьте правило для работы с html
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        loader: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } },
         'postcss-loader'],
       }
      
    ]
  },
  plugins: [
    // настроили плагин
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
};