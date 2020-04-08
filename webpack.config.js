const path = require('path');

module.exports = {
  mode: "production",
  context: path.resolve(__dirname, 'src'),
  entry: { index: './index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules', path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
};
