const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const forIn = require('lodash/forIn');

const {entry, template} = require('./entry');
const root = path.join(__dirname, '../', '/');
const outputPath = path.join(root, 'build');
const config = require('./webpack.base.config');

config.output = {
    path: outputPath,
    filename: '[name].[chunkhash].js'
};

config.plugins.unshift(
    new CleanWebpackPlugin(['build'], {
        root: root,
        verbose: false,
        dry: false,
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
            'REDIRECT_URL': JSON.stringify('http://adminhl.huala.com/newadmin/')
        }
    })
);

config.plugins.push(
    new UglifyJSPlugin({
        sourceMap: false,
        uglifyOptions: {
            compress: true,
            mangle: true,
            ie8: true,
            ecma: 5,
            drop_console: true
        }
    }),
    // new OfflinePlugin({
    //     AppCache: false
    // }),
);

forIn(entry, function (value, key) {
    config.plugins.push(
        new HtmlWebpackPlugin({
            inject: true,
            template: template[key],
            chunks: ['commons', key],
            filename: `${key}.html`
        })
    )
});

module.exports = config;

