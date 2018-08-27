const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {entry} = require('./entry');

const root = path.join(__dirname, '../');
const srcPath = path.join(root, 'src');
const postCssConfig = require('./postcss.config');

const extractPCSS = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('[name].css');
    },
    allChunks: true
});

module.exports = {

    entry: entry,

    resolve: {
        alias: {
            util: path.join(srcPath, 'util/'),
            component: path.join(srcPath, 'app/component/'),
            common: path.join(srcPath, 'app/page/common/'),
            api: path.join(srcPath, 'app/api/'),
            dto: path.join(srcPath, 'dto/')
        },
        extensions: [".ts", ".tsx", ".js", ".pcss", ".less", ".css", '.svg', '.html']
    },

    externals: {
        lodash: '_',
        'lodash/fp': '_',
        antd: 'antd',
        mobx: 'mobx',
        'rxjs/Rx': 'Rx',
        'mobx-react': 'mobxReact',
        moment: 'moment',
        react: 'React',
        'react-dom': 'ReactDOM',
        // 'react-dom/server': 'ReactDOMServer',
        // BMap: 'BMap',
    },

    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
        }, {
            test: /\.less$/,
            loader: ['style-loader','css-loader','less-loader']
        }, {
            test:/\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.p?css$/,
            include: [srcPath],
            loader: extractPCSS.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: postCssConfig,
                    },
                ],
            }),
        }, {
            test: /\.(gif|jpg|png|svg|woff|eot|ttf)\??.*$/,
            use: [
                {
                    loader: 'file-loader',
                    query: {
                        name: 'resource/[name].[hash].[ext]',
                        publicPath: '',
                    },
                },
            ],
        }, {
            test: /\.xls?$/,
            use: [
                {
                    loader: 'file-loader',
                    query: {
                        name: 'resource/[name].[hash].[ext]',
                        publicPath: '',
                    },
                },
            ],

        }, {
            test: /\/*\.(svg)$/i,
            loader: 'svg-sprite-loader',
        }],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin('styles-[hash].css'),
        extractPCSS,
        new webpack.optimize.CommonsChunkPlugin({
            filename: '[name].[hash].js',
            name: 'commons',
            children: true,
            minChunks: 2,
            deepChildren: true,
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     filename: '[name].[hash].js',
        //     name: 'commons',
        //     minChunks: function (module, count) {
        //         const resource = module.resource;
        //         return /node_modules/.test(resource) || /component/.test(resource);
        //     },
        // }),
    ]
};
