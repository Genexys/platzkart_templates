const path = require(`path`);
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, `app`),
  mode: `development`, // Режим сборки
  entry: {
    main: `./js/app.js`,
    vendor: `./js/vendor.js`,
  }, // Точка входа приложения
  output: {// Настройка выходного файла
    filename: `[name].min.js`,
    path: path.join(__dirname, `build/js`),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'app/js', 'vendor_main_page.js')},
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`],
          },
        },
      },
    ],
  },
};
