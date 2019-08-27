const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
}

module.exports = {
  context: paths.src,
  entry: ['./js/app.js', './styles/main.scss'],
  output: {
    filename: 'app.bundle.js',
    path: paths.dist,
    publicPath: 'dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { 
            presets: ['es2015', 'stage-0'], 
            plugins: ["transform-runtime"],
          }
        }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader', 'sass-loader'
        ]),
      }
    ],
  },
  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: '4800',
    stats: 'errors-only',
  },
  devtool: "#inline-source-map",
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.bundle.css',
      allChunks: true,
    }),
    new HTMLWebpackPlugin({
      template: paths.dist + '/index.html',
      inject: true
     })
  ],
}
