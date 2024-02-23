const path = require('path');

module.exports = {
  // Konfigurasi yang sudah ada
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Penanganan fallback untuk 'path', 'os', dan 'crypto'
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
};
