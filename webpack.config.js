const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './build/index.js',
    output: {
        filename: 'selection-marker.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'SelectionMarker'
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};