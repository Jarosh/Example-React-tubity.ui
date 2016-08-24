var path = require('path');
var webpack = require('webpack');

module.exports = {
    //debug: true,
    entry: '../src/App.jsx',
    output: {
        path: path.join(__dirname, "../app"),
        filename: 'app.js'
    },
    resolve: {
        root: [
            path.join(__dirname, "node_modules"),
        ],
        extensions: ['', '.js', '.json'] 
    },
    resolveLoader: {
          modulesDirectories: [
              __dirname+'/node_modules'
          ]
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
		        'babel-preset-es2015',
			'babel-preset-react'
		    ].map(require.resolve)
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        }),
        new webpack.NoErrorsPlugin()
    ]
};
