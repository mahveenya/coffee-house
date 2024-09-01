const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const stylesHandler = MiniCssExtractPlugin.loader

module.exports = ({ mode } = { mode: 'prod' }) => {
  console.log(`Running in ${mode} mode`)

  const isProd = mode == 'prod'
  const envConfig = isProd
    ? require('./webpack.prod.config')
    : require('./webpack.dev.config')
  return merge(
    {
      mode,
      entry: path.resolve(__dirname, './src/app.js'),
      output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
      },
      module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [
              mode === 'prod' ? stylesHandler : 'style-loader',
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
            type: 'asset',
          },
        ],
      },
    },
    envConfig,
  )
}
