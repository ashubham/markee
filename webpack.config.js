const path = require('path');

module.exports = {
    entry: './build/index.js',
    output: {
        filename: 'markee.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Markee'
    }
};