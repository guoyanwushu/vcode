const  path = require('path')
module.exports = {
    mode: 'development',
    entry:__dirname+'/src/index.js',
    output:{
        path:__dirname+'/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test:/\.js/,
                use:'eslint-loader'
            }
        ]
    },
    devServer:{
        contentBase:path.join(__dirname,'/dist'),
        port:8000,
        inline:true
    }
}
