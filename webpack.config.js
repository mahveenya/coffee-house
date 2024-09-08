const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const stylesHandler = MiniCssExtractPlugin.loader;

module.exports = ({ mode } = { mode: 'prod' }) => {
  console.log(`Running in ${mode} mode`);

  const isProd = mode == 'prod';
  const envConfig = isProd
    ? require('./webpack.prod.config')
    : require('./webpack.dev.config');
  return merge(
    {
      mode,
      entry: {
        app: [
          path.resolve(__dirname, './src/app.js'),
          path.resolve(__dirname, './src/scss/style.scss'),
        ],
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext]',
      },
      module: {
        rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
          {
            test: /\.scss$/i,
            use: [
              isProd ? stylesHandler : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]',
                  },
                },
              },
              'sass-loader',
            ],
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset/resource',
          },
        ],
      },
    },
    envConfig,
  );
};
