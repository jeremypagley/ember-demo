const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './app/index.js'],
  },
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/dist/'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/dist/'
  },
  module: {
    loaders: [
      { 
          test: /\.js$/, loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
              presets: ['es2015', 'react']
          }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}