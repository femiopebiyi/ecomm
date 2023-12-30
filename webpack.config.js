const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        source: './src/source.js',
        script: './jsfiles/script.js'  // New entry for script.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]bundle.js'  // Use [name] placeholder to generate dynamic bundle names
    },
    watch: true
};