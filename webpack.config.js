const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './build/index.js',
    output: {
        filename: 'markee.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Markee'
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};