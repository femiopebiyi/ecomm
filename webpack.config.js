const path =  require('path')

module.exports = {
    mode: 'development',
    entry: './src/source.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
}