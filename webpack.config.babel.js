const {resolve} = require('path')

module.exports = env => { /* The reason we use a function here instead of an object
    is so we can pass in arguements. That is useful for setting the workspace
    environment development vs productions. () =>{} turns into env =>{}
    */
    return({
        context:resolve('src'), // tells webpack where to look for files
        entry:'./app.js',
        output: {
            path: resolve('dist'),
            filename: 'app.bundle.js',
            publicPath:'/dist',   /*Webpack dev server uses this to know where to
             serve our bundle from, some other loader use this to know where to 
             put imagefiles or font files.*/
        },
        module:{            
            rules:[
                {
                    test:/\.js$/,
                    exclude: /node_modules/, 
                    loader: "babel-loader"
                },
                {
                    test:/\.css$/,
                    use:[
                        'style-loader',
                        {
                            loader:'css-loader',
                            options:{
                                minimize:true
                            }
                        },
                        'postcss-loader'
                    ]
                }
            ]
        },
        devServer:{

        },
        plugins:[],
        devtool: env.prod ? 'source-map' : 'eval', /*Devtool stands for sourcemaps, 'eval' value is really
         fast but you ship sourcecode to also your customers so it slows down the
         load time, better to use in development. To avoid that we can use 'source-map' value. In this way there
         is a pointer to our sourcemap. devtool: 'source-map'*/
    });
}