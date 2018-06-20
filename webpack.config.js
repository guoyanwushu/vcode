const  path = require('path')
module.exports = {
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
        port:9999,
        inline:true
    }
}
