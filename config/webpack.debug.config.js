const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const forIn = require('lodash/forIn');

const { entry, template } = require('./entry');
const config = require('./webpack.base.config');
const { HOST, PORT, publicPath } = require('./debugConfig');
const root = path.join(__dirname, '../');
const outputPath = path.join(root, 'build');

config.output = {
    path: outputPath,
    filename: '[name].js',
    publicPath: publicPath,
};

config.devServer = {
    contentBase: outputPath,
    port: PORT,
    host: HOST,
    publicPath: publicPath,
    disableHostCheck: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
        '/api': {
            target: 'http://api.syx.starcweb.cc',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''  //重写接口
            }
        },
    },
    compress: true,
};

config.devtool = 'cheap-module-eval-source-map';

config.plugins.unshift(
    new CleanWebpackPlugin(['build'], {
        root: root,
        verbose: true,
        dry: true,
    })
);

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            REDIRECT_URL: JSON.stringify(publicPath)
        },
    })
);

forIn(entry, function(value, key) {
    config.plugins.push(
        new HtmlWebpackPlugin({
            inject: true,
            template: template[key],
            chunks: ['commons', key],
            filename: `${key}.html`,
        })
    );
});

module.exports = config;
