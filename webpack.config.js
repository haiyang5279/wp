
//var path = require('path');
import path from 'path';
import webpack from 'webpack';

//var miniPlugin = new webpack.optimize.MinChunkSizePlugin(minSize);
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var definePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
});

module.exports = {
    entry: {
        route: './public/src/js/route/index.js'
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
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee']
    },
    plugins: [definePlugin, commonsPlugin]
};