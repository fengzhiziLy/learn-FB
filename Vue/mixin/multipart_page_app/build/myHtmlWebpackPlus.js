const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = [new HtmlWebpackPlugin({
    filename: 'user.index.html',
    template: path.join(__dirname, '../src/projects/user/index.html'),
    inject: true,
    chunks: ['manifest', 'vendor', 'user'],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }),
  new HtmlWebpackPlugin({
    filename: 'goods.index.html',
    template: path.join(__dirname, '../src/projects/goods/index.html'),
    inject: true,
    chunks: ['manifest', 'vendor', 'goods'],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  })
]
