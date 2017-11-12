const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const path = require('path');
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    test: path.join(__dirname, 'tests')
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app: PATHS.app
    },
	resolve: {
        modules: [
            path.resolve(__dirname),
            "node_modules"
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
        filename: "[name].js"
    },
    module: {
        loaders: [
        	{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }, {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }, {
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"]
            }, {
            	test: /\.png$/,
                loader: "file-loader"
            }, {
            	test: /\.jpg$/,
                loader: "file-loader"
            }, {
                test: /\.gif$/,
                loader: "file-loader"
            }, {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file-loader'
            }, {
				test: /\.jsx?$/,
				loader: 'babel-loader',
                include: PATHS.app,
                exclude: /node_modules/
			}
        ]
    }
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        watchOptions: {
            ignored: /node_modules/
        },
        // devtool: 'source-map',
        devtool: 'cheap-module-eval-source-map',
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
    });
}