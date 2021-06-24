module.exports ={

    entry:'./src/App/index.js' ,
    output:{
        path:__dirname + '/src/public',
        filename:'bundle.js'
    },

    module:{
        rules:[
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    }
}