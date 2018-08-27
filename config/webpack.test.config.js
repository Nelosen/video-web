const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const forIn = require('lodash/forIn');

const {entry, template} = require('./entry');
const root = path.join(__dirname, '../', '/');
const serverPath = path.join(root, 'src/server');
const outputPath = path.join(root, 'build');
const config = require('./webpack.base.config');

config.output = {
    path: outputPath,
    filename: '[name].[hash].js',
};

config.devtool = 'source-map';

config.plugins.unshift(
    new CleanWebpackPlugin(['public'], {
        root: serverPath,//一个根的绝对路径.
        verbose: false,//将log写到 console.
        dry: false,//不要删除任何东西，主要用于测试.
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('test'),
            'REDIRECT_URL': JSON.stringify('http://adminsytest.huala.com/')
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

// config.plugins.push(new BundleAnalyzerPlugin());

// console.log(config);

module.exports = config;

