
var path = require('path');
var webpack = require('webpack');
//import path from 'path';
//import webpack from 'webpack';
var node_modules = path.resolve(__dirname, 'node_modules');
//var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

//var miniPlugin = new webpack.optimize.MinChunkSizePlugin(minSize);
var providePlugin = new webpack.ProvidePlugin({
    React: 'react',
    ReactDOM: 'react-dom'
});
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var definePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
});

module.exports = {
    entry: {
        route: './public/src/js/route/index.js',
        vendors: ['react'] // 其他库
    },
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=10240&name=[path][name].[ext]'}
        ]//,
        //noParse: [pathToReact]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee'],
        //别名
        /*alias: {
            'react': pathToReact
        }*/
    },
    plugins: [definePlugin, commonsPlugin, providePlugin]
};