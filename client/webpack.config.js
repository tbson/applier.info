const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
const path = require('path')
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  test: path.join(__dirname, 'tests')
}
// test new commit
process.env.BABEL_ENV = TARGET

const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ],
    alias: {
      app: 'app',
      libs: 'app/libs/',
      components: 'app/components/',
      utils: 'app/utils/',
      images: 'app/images/',
      helpers: 'app/utils/helpers'
    },
    extensions: ['.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl$/,
        // use: ['style-loader', 'css-loader', 'stylus-loader']
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }, {
        test: /\.jpg$/,
        loader: 'file-loader'
      }, {
        test: /\.gif$/,
        loader: 'file-loader'
      }, {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.otf($|\?)/,
        loader: 'file-loader'
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATHS.app,
        exclude: /node_modules/
      }
    ]
  }
}

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    watchOptions: {
      ignored: /node_modules/
    },
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',
    devServer: {
      disableHostCheck: true,
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      stats: 'errors-only',
      host: '0.0.0.0',
      port: 4004
    },
    plugins: [
      new webpack.NamedModulesPlugin()
    ]
  })
}

if (['build'].indexOf(TARGET) !== -1) {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    /*
    performance: {
        hints: 'warning', // 'error' or false are valid too
        maxEntrypointSize: 100000, // in bytes
        maxAssetSize: 200000 // in bytes
    },
    */
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      // new PrepackWebpackPlugin(configuration),
      // new BundleAnalyzerPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: true,
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true
        },
        output: {
          comments: false
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      }),
      // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
      new webpack.NoEmitOnErrorsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0
      })
      /*
      new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
      })
      */
    ],
    stats: { colors: true }
  })
}
